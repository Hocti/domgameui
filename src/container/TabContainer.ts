import {css, PropertyValueMap, html,CSSResultGroup} from 'lit';
import {query, property} from 'lit/decorators.js';
import Container from './Container';
import {HoriContainer} from './ListContainer';
import {Button} from '../component/Button';
import {Input,UIButton,UIButtonOptional,LR,L1R1} from 'controlwrap'
import { s } from '../utils';

export type TabItemInfo={
    label?:string,
    hints?:string,
    locked?:boolean,
}

export enum SwitchType{
    shoulder,
    arrow,
    none
}


Button.prepare();
HoriContainer.prepare();

export default class TabContainer extends Container{

    static eleName:string='domui-tab-container';

    static styles:CSSResultGroup = [...(super.styles?[super.styles]:[]),css`
    .tab_LR{
        cursor: pointer;
    }
    .tabBtn{
        cursor: pointer;
    }
    .tabBtnsContainer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tabBtns{
        display: flex;
        justify-content: center;
    }`]


    static tempCss=css`
    .tabBtn{
        padding: 0.5rem 1rem;
        &.active{
            border: 1px solid red;
        }
    }
    .tab_LR{
        &:hover{
            border: 1px solid yellow;
        }
    }
    .tab_LR[name="tab_prev"]:before {
        content: "⬅️"
    }
    .tab_LR[name="tab_next"]:before {
        content: "➡️"
    }
    `;

    readonly loop:boolean=true;
    readonly showLR:boolean=true;
    readonly tabSelectable:boolean=false;
    readonly switchType:SwitchType=SwitchType.shoulder;
    
    @property({type:Number})
    protected currentTabIndex:number=0;

    slotElements: Element[] = [];

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        const slotElement = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
        this.slotElements = slotElement.assignedElements({ flatten: true });
        this.slotElements.forEach((node,i)=>{
            node.setAttribute('slot',`tabContent${i}`)
        })
        slotElement.style.display = 'none';
        this.requestUpdate();
    }
    
    updated(_changedProperties: Map<PropertyKey, unknown>): void {
        const lastCursor=this.cursorChild;
        super.updated(_changedProperties);
        if(_changedProperties.has('currentTabIndex') || _changedProperties.has('slotElements')){
            setTimeout(()=>{
                if(lastCursor!=this.cursorChild){
                    if(this.uiChildren.length>1){
                        this.setCursor(this.uiChildren[1],true);
                    }else{
                        this.setCursor(this.uiChildren[0],true);
                    }
                    //this.autoFindCursor(false,true);
                }
            })
        }
    }
    
    renderTabBtn(title:string,id:number){
        if(this.tabSelectable){
            return html`
            <domui-button @callback=${()=>this.switchTab(id)} ${this.currentTabIndex==id?'active selected':''} class='tabBtn'>
                ${title}
            </domui-button>
            `
        }
        return html`
        <div @click=${()=>this.switchTab(id)} class='tabBtn ${this.currentTabIndex==id?'active':''}'>
            ${title}
        </div>
        `
    }

    renderTabBtns(){
        console.log('renderTabBtns')
        return html`
        <div class="tabBtnsContainer">
            ${this.showLR?html`<a @click=${this.prevTab} name="tab_prev" class="tab_LR"></a>`:html``}
            ${this.tabSelectable?html`
                <domui-hori-container class='tabBtns'>
                    ${this.slotElements.map((v,i)=>this.renderTabBtn((v as any).title,i))}
                </domui-hori-container>`:html`
                <div class='tabBtns'>
                    ${this.slotElements.map((v,i)=>this.renderTabBtn((v as any).title,i))}
                </div>
            `}
            ${this.showLR?html`<a @click=${this.nextTab} name="tab_next" class="tab_LR"></a>`:html``}
        </div>
        `;
    }

    renderCore(){
        return html`
        ${this.slotElements.length>1?this.renderTabBtns():html``}
        <slot></slot>
        <slot name='tabContent${this.currentTabIndex}'></slot>
        `
    }

    //================================================================


    get TotalTab():number{
        return this.slotElements.length;
    }

    get currentTab():number{
        return this.currentTabIndex;
    }
    
    switchTab(id:number):void{
        if(id<0){
            if(this.loop){
                id=this.slotElements.length-1;
            }else{
                return;
            }
        }else if(id>=this.slotElements.length){
            if(this.loop){
                id=0;
            }else{
                return;
            }
        }
        this.currentTabIndex=id;
    }

    nextTab():void{
        return this.switchTab(this.currentTabIndex+1);
    }

    prevTab():void{
        return this.switchTab(this.currentTabIndex-1);
    }

    captureInput(ip:Input):boolean{
        let num=0;
        if(this.switchType===SwitchType.shoulder){
            num=L1R1(ip);
        }else if(this.switchType===SwitchType.arrow){
            num=LR(ip);
        }
        if(num===-1){
            this.prevTab();
            return true;
        }else if(num===1){
            this.nextTab();
            return true;
        }
        return super.captureInput(ip);
    }

}