/**
 * LR to slide
 * 
 * set min/max,each
 * 
 * 
 */
import { html,css, TemplateResult, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import BaseComponent from './BaseComponent';
import {Input,LR,UDLRpressing} from 'controlwrap'
import {clamp} from '../utils'

export class RangeSlider extends BaseComponent{
    

    static eleName:string='domui-range';

    @property({type:Number})
    value:number=0;

    @property({type:Number})
    min:number=0;

    @property({type:Number})
    max:number=100;

    @property({type:Number})
    each:number=1;

    @property({type:Boolean})
    useFloat:boolean=false;

    static tempCss=css`
        :host(.active) .rangeBox{
            .border: 3px solid red;
            box-shadow: yellow 2px 2px 25px;
        }
    `;

    renderCore():TemplateResult<1>{
        //console.log('renderCore',this.value)
        setTimeout(()=>{
            const ip=this.shadowRoot?.querySelector('input');
            if(ip && parseFloat(ip.value)!=this.value){
                ip.value=this.value.toString();
            }
        },0)
        return html`<input type='range' 
        value=${this.value}
        @change=${this.onChange}
        @mousemove=${this.onChange}
        min=${this.min} max=${this.max} ${this.useFloat?html``:html`step=${this.each}`} />`
    }
    onChange(e:Event){
        const target=e.target as HTMLInputElement;
        const newValue=parseInt(target.value);
        if(newValue!==this.value){
            this.value=newValue;
        }
        //console.log('onChange',this.value)
    }

    renderWrap(content:TemplateResult):TemplateResult<1>{
        return html`<div class='rangeBox'>${content}</div>`;
    }

    render():TemplateResult<1>{
        return this.renderWrap(html`
        ${this.renderCore()}
        <p> ${this.value}</p>
        `)
    }


    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        if(_changedProperties.has('value') && _changedProperties.get('value')!==undefined){
            //console.log('rang updated',this.value,_changedProperties)
            this.dispatchEvent(new CustomEvent('callback',{
                detail:{
                    value:this.value
                },
            }))
        }
    }

    add(_add:-1|1):void{
        const newValue=clamp(this.value+_add*this.each,this.min,this.max);
        if(newValue!==this.value){
            this.value=newValue;
        }
    }

    captureInput(ip:Input):boolean{
        if(this.useFloat){
            const {x,}=UDLRpressing(ip)
            if(x!==0){
                this.add(x as -1|1);
                return true;
            }   
        }else{
            const lr=LR(ip);
            if(lr){
                this.add(lr as -1|1);
                return true;
            }
        }
        return super.captureInput(ip);
    }

}
RangeSlider.prepare();