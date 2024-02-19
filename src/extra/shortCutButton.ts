import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {UI} from '../ui/UIInterface';
import { Input } from 'controlwrap';
import {UIBase,UIChildBase} from '../ui/SimpleBaseUI';

export default class shortCutButton extends UIChildBase{
    @property({type:String})
    buttonName:string="";

    @property({type:Function})
    callback?:(ip:Input)=>boolean;

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        if(this.buttonName==""){
            this.getParent()?.bindButton(this.buttonName,this.callback);
        }
    }

    renderCore():TemplateResult<1>{
        return html`<button @click=${this.callback}><slot></slot></button>`;
    }
};

//*not tested