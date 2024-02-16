/**
 * Container multi container/conponent
 * 
 * have root
 * have childs
 * 
 * if actived child return udlr, change child
 * 
 * auto scroll?
 * 
 */

import {TemplateResult, css,CSSResultGroup, html, PropertyValueMap} from 'lit';
import {Input,UD,LR} from 'controlwrap'
import Container from './Container'
import {getParent,getRoot,setParentsCursorToMe} from '../ui/parentingUtils'
import {UISelectable,UIChild,UIParent,UIParentRoot} from '../ui/UIInterface'
import {clamp} from '../utils'
import {customElement, property, query, state} from 'lit/decorators.js';

export default class ScrollContainer extends Container{
    
    static readonly eleName:string="domui-scroll-container";
    
    //================================================================

    @property({type:Boolean})
    scrollable:boolean=true;

    @property({type:Boolean})
    scrollFloat:boolean=false;

    @property({type:Number})
    scrollDisplayBlock:number=5;

    static styles:CSSResultGroup = [css`
     :host {
        overflow:none;
     }
     .wrapper{
        height:100%;
        overflow-y:auto;
     }
     .wrapper>::slotted(*){
        position:relative;
        display:block;
        margin: 0;
        box-sizing:border-box;
     }
    `];


    callFromChild(child:UISelectable){
        
    }

    @query('.wrapper')
    wrapper!:HTMLElement;

    /*
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        //*event resize
    }

    constructor() {
        super();
        this.addEventListener('slotchange', (e) => {
            console.log('slotchange')
            this.requestUpdate();
        });
      }
    */

        setCursor(com?:UIChild,autoActive:boolean=true):void{
        super.setCursor(com,autoActive);
        
        if (this.uiChildren.length>0 && this.cursorChild && this.wrapper) {
            const WB=this.getBoundingClientRect();
            const currentTargetY=Math.round(this.wrapper.scrollTop+this.cursorChild.getBoundingClientRect().top-WB.top);

            const containerHeight=WB.bottom-WB.top;

            //console.log('currentTargetY',currentTargetY,containerHeight,this.wrapper.scrollHeight);
            
            let newY=this.wrapper.scrollTop;
            if(currentTargetY<this.wrapper.scrollTop){
                newY=currentTargetY
            }else if(currentTargetY>this.wrapper.scrollTop+(containerHeight/this.scrollDisplayBlock*(this.scrollDisplayBlock-1))){
                newY=currentTargetY-(containerHeight/this.scrollDisplayBlock*(this.scrollDisplayBlock-1))
            }
            this.wrapper.scrollTop=clamp(newY,0,this.wrapper.scrollHeight);

        }
    }


    renderWrap(content:TemplateResult<1>):TemplateResult<1>{
        if(this.scrollable && this.scrollDisplayBlock>0){
            const WB=this.getBoundingClientRect();
            //console.log('renderWrap',WB.height,this.scrollDisplayBlock,this.uiChildren.length,this.isConnected)
            if(WB.height===0 && this.uiChildren.length>0){
                //setTimeout(()=>this.requestUpdate(),5000);
                return html`<style>
                    .wrapper{
                        min-height:100px;
                    }
                </style>
                <div class='wrapper'>${content}</div>`
            }
            return html`
                <style>
                    ${this.uiChildren.length>this.scrollDisplayBlock?css`
                    .wrapper{
                    }
                    `:css``}
                    .wrapper>::slotted(*){
                        height:${WB.height==0?100/this.scrollDisplayBlock+'%':(WB.height/this.scrollDisplayBlock)+'px'};
                    }
                </style>
                <div class='wrapper'>${content}</div>`;
        }

        
        return html`<style></style><div class='wrapper'>${content}</div>`;
    }
}