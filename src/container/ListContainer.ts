/**
 * extends Container
 * 
 * import name[]:string,component
 * 
 * set all up/down link?
 *  
 * 
 */
import {Input,UIButton,UIButtonOptional,L1R1,LR,UD} from 'controlwrap'
import {css, html,CSSResultGroup, PropertyValueMap} from 'lit';
import {customElement, property,state,query} from 'lit/decorators.js';
import {nowSelectable} from '../ui/UIInterface';
import Container from './Container';
import ScrollContainer from './ScrollContainer';
import { UIChild, UISelectable } from '../ui';
import { clamp, s } from '../utils';



export class HoriContainer extends Container{
    static styles:CSSResultGroup = [super.styles,css`
    :host {
        display:flex;
        justify-content:space-between;
    }
   `];

   public loopCursor:boolean=true;
   static ignoreY:boolean=true;
  
  /*
  
  REMARK!!

  controller switch index即時生效，但mouse hover唔會，要click先得


  */

}
HoriContainer.prepare();

export class ListContainer extends ScrollContainer{

    static readonly eleName:string="base-list";

    static styles:CSSResultGroup = [super.styles,css`
    .wrapper {
        display:grid;
        overflow-y:auto;
        max-height:100%;
    }
   `];

   static ignoreX:boolean=true;
}

   
    /*

   render(){
    return html`
    <slot/>
  `;}

    renderList(){
        return html`
        <ul>
          ${this.colors.map((color) =>
            this.renderItem()
          )}
        </ul>
      `;
    }
    
    renderItem(){
        return html`<li>${0}</li>`;
    }
    render(){
        return html`
        <slot/>
      `;
    }
    
    */
/*
export enum ListItemType{
    Button,
    Checkbox,
    Select,
    Slider,
    //Text,
}

export type ListItemData={
    label?:string,
    hints?:string,
    type:ListItemType,
    locked?:boolean,
}

export type ListData={
    items:ListItemData[],
}
*/