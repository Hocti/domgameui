/**
 * finalComponent?(no interactive child)
 * with label area
 * lock?
 * hints
 * 
 * radio button
 * 
 * get/set function
 * 
 * onchange event/Call
 */

import { html,css, TemplateResult, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import BaseComponent from './BaseComponent';
import {Input,YES} from 'controlwrap'
import {clamp} from '../utils'

export class CheckBox extends BaseComponent{

    @property({type:Boolean})
    value:boolean=false;

    renderCore(){
        setTimeout(()=>{
            const ip=this.shadowRoot?.querySelector('input');
            if(ip && ip.checked!=this.value){
                ip.checked=this.value;
            }
        });
        return html`<style>
        :host(.active) input{
            border: 3px solid red;
            box-shadow: yellow 2px 2px 7px;
        }
        </style><input type="checkbox" @change=${this._onChange}/>`
    }

    private _onChange(event: Event) {
        this.value=!this.value;
    }

    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        if(_changedProperties.has('value') && _changedProperties.get('value')!==undefined){
            this.dispatchEvent(new CustomEvent('callback',{
                detail:{
                    value:this.value
                },
            }))
        }
    }

    captureInput(ip:Input):boolean{
        if(YES(ip)){
            this.value=!this.value;
            return true;
        }
        return false;
    }

}