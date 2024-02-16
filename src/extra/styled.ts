import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {UI} from '../ui/UIInterface';
import {UIBase} from '../ui/SimpleBaseUI';


export const styled=(name:string,styles:CSSResultGroup,superclass:typeof UIBase = UIBase):typeof superclass=>{
    const ele: typeof superclass = class extends superclass{
        static eleName:string=name;
        static styles:CSSResultGroup = [...(super.styles?[super.styles]:[]),styles];
    }
    ele.prepare(name);
    return ele;
}
/*
type mixed = new () => UIBase;// & { asd?: number };
export const styled=<T extends mixed>(name:string,superclass:T,styles:CSSResultGroup):T=>{
    const ele:T = class extends superclass{
        static eleName:string=name;
        static styles:CSSResultGroup = [...(super.styles?[super.styles]:[]),styles];
    }
    ele.init();
    return ele;
}
*/