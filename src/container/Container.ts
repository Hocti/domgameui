/**
 * Container multi container/conponent
 * 
 * have root
 * have childs
 * 
 * if actived child return udlr, change child
 * 
 * auto scroll?
 * 
 */

import {TemplateResult, css,CSSResultGroup, html} from 'lit';
import {Input,UD,LR} from 'controlwrap'
import UIParentBase from '../ui/UIParentBase'
import {getParent,getRoot,setParentsCursorToMe} from '../ui/parentingUtils'
import {UISelectable,UIChild,UIParent,UIParentRoot} from '../ui/UIInterface'
import {customElement, property} from 'lit/decorators.js';

export default class Container extends UIParentBase implements UIChild,UIParent{

    getParent():UIParent|undefined{
        return getParent(this)
    }
    getRoot():UIParentRoot|undefined{
        return getRoot(this);
    }
    setParentsCursorToMe():void{
        return setParentsCursorToMe(this);
    }
    
    static readonly eleName:string="domui-container";

    callFromChild(child:UISelectable){
        
    }
}