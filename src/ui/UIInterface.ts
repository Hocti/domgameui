import {Input,InputGroup} from 'controlwrap';
import {LitElement, html, css,TemplateResult} from 'lit';

export type inputType = string | number | boolean

export interface UI extends LitElement{//BG

    //display

    show():void;
    hide():void;
    destory():void;

    enterAni():Promise<void>;
    exitAni():Promise<void>;
    suspend():Promise<void>;
    resume():Promise<void>;

    inAnimation():boolean
    isDisplay():boolean

    renderWrap(content:TemplateResult<1>):TemplateResult<1>;
    renderCore():TemplateResult<1>;
    
}

export interface UIInteractive extends UI{
    captureInput(ip:Input):boolean;//false=pass to parent
}

export interface UIParent extends UIInteractive{//UIRoot,Container

    captureAllInput(ipg:InputGroup):boolean;//false=pass to parent
    
    getChildren():UIChild[];
    //nowSelectableDeep(element:UIChild):boolean;
    //cursor
    cursorChild:UIChild|undefined;
    cursorIndex:number;
    cursorSelectable:boolean;
    //resetCursor():void;
    setCursor(com?:UIChild,autoActive?:Boolean):void;
    autoFindCursor(selectFirst?:boolean,autoActive?:Boolean):void;
    findAndActiveFirstSelectable():UISelectable|undefined;
    renewSelectable():boolean;
    bindButton(buttonName:string,callback?:(ip:Input)=>boolean):void;
}

export interface UIChild extends UIInteractive{//button,Container
    getParent():UIParent|undefined;
    getRoot():UIParentRoot|undefined;
    setParentsCursorToMe():void;
}

export interface UISelectable extends UIChild{//button
    active:boolean;
    lock:boolean;
    unselectable:boolean;

    hints?:string;
    /*
    label?:string;

    selected:boolean;
    triggered:boolean;
    select():boolean;
    */

    callback?:(t?:any)=>void;
}
export interface UIParentRoot extends UIParent{
}
export interface UIPanel extends UIParentRoot{
    clickBG2Close:boolean;
    allowUserClose:boolean;
    close():Promise<void>;
}




export interface UIInput<T extends inputType> extends UISelectable {//checkbox,selector
    getVal(): T;
    setVal(val: T): void;
}




export function isUIChild(element:any):boolean{
    return element && element.getParent && typeof element.getParent === 'function';
}
export function isUIParent(element:any):boolean{
    return element && typeof element.getChildren === 'function' && typeof element.captureAllInput === 'function';
}

export function isUIParentRoot(element:any):boolean{
    return isUIParent(element) && !isUIChild(element);// && typeof element.singleInstance === 'boolean';
}
export function isUIChildRoof(element:any):boolean{
    return !isUIParent(element) && isUIChild(element);
}
export function isContainer(element:any):boolean{
    return isUIParent(element) && isUIChild(element);
}

export function isUISelectable(element:any):boolean{
    return isUIChildRoof(element) && typeof element.unselectable === 'boolean'
}
export function nowSelectable(element:any):boolean{
    if(isUISelectable(element)){
        return !(element as UISelectable).unselectable;
    }
    return isContainer(element) && (element as UIParent).cursorSelectable;
}

export function isUIPanel(element:any):boolean{
    return isUIParentRoot(element) && typeof element.clickBG2Close === 'boolean';
}