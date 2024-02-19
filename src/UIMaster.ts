import {Input,InputSource,InputGroup, ControlWrap} from 'controlwrap'
//import {UI,UIRoot,UIType} from './ui'
import {
    UI,UIParentRoot,UISelectable,UIPanel,UIParent,
    isUIParent,UIChild, isUIChild,
    isContainer} from './ui/UIInterface'
import {styled} from './extra/styled'
import * as utils from './utils'
//import EventEmitter from 'eventemitter3';
import {LitElement, html, css ,CSSResultGroup,render} from 'lit';
import {customElement, property,state,query,queryAsync } from 'lit/decorators.js';
import {Layer,fullScreenCSS} from './ui/Layer'
import * as log from 'update-log'
import { UIBase } from './ui/SimpleBaseUI';
//Layer;

@customElement("root-screen")
export class RootScreen extends LitElement{

    static styles:CSSResultGroup = [css`
        :host{
            ${fullScreenCSS}
            overflow:hidden;
            user-select: none;
        }
        :host(.hideMouse){
            cursor: none;
        }
        `
    ];
    protected render(): unknown {
        return html`<slot></slot>`;
    }
}
/*
styled('root-screen',css`
:host{
    ${fullScreenCSS}
    overflow:hidden;
    user-select: none;
    cursor: none;
}
:host(.hideMouse){
    cursor: none;
}
`)
*/

const layerNames=['bg','game','main','panel','fg'];

export default class UIMaster extends EventTarget{//} extends EventEmitter {

    //static================================================================

    private static _instance:UIMaster;
    
    static getInstance():UIMaster {
        return UIMaster._instance;
    }

    static init(div:HTMLDivElement):UIMaster {
        UIMaster._instance=new UIMaster(div);
        MI=UIMaster.getInstance();
        return UIMaster._instance;
    }

    //init================================================================

    private _div:HTMLDivElement;
    private rootElement:UI;
    private layers:Record<string,UI>={};

    private constructor(_div:HTMLDivElement) {
        super();
        this._div = _div;
        this._div.style.overflow="hidden";

        window.addEventListener('resize', this.onReisze.bind(this))
        this.onReisze();
        setTimeout(this.onReisze.bind(this),0);

        render(html`<root-screen>
            <domui-layer name="bg" noninteractive></domui-layer>
            <domui-layer name="game"></domui-layer>
            <domui-layer name="main"></domui-layer>
            <domui-layer name="panel"></domui-layer>
            <domui-layer name="fg" noninteractive></domui-layer>
        </root-screen>`,this._div)
        this.rootElement=this._div.getElementsByTagName('root-screen')[0] as UI;
        //this.rootElement=document.createElement('root-screen') as RootScreen;
        //this._div.appendChild(this.rootElement);

        for(const name of layerNames){
            this.layers[name]=this.rootElement.querySelector(`domui-layer[name="${name}"]`)! as UI;
        }

       ControlWrap.getInstance().addListener('changeLastInputIndex',this.changeInputType);

       this.rootElement.addEventListener('mousedown',this.mouseChange.bind(this));
       this.rootElement.addEventListener('mousemove',this.mouseChange.bind(this));

       log.show(this._div);
    }

    
    //resize===============================================================

    private lastSize:{w:number,h:number}={w:0,h:0};
    private _fontsize:number=12;

    minRatio:number=5/4;// 4/3(1024x768) 5/4(1280x1024) 9/8(LG) 8:5(steamdeck)
    maxRatio:number=32/9;// 32/9(3840x1080) 16:9 16:9
    
    minWidth:number=1280;
    minHeight:number=720;
    fontSizeOnMin:number=12;

    scaleAble:boolean=true;
    //fullCenter:boolean=true;
    fixSize:boolean=false;

    get width():number {
        return this.lastSize.w;
    }
    get height():number {
        return this.lastSize.h;
    }
    get shortSide():number {
        return Math.min(this.lastSize.h,this.lastSize.w)
    }
    get fontSize():number {
        return this._fontsize
    }

    private onReisze(e?:Event):void {
        if(this.fixSize){
            return;
        }

        const rawRatio=this._div.clientWidth/this._div.clientHeight;
        let newWidth=this._div.clientWidth;
        let newHeight=this._div.clientHeight

        let newRatio=rawRatio;
        if(rawRatio<this.minRatio){
            newRatio=this.minRatio;
            newHeight=newWidth/newRatio
        }else if(rawRatio>this.maxRatio){
            newRatio=this.maxRatio;
            newWidth=newHeight*newRatio
        }

        const scale=Math.min(1,newWidth/this.minWidth,newHeight/this.minHeight);
        if(scale<1){
            newWidth/=scale;
            newHeight/=scale;
        }

        this.innerSetSize(Math.floor(newWidth),Math.floor(newHeight),scale);
    }

    public setSize(w:number=1280,h:number=720,scale:number=1):void {
        this.fixSize=true;
        this.innerSetSize(Math.max(this.minWidth,w),Math.max(this.minHeight,h),scale)
    }

    private innerSetSize(newWidth:number,newHeight:number,scale:number=1):void {

        this._fontsize=Math.min(newWidth/this.minWidth,newHeight/this.minHeight)*this.fontSizeOnMin;
        
        //const root=document.querySelector(':root') as HTMLElement;

        if(this.rootElement){
            this.rootElement.style.setProperty('--rootWidth', newWidth+'px');
            this.rootElement.style.setProperty('--rootHeight', newHeight+'px');
            this.rootElement.style.setProperty('--rootS', Math.min(newHeight,newWidth)/100+'px');
            this.rootElement.style.setProperty('--rootL', Math.max(newHeight,newWidth)/100+'px');
            this.rootElement.style.setProperty('--rootFontsize', this._fontsize+'px');

            this.rootElement.style.fontSize=this._fontsize+'px';
            this.rootElement.style.width=newWidth+'px';
            this.rootElement.style.height=newHeight+'px';

            if(scale!==1){
                this.rootElement.style.scale=scale.toString();
                this.rootElement.style.transformOrigin="top left";
            }else{
                this.rootElement.style.scale=""
                this.rootElement.style.transformOrigin="";
            }
            this.rootElement.style.left=Math.round((this._div.clientWidth-newWidth*scale)/2)+'px';
            this.rootElement.style.top=Math.round((this._div.clientHeight-newHeight*scale)/2)+'px';
        }
        
        if(this.lastSize.w!=newWidth || this.lastSize.h!=newHeight){
            //this.emit('resize',{
            this.dispatchEvent(new CustomEvent('resize',{detail:{
                oldWidth:this.lastSize.w,
                oldHeight:this.lastSize.h,
                newWidth,
                newHeight,
                fontSize:this._fontsize
            }}));
            this.lastSize.w=newWidth;
            this.lastSize.h=newHeight;
        }
    }

    //================================================================

    private lastInputs:InputGroup|undefined;

    public frameUpdate(inputs:InputGroup):void {
        if(this.activeGame && this.activeUI===this.activeGame){
            this.activeGame.captureAllInput(inputs);
        }else if(!utils.deepEqual(inputs,this.lastInputs)){
            if(inputs.ui.ui_tap.length>0){
                if(this.hideMouseWhenKeyPress){
                    this.rootElement.classList.add('hideMouse');
                }
                //console.log('captureInput',inputs.ui.ui_tap);
            }
            if(this.activeComponent){
                let target:UIChild=this.activeComponent;
                let captured=target.captureInput(inputs.ui);
                while(!captured){
                    const parent=target.getParent();
                    if(parent && isUIChild(parent)){
                        target=parent as unknown as UIChild;
                        captured=target.captureInput(inputs.ui);
                    }else{
                        break;
                    }
                }
                if(captured){ 
                    return; 
                }
            }else{
                if(this.activeUI && inputs.ui.ui_tap.length>0){
                    this.activeUI.findAndActiveFirstSelectable();
                }
                if(this.activeChild){
                    let captured=this.activeChild.captureInput(inputs.ui);
                    let target:UIChild=this.activeChild;
                    while(!captured){
                        const parent=target.getParent();
                        if(parent && isUIChild(parent)){
                            target=parent as unknown as UIChild;
                            captured=target.captureInput(inputs.ui);
                        }else{
                            break;
                        }
                    }
                    if(captured){ 
                        return; 
                    }
                }
            }
            if(this.activeUI){
                this.activeUI.captureAllInput(inputs);
                this.activeUI.captureInput(inputs.ui);
                /*
                const capturedAll=this.activeUI.captureAllInput(inputs);
                if(!capturedAll){
                    this.activeUI.captureInput(inputs.ui);
                }
                */
            }
            this.lastInputs=inputs;
        }
    }

    private changeInputType(e:any){
        //*layout: 'keyboard'
        console.log('changeInputType',e.buttonLayout)
    }

    public hideMouseWhenKeyPress:boolean=true;

    private mouseChange(e:MouseEvent){
        if(this.hideMouseWhenKeyPress){
            this.rootElement.classList.remove('hideMouse');
        }
    }
    
    //================================================================

    private activeUI?:UIParentRoot;
    private activeChild?:UIChild;
    private activeComponent?:UISelectable;

    private activeBG?:UI;
    private activeGame?:UIParentRoot;
    private activeMain?:UIParentRoot;
    private activePanels:UIPanel[]=[];
    private activeFG?:UI;

    private breadCrumb:UIParentRoot[]=[];
    
    //================================================================

    public async showMain(ui?:UIParentRoot) {
        if(ui===this.activeMain){
            return;
        }
        await this.closeMain()
        await this.appendMain(ui)
    }

    private async closeMain() {
        if(this.activeMain){
            if(true){//*
                await this.activeMain.suspend();
            }else{
                //*remove from cache
                await this.activeMain!.exitAni();
            }
        }
        this.activeMain=undefined;
    }
    
    private async appendMain(ui?:UIParentRoot) {
        this.activeMain=ui;
        if(ui){
            this.layers['main'].appendChild(ui);
            this.setActiveUI(ui);
            await ui.enterAni();
        }
    }

    public async showBG(ui?:UI) {
        if(this.activeBG){
            await this.activeBG.exitAni();
        }
        this.activeBG=ui;
        if(ui){
            this.layers['bg'].appendChild(ui);
            return ui.enterAni();
        }
    }

    public async showFG(ui?:UI) {
        if(this.activeFG){
            await this.activeFG.exitAni();
        }
        this.activeFG=ui;
        if(ui){
            this.layers['fg'].appendChild(ui);
            return ui.enterAni();
        }
    }

    public async showPanel(panel:UIPanel) {
        if(this.activePanels.indexOf(panel)>=0){
            throw new Error('panel already exist');
        }
        this.activePanels.push(panel);
        this.layers['panel'].appendChild(panel);
        this.setActiveUI(panel);
        await panel.enterAni();
    }

    public async closedPanel(panel:UIPanel) {
        const id=this.activePanels.indexOf(panel);
        if(id==this.activePanels.length-1){
            this.activePanels.pop();
        }else if(id!==-1){
            this.activePanels=utils.removeElementWithIndex(this.activePanels,id);
        }
        if(this.activeUI===panel){
            this.findActiveUI();
        }
    }

    public async closeAllPanel() {
        await Promise.all(this.activePanels.map(panel=>panel.close()));
        this.findActiveUI();
    }

    public async closeLastPanel() {
        if(this.activePanels.length>0){
            await this.activePanels.pop()!.close();
        }
        this.findActiveUI();
    }

    public async next(ui:UIParentRoot) {
        this.breadCrumb.push(this.activeUI!);
        await this.activeUI?.suspend();
        //
        this.setActiveUI(ui);

        if(isUIParent(ui)){
            this.showPanel(ui as UIPanel);
        }else{
            this.appendMain(ui)
        }

        await ui.enterAni();
    }

    public async back() {
        if(this.breadCrumb.length==0 || !this.activeUI){
            return;
        }
        await this.activeUI?.exitAni();
        
        if(this.breadCrumb.length>0){
            this.setActiveUI(this.breadCrumb.pop()!);
        }else{
            this.setActiveUI(this.activeMain!);
        }
        await this.activeUI?.resume();
    }

    //================================================================

    public findActiveUI(){
        if(this.activePanels.length>0){
            this.setActiveUI(this.activePanels[this.activePanels.length-1]);
        }else if(this.activeMain){
            this.setActiveUI(this.activeMain);
        }else{
            console.error('no activeUI');
        }
    }

    private setActiveUI(ui:UIParentRoot) {
        if(this.activeUI && this.activeUI!=ui){
            this.activeUI.classList.add('nonActive');
        }
        this.setActiveComponent(undefined);
        this.activeUI=ui;
        this.activeUI.classList.remove('nonActive');
        log.update('setActiveUI',ui.tagName);

        const result=this.activeUI.findAndActiveFirstSelectable();
        //console.log('findAndActiveFirstSelectable result',result,this.activeUI.tagName);
        this.setActiveComponent(result);
    }

    private setActiveChild() {
        setTimeout(() => {
           
            if(!this.activeUI){
                this.activeChild=undefined;
                log.update('activeChild',this.activeChild);
                return;
            }
            
            if(!this.activeChild && this.activeUI.cursorChild && isUIParent(this.activeUI.cursorChild)){
                let currChild:UIChild=this.activeUI.cursorChild;
                while((currChild as unknown as UIParent).cursorChild && isUIParent((currChild as unknown as UIParent).cursorChild)){
                    currChild=(currChild as unknown as UIParent).cursorChild!;
                }
                this.activeChild=currChild;
                console.log('setActiveUI4',this.activeChild)
                log.update('activeChild',this.activeChild);
                return;
            }

            this.activeChild=undefined;
            log.update('activeChild',this.activeChild);
         
        });
    }

    public setActiveComponent(com?:UISelectable):boolean {//success
        if(this.activeComponent===com){
            return true;
        }
        if(this.activeComponent){
            this.activeComponent.active=false;
            //this.setAllParentActive(this.activeComponent,false);
        }
        if(!com || com.isConnected===false){
            this.activeComponent=undefined;
            log.update('activeComponent',undefined);
            this.setActiveChild();
            return true;
        }
        const comRoot=com.getRoot();
        //console.log(comRoot?.tagName,com.getParent().tagName)
        if(!this.activeUI){
            this.activeUI=comRoot
        }else if(this.activeUI!=comRoot){
            //this.setActiveChild();
            return false;
        }
        this.activeComponent=com;
        //this.setAllParentActive(this.activeComponent,true);
        log.update('activeComponent',com.tagName+','+com.innerHTML);
        //* get hints?
        //this.setActiveChild();
        return true;
    }

    public removeIfActive(com:UIChild) {
        //console.log('removeIfActive',this.activeComponent===com,this.activeComponent,com)
        if(this.activeChild===com){
            this.activeChild=undefined;
        }
        if(this.activeComponent===com){
            this.setActiveComponent(undefined);
        }
        if(isUIParent(com)){
            (com as unknown as UIParent).getChildren().forEach((child:UIChild)=>{
                this.removeIfActive(child)
            });
        }
        //if(!com.getRoot()){
        if(!com.isConnected){
            com.destory();
        }
    }

}

export let MI=UIMaster.getInstance();