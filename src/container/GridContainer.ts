/**
 * extends Container
 * 
 * import name[]:string,component
 * 
 * set all uDLR link?
 * 
 * set x,y loop or not
 * 
 * 
 * set each roll um, or auto change by giveing min/max?
 * 
 */

import {Input,UIButton,UIButtonOptional,L1R1,LR,UD} from 'controlwrap'
import {css, html,CSSResultGroup,PropertyValueMap,TemplateResult} from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import {customElement, property,state,query} from 'lit/decorators.js';
import {nowSelectable} from '../ui/UIInterface';
import ScrollContainer from './ScrollContainer';
import { UIChild, UISelectable } from '../ui';
import { clamp } from '../utils';

export default class GridContainer extends ScrollContainer{

    @property({type:Number})
    eachRow:number=4;

    moveCursor(x:number,y:number):boolean{
        const [stayInside,cursor]=this.getNewCursor(x!==0?x:y*this.eachRow);
        //console.log(stayInside,cursor,this.cursorIndex,this.uiChildren.length,x,y)
        if(stayInside){
            this.setCursorById(cursor,true);//move
            return true;
        }else if(cursor==-1 && this.cursorIndex>=this.eachRow){
            this.setCursorById(0,true);//move
            return true;
        }else if(cursor==1 && this.cursorIndex<this.uiChildren.length-1){
            this.setCursorById(this.uiChildren.length-1,true);//move
            return true;
        }
        return false;
    }

    renderWrap(content:TemplateResult<1>):TemplateResult<1>{
     return html`<style>
        .wrapper{
            display:grid;
            grid-template-columns: repeat(${this.eachRow}, 1fr);
        }
     </style>
     ${super.renderWrap(content)}
   `;}
        
}


//*
export class GridExtraContainer extends ScrollContainer{
    
    static styles:CSSResultGroup = [super.styles,css`
    :host {
        
    }
    :slotted {
    }
   `];

   @property({type:Number})
   eachRow:number=5;

   @property({type:Number})
   eachCol:number=4;

   cursorX: number=0;
   cursorY: number=0;

   protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        this.eachRow=clamp(this.eachRow,1,100);
        this.eachCol=clamp(this.eachCol,1,100);

   }

    moveCursor(x:number,y:number):boolean{
        return false;
    }

    render(){
     return html`
        <slot></slot>
    `;
   }
        
}