import {Input,UIButton,UIButtonOptional,L1R1,LR,UD} from 'controlwrap'
import {css, html,CSSResultGroup,PropertyValueMap} from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import {customElement, property,state,query} from 'lit/decorators.js';
import {nowSelectable} from '../ui/UIInterface';
import Container from './Container';
import { UIChild, UISelectable } from '../ui';
import { clamp } from '../utils';

export default class OrderContainer extends Container{

    moveCursor(x:number,y:number):boolean{
        if(this.cursorChild){
            const attrName=x!=0?(x<0?'orderleft':'orderright'):(y<0?'orderup':'orderdown');
            const targetName=this.cursorChild?.getAttribute(attrName)
            if(targetName){
                //*(not tested yet)
                let com=this.shadowRoot!.querySelector(`[orderName=${targetName}]`)
                if(com){
                    this.setCursor(com as UIChild,true);
                    return true;
                }
            }
        }
        
        return false;
    }
        
}
/**
 * <domui-order-container>
 *  <domui-child orderName='a' orderRight='b' orderDown='c'>A</domui-child>
 *  <domui-child orderName='b' orderLeft='a' orderDown='d'>B</domui-child>
 *  <domui-child orderName='c' orderUp='a' orderRight='d'>C</domui-child>
 * </domui-order-container>
 * 
 * 
 */