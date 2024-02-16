
import {Input,InputGroup,UDLR} from 'controlwrap';
import {UI,UIInteractive,UIParent,UIParentRoot,UIChild,UISelectable,UIPanel,UIInput,
    inputType,nowSelectable,
    isUIChild,isUIParent,isUIParentRoot,isUISelectable} from './UIInterface';
import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MI} from '../UIMaster';
import {classMap} from 'lit/directives/class-map.js';

import {getUIChildren,getParent,getRoot,setParentsCursorToMe} from './parentingUtils'






const cacheInstance=new Map<string,UIBase>();
export function getSingletonUI<T extends UIBase>(classRef:new () => T): T {
    if(!cacheInstance.has(classRef.name)){
        cacheInstance.set(classRef.name,(classRef as unknown as typeof UIBase).createInstance());
    }
    return cacheInstance.get(classRef.name) as T;
}

export abstract class UIBase extends LitElement implements UI{

    static styles:CSSResultGroup = [css`
    :host {
        display:block;
        box-sizing:border-box;
    }
    `]

    static eleName:string='';

    protected static makeName(tagname:string):string{
        const basename=('domui-'+tagname.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/_/g,'-')).replace(/-{2,}/g,'-');
        let name=basename;
        while(!!customElements.get(name)){
            name=basename+'-'+Math.floor(Math.random()*1000000);
        }
        //console.log('makeName',tagname,name)
        return name;
    }

    static createInstance():UIBase{
        this.prepare();
        return document.createElement(this.eleName) as UIBase;// as mainScreen;
    }

    static initedNode=new Set<string>();

    static prepare(eleName?:string){
        const targetName:string=eleName??this.name;

        if(this.initedNode.has(targetName)){
            return;
        }
        this.initedNode.add(targetName);

        const superElementName=(Object.getPrototypeOf(this) as unknown as typeof UIBase).eleName
        if(this.eleName==='' || this.eleName===superElementName){
            //console.log('before_makeName',this.name,this.eleName,superElementName)
            this.eleName=this.makeName(targetName);
            
        }
        if(!!customElements.get(this.eleName)){
            console.log('defined!!',targetName,this.eleName,superElementName)
            return;
        }
        customElements.define(
            this.eleName,
            this as unknown as CustomElementConstructor
        );
       // console.log('define',this.eleName)
    }

    //================================================================================

    static suspendOnExit:boolean=false;

    renderCore():TemplateResult<1>{
        return html`<slot></slot>`;
    }
    
    renderWrap(content:TemplateResult<1>):TemplateResult<1>{
        return content;
    }

    render(){
        return this.renderWrap(this.renderCore());
    }

    constructor() {
        super();
        const observer = new IntersectionObserver(entries => {
            this.requestUpdate();
          }, { threshold: 0.05 }); // Configure the observer to trigger when 10% visible
          observer.observe(this);
    }

    show():void{
        this.style.display='block';
        this._isDisplay=true;
    }

    hide():void{
        this.style.display='none';
        this._isDisplay=false;
    }

    async enterAni(){
        this.show();
    }

    async suspend(){
        this.hide();
    }

    async resume(){
        this.show();
    }

    async exitAni(){
        this.hide();
        if(!(this.constructor as unknown as typeof UIBase).suspendOnExit){
            this.destory();
        }
    }

    destory():void{
        //console.log("destory",this,this.parentNode)
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
        this.remove();
    }

    protected _inAnimation:boolean=false;
    protected _isDisplay:boolean=false;

    inAnimation():boolean{
        return this._inAnimation;
    }
    
    //@property({type:Boolean})
    //display:boolean=false;
    isDisplay():boolean{
        return this._isDisplay;
    }
}

export abstract class UIInteractiveBase extends UIBase implements UIInteractive{

    @property({type:Boolean})
    unselectable:boolean=false;
    
    captureInput(ip:Input):boolean{
        return false;
    }
}

export abstract class UIChildBase extends UIInteractiveBase implements UIChild{//button,Container
    getParent():UIParent|undefined{
        return getParent(this);
    }
    getRoot():UIParentRoot|undefined{
        return getRoot(this);
    }
    setParentsCursorToMe():void{
        return setParentsCursorToMe(this);
    }
}