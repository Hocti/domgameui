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
import {CSSResultGroup, html, css,TemplateResult} from 'lit';
import BaseComponent from './BaseComponent';
import {Input,YES} from 'controlwrap'
import {customElement, property} from 'lit/decorators.js';
import { translate as t, initLitI18n } from 'lit-i18n';

export class Button extends BaseComponent{

    static eleName:string='domui-button';
    /*

    constructor(title:string,callback:()=>void,hints?:string){
        super(title,callback,hints);
    }*/
    constructor(){
        super();
    }

    
    @property({type:Boolean}) selected:boolean=false;

    static tempCss=css`
    :host{
        border: 1px solid green;
    }
    :host(.active){
        background-color:yellow;
    }
    :host([turnOn]){
        background-color:yellow;
    }
    button{
        cursor:pointer;
        transition: box-shadow 0.5s;
    }
    :host(.active) button{
        box-shadow: yellow 2px 2px 25px;
        border: 2px solid red;
    }
    :host(.unselectable) button{
        cursor:not-allowed;
        opacity:0.2;
    }
    :host(.lock) button{
        opacity:0.5;
    }
    `

    public static override styles:CSSResultGroup = [...(super.styles?[super.styles]:[]),css`
    :host{
        display:inline-block;
    }
    :host(.lock){
        cursor:not-allowed;
    }
    `];
   /**
    */

    playLockShake(){
        //*
    }
   
    doPress():boolean{
        if(this.selected || this.unselectable){
            return false;
        }
        if(this.lock){
            this.playLockShake()
            return false;
        }
        this.dispatchEvent(new Event('callback'))
        return true;
    }

    renderCore():TemplateResult<1>{
        return html`
          <button @click=${this.doPress}><slot/></button>
        `;
    }

    captureInput(ip:Input):boolean{
        if(YES(ip)){
            //console.log('capture Button',this.innerHTML)
            this.doPress();
            return true;
        }
        //console.log('not capture Button',this.innerHTML,ip)
        return false;
    }

}