import {Input,YES,NO, PAUSE} from 'controlwrap'
//import {MI,UIPanelBase,HoriContainer, Button} from '../'
import {MI} from '../UIMaster'
import {UIPanelBase} from '../ui'
import {HoriContainer} from '../container'
import {Button} from '../component'

import {CSSResultGroup, html, css,render,TemplateResult} from 'lit';
import {customElement, property,state} from 'lit/decorators.js';
//import { translate as t } from 'lit-i18n';

enum AlertType{
    alert,
    confirm,
    input,
}

HoriContainer.prepare()
Button.prepare()

export class AlertPanel extends UIPanelBase{ //} extends UIMain{
    static suspendOnExit:boolean=false;

    //static readonly eleName:string="setting-panel";

    static styles:CSSResultGroup = [super.styles,css`

    `]

    @state()
    private alertType:AlertType=AlertType.alert;

    @state()
    private withCancel:Boolean=false;

    show(): void {
        super.show();
    }

    buttonName(input:string):string{
        return input;
    }

    renderButtons(){
        return html`
${this.alertType==AlertType.alert ? html`
    <domui-button @callback=${this.onYes}>${this.buttonName('confirm')}</domui-button>
`:''}

${this.alertType==AlertType.confirm ? html`
    <domui-hori-container>
        <domui-button @callback=${this.onYes}>${this.buttonName('yes')}</domui-button>
        <domui-button @callback=${this.onNo}>${this.buttonName('no')}</domui-button>
        ${this.withCancel ? html`<domui-button @callback=${this.onCancel}>${this.buttonName('cancel')}</domui-button>`:''}
    </domui-hori-container>
`:''}

${this.alertType==AlertType.input ? html`
    <input type="text" />
    <domui-hori-container>
        <domui-button @callback=${this.onYes}>${this.buttonName('confirm')}</domui-button>
        ${this.withCancel ? html`<domui-button @callback=${this.onCancel}>${this.buttonName('cancel')}</domui-button>`:''}
    </domui-hori-container>

`:''}
        `;
    }

    renderCore(){
        return html`
            <h1><slot name='title'></slot></h1>
            <hr/>
            <p><slot></slot></p>
            ${this.renderButtons()}
        `;
    }

    private static addPanel(str:TemplateResult){
        const ap=this.createInstance() as AlertPanel
        render(html`${str}`,ap)
        MI.showPanel(ap)
        return ap;
    }

    static async alert(str:TemplateResult){
        this.addPanel(str).alertType=AlertType.alert;
        return new Promise<void>((resolve,reject)=>{
            const asd=()=>{
                resolve();
                removeEventListener('Response',asd)
            }
            addEventListener('Response',asd)
        });
    }

    static async confirm(str:TemplateResult,withCancel:boolean=false):Promise<boolean>{
        const ap=this.addPanel(str)
        ap.alertType=AlertType.confirm;
        ap.withCancel=withCancel;
        return new Promise<boolean>((resolve,reject)=>{
            const asd=(e:any)=>{
                if((e as CustomEvent).detail.yes!==undefined){
                    resolve((e as CustomEvent).detail.yes as boolean);
                }else{
                    reject();
                }
                removeEventListener('Response',asd)
            }
            addEventListener('Response',asd);
        });
    }

    /*

    static async dialog(str:TemplateResult){
        const ap=this.createInstance() as AlertPanel
        render(html`${str}`,ap)
        MI.showPanel(ap)
    }
    */

    endAlert(){
        dispatchEvent(new Event('Response'));
        this.close();
    }

    endConfirm(yes:boolean){
        dispatchEvent(new CustomEvent('Response',{detail:{yes}}));
        this.close();
    }
    
    onCancel(){
        dispatchEvent(new CustomEvent('Response',{detail:{cancel:true}}));
        this.close();
    }

    onYes(){
        if(this.alertType==AlertType.alert){
            this.endAlert();
        }else if(this.alertType==AlertType.confirm){
            this.endConfirm(true);
        }
    }

    onNo(){
        if(this.alertType==AlertType.alert){
            this.endAlert();
        }else if(this.alertType==AlertType.confirm){
            this.endConfirm(false);
        }
    }
    
    captureInput(ip: Input): boolean {
        if(YES(ip)){
            this.onYes();
            return true;
        }else if(NO(ip)){
            if(this.withCancel){
                this.onCancel();
            }else{
                this.onNo();
            }
            return true;
        }
        return super.captureInput(ip);
    }
}

/*
FullScreenDIV

tabContainerLR

tabList

confirm-cancel-default

Alert panel
Confirm/cancel panel
text input +Confirm(cancel) panel


*/