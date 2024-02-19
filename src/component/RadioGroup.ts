
import { html,css, TemplateResult, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import BaseComponent from './BaseComponent';
import {Input,LR,YES} from 'controlwrap'
import {clamp} from '../utils'

//<my-horiselector title='difficulty' options='easy,normal,hard,very hard' callback=''></my-horiselector>

export class RadioGroup extends BaseComponent{

    static eleName:string='domui-radio-group';

    @property({type:String})
    value:string='';

    readonly optionArray:string[]=[];
    readonly radioName:string;

    constructor(){
        super();
        this.optionArray=this.getAttribute('options')!.split(',');
        const initValue=this.getAttribute('value')
        if(!initValue || this.optionArray.indexOf(initValue)===-1){
            this.value=this.optionArray[0];
        }
        this.radioName='horizontalSelector'+Math.floor(Math.random()*1000000).toString(16);
    }

    static tempCss=css`
        :host(.active) .containBox{
            .border: 3px solid red;
            box-shadow: yellow 2px 2px 25px;
        }
        .btn_LR{
            cursor: pointer;
            &:hover{
                border: 1px solid yellow;
            }
        }
        .btn_LR[name="btn_prev"]:before {
            content: "⬅️"
        }
        .btn_LR[name="btn_next"]:before {
            content: "➡️"
        }
    `;

    /*
    @property({type:String})
    options:string='';
    */

    renderWrap(content:TemplateResult):TemplateResult<1>{
        return html`<div class='containBox'>${content}</div>`;
    }

    renderOption(option:string):TemplateResult<1>{
        return html`
            <label for=${this.radioName}>${this.getOptionName(option)}
                <input type="radio" name=${this.radioName} value=${option} @change="${this._onChange}"/>
            </label>
        `
        // ?checked="${this.value == option}"
    }

    optionName:Map<string,string>=new Map();
    getOptionName(option:string):string{
        if(this.optionName.has(option)){
            return this.optionName.get(option)!;
        }
        return option;
    }
    
    private _onChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.value = target.value;
    }

    renderCore():TemplateResult<1>{
        setTimeout(()=>{
            const ip=this.shadowRoot?.querySelectorAll(`input`)[this.optionArray.indexOf(this.value)];
            if(ip){
                (ip as HTMLInputElement).checked=true;
            }else{
                console.log('not found',this.value)
            }
        },0)
        return html`
        <a @click=${()=>this.add(-1)} name="btn_prev" class="btn_LR"></a>
        ${this.optionArray.map(option => this.renderOption(option))}
        <a @click=${()=>this.add(1)} name="btn_next" class="btn_LR"></a>`;
        
        /*
        */
    }
    
    /*
    render():TemplateResult<1>{
        return this.renderWrap(html`
        ${this.renderCore()}
        <p>${this.value}</p>
        `)
    }
    */

    /*
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        this.optionArray=this.options.split(',');
        this.requestUpdate();
    }
    */

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

    add(_add:-1|1):void{
        let newID=this.optionArray.indexOf(this.value)+_add;
        if(newID<0){
            newID=this.optionArray.length-1;
        }else if(newID>=this.optionArray.length){
            newID=0;
        }
        this.value=this.optionArray[newID];
    }

    captureInput(ip:Input):boolean{
        const lr=LR(ip);
        if(lr){
            this.add(lr as -1|1);
            return true;
        }else if(YES(ip)){
            this.add(1);
            return true;
        }
        return false;
    }

}