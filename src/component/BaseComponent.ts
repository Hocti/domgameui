/**
 * finalComponent?(no interactive child)
 * with label area
 * lock?
 * hints
 * 
 * htmlbutton
 * 
 * get/set function
 * 
 * lock?
 * 
 * hints
 */


import {Input,InputGroup,UDLR} from 'controlwrap';
import {UI,UIInteractive,UIParent,UIParentRoot,UIChild,UISelectable,UIPanel,UIInput,
    inputType,nowSelectable,
    isUIChild,isUIParent,isUIParentRoot,isUISelectable} from '../ui/UIInterface';
import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MI} from '../UIMaster';
import {getUIChildren,getParent,getRoot,setParentsCursorToMe} from '../ui/parentingUtils'
import {UIChildBase} from '../ui/SimpleBaseUI';


export default abstract class UISelectableBase extends UIChildBase{

    static styles:CSSResultGroup = [css`
    :host {
        display:block;
    }
    `]

    //================================================================

    selected:boolean=false;
    triggered:boolean=false;
    label?:string;
    hints:string='';
    title:string="";




    @property({type:Boolean})
    lock:boolean=false;

    @property({type:Boolean})
    active:boolean=false;
    @property({type:Function})
    callback?: ((t?: CustomEvent) => void) | undefined;

    select():boolean{
        return false;
    }

    constructor(){
        super();
        this.onmouseover=()=>{
            if(!this.lock && !this.unselectable){
                this.active=true;
            }
        }
        /*
        this.onmouseout=()=>{
            if(!this.lock && !this.unselectable){
                //this.active=false;
            }
        }
        this.onclick=()=>{
            if(!this.lock && !this.unselectable){
                this.doPress();
            }
        }
        */
    }

    //abstract doPress():void;

    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.update(changedProperties);
        if(changedProperties.has('active') && this.active){
            const result=MI.setActiveComponent(this);
            if(!result){
                this.active=false;
            }else{
                this.setParentsCursorToMe();
            }
        }
        const classes:Record<string,boolean> = { active: this.active, lock: this.lock, unselectable: this.unselectable, };
        for(let className in classes){
            if(changedProperties.has(className)){
                this.classList.toggle(className,classes[className]);
            }
        }
    }

    //================================================================

    getHints():string{
        if(this.lock){
            return "locked!";
        }
        return this.hints;
    }

}