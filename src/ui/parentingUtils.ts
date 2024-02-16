
import {Input,InputGroup,UDLR} from 'controlwrap';
import {UI,UIInteractive,UIParent,UIParentRoot,UIChild,UISelectable,UIPanel,UIInput,
    inputType,nowSelectable,
    isUIChild,isUIParent,isUIParentRoot,isUISelectable} from './UIInterface';
import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MI} from '../UIMaster';
import {classMap} from 'lit/directives/class-map.js';

export function getUIChildren(obj:Element):UIChild[]{
    const result:UIChild[]=[];
    if(obj.shadowRoot && obj.shadowRoot.childElementCount>0){
        result.push(...getUIChildren(obj.shadowRoot as unknown as Element))
    }
    for(let i=0,t=obj.childElementCount;i<t;i++){
        const child=obj.children[i];
        if(isUIChild(child)){
            const slotName=child.getAttribute('slot')
            if(slotName && obj.shadowRoot && !obj.shadowRoot.querySelector(`slot[name=${slotName}]`)){
                //console.log('slotName',slotName,obj.shadowRoot,obj.shadowRoot.querySelector(`slot[name=${slotName}]`))
                continue;
            }
            result.push(child as UIChild);
        }else{
            result.push(...getUIChildren(child));
        }
    }
    return result;
}

export function getParent(self:HTMLElement):UIParent|undefined{
    let parent=self.parentElement;
    if(!parent && self.parentNode && (self.parentNode as any).host){
        parent=(self.parentNode as any).host as HTMLElement;
    }
    //console.log('getParent',self,parent,isUIParent(parent))
    if(!parent){
        return undefined;
    }else if(isUIParent(parent)){
        return parent as UIParent;
    }
    return getParent(parent as HTMLElement);
}

export function getRoot(self:HTMLElement):UIParentRoot|undefined{
    //*const parent=self.offsetParent;
    let parent=getParent(self);
    if(!parent){
        return undefined;
    }else if(isUIParentRoot(parent)){
        return parent as UIParentRoot;
    }
    return getRoot(parent as HTMLElement);
}


export function setParentsCursorToMe(me:UIChild):void{
    const parent=me.getParent();
    if(parent){
        if(parent.cursorChild!==me){
            parent.setCursor(me,false);
        }
        if(isUIChild(parent)){
            setParentsCursorToMe(parent as unknown as UIChild);
        }
    }
}