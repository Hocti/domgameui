
import {Input,InputGroup,UDLR} from 'controlwrap';
import {UI,UIInteractive,UIParent,UIParentRoot,UIChild,UISelectable,UIPanel,UIInput,
    inputType,nowSelectable,
    isUIChild,isUIParent,isUIParentRoot,isUISelectable} from './UIInterface';
import {LitElement, html, css, CSSResultGroup, PropertyValueMap, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {MI} from '../UIMaster';
import {classMap} from 'lit/directives/class-map.js';

import {getUIChildren,getParent,getRoot,setParentsCursorToMe} from './parentingUtils'

import {UIInteractiveBase} from './SimpleBaseUI'


export default abstract class UIParentBase extends UIInteractiveBase implements UIParent{


    uiChildren:UIChild[]=[];
    cursorChild:UIChild|undefined;
    cursorSelectable:boolean=false;

    //@state()
    cursorIndex:number=-1;
    
    //@state()
    //uiChildrenCount:number=0;

    public loopCursor:boolean=false;
    static ignoreX:boolean=false;
    static ignoreY:boolean=false;

    //================================================

    /*
    protected shouldUpdate(changedProperties: Map<string | number | symbol, unknown>): boolean {
        if (changedProperties.has('cursorIndex') && changedProperties.size === 1) {
            return false;
        }
        return super.shouldUpdate(changedProperties);
    }
    */

    //================================================

    getChildren(renew:boolean=false):UIChild[]{
        if(renew){
            this.uiChildren=getUIChildren(this);
        }   
        return this.uiChildren;
    }

    updated(_changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        const oldChildren=[...this.uiChildren];
        this.getChildren(true);
        
        if(oldChildren.length!==this.uiChildren.length){
            this.requestUpdate();
            return
        }
        for(let i=0,t=this.uiChildren.length;i<t;i++){
            if(oldChildren[i]!==this.uiChildren[i]){
                this.requestUpdate();
                return;
            }
        }

        if(this.cursorChild && this.uiChildren.indexOf(this.cursorChild)==-1){
            MI.removeIfActive(this.cursorChild);
            this.setCursor(undefined);
        }
        setTimeout(()=>{
            this.autoFindCursor();
        })
    }

    setCursor(com?:UIChild,autoActive:boolean=true):void{
        this.cursorChild=com;
        if(com){
            this.cursorIndex=this.uiChildren.indexOf(com);
            if(isUISelectable(com)){
                if(autoActive){
                    (com as UISelectable).active=true;
                }
            }else if(isUIParent(com)){
                (com as unknown as UIParent).autoFindCursor();
                if(autoActive){
                    (com as unknown as UIParent).findAndActiveFirstSelectable();				
                }
            }
        }else{
            this.cursorIndex=-1;
        }
        if(this.tagName==='TAB-LIST' && this.title==='video' && this.cursorIndex===1){
            console.log('video setCursor',this.cursorIndex,autoActive,(com as UISelectable).active)
        }
        /*
                if(com.innerHTML==="confirm"){
                    console.log('setCursor confirm',this);
                }
        if(this.tagName==='UI-HORI-CONTAINER'){
            console.log('hori setCursor',com,this.cursorIndex,this.uiChildren,autoActive)
        }
        */
    }

    setCursorById(id:number,autoActive:boolean=true):void{
        this.setCursor(this.uiChildren[id],autoActive);
    }

    private autoFindChildCursor(selectFirst:boolean=false,autoActive:boolean=false):void{
        for(let i=0,t=this.uiChildren.length;i<t;i++){
            if(isUIParent(this.uiChildren[i])){
                (this.uiChildren[i] as unknown as UIParent).autoFindCursor(selectFirst,autoActive);
            }
        }
    }

    autoFindCursor(selectFirst:boolean=false,autoActive:boolean=false):void{
        if(this.uiChildren.length>0){
							 
            if(selectFirst || !this.cursorChild || this.uiChildren.indexOf(this.cursorChild)==-1){
                //console.log('select 0',autoActive)
                this.setCursor(this.uiChildren[0],autoActive);
            }else{
                this.setCursor(this.cursorChild,autoActive);
            }
            

            this.autoFindChildCursor(selectFirst,autoActive)
        }else{
            this.setCursor(undefined);
        }
    }

    /*
    nowSelectableDeep(element:UIChild):boolean{
        if(isUISelectable(element)){
            return !(element as UISelectable).unselectable;
        }else if(isUIParent(element)){
            const par=element as unknown as UIParent;
            for(let i=0,t=par.getChildren().length;i<t;i++){
                if(par.nowSelectableDeep(par.getChildren()[i])){
                    return true;
                }
            }
        }
        return false
    }
    */

    renewSelectable():boolean{
        if(this.uiChildren.length>0){
            for(let i=0,t=this.uiChildren.length;i<t;i++){
                if(isUISelectable(this.uiChildren[i]) && (this.uiChildren[i] as UISelectable).unselectable===false){
                    this.cursorSelectable=true;
                }else if(isUIParent(this.uiChildren[i])){
                    const result=(this.uiChildren[i] as unknown as UIParent).renewSelectable()
                    if(result && !this.cursorSelectable){
                        this.cursorSelectable=true;
                    }
                }
            }
        }
        return this.cursorSelectable ;
    }

    private findAndActiveIfSelectable(element:UIChild):UISelectable|undefined{
        if(isUISelectable(element) && (element as UISelectable).unselectable===false){
            (element as UISelectable).active=true
            //console.log(element)
            return element as UISelectable;
        }else if(isUIParent(element)){
            const result=(element as unknown as UIParent).findAndActiveFirstSelectable()
            if(result){
                return result;
            }
        }
        return undefined;
    }

    findAndActiveFirstSelectable():UISelectable|undefined{
        //this.cursorIndex
        if(this.uiChildren.length>0){
            if(this.cursorIndex!=-1 && this.uiChildren[this.cursorIndex]){
                const result1=this.findAndActiveIfSelectable(this.uiChildren[this.cursorIndex]);
                if(result1){
                    return result1;
                }
            }
            //console.log('findAndActiveFirstSelectable cursorChild not find',this.tagName,this.cursorIndex,this.uiChildren,this.uiChildren[0])
            for(let i=0,t=this.uiChildren.length;i<t;i++){
                if(i===this.cursorIndex){
                    continue;
                }
                const result2=this.findAndActiveIfSelectable(this.uiChildren[i] as UIChild);
                //console.log('findAndActiveFirstSelectable result2',this.tagName,i,result2)
                if(result2){
                    return result2;
                }
            }
        }
        return undefined;
    }

									
								 
								 

    moveCursor(x:number,y:number):boolean{
        const direction=x!==0?(x==-1?'left':'right'):(y==-1?'up':(y==1?'down':''))
        const toName=this.cursorChild?.getAttribute('next-'+direction);
        if(toName){
            for(let i=0,t=this.uiChildren.length;i<t;i++){
                if(this.cursorChild===this.uiChildren[i])continue;
                if(this.uiChildren[i].getAttribute('name')===toName){
                    this.setCursor(this.uiChildren[i],true);
                    return true;
                }
            }
        }

        const [stayInside,cursor]=this.getNewCursor(x!==0?x:y);
        //console.log("moveCursor",this.tagName,stayInside,cursor,this.cursorIndex,this.uiChildren.length,x,y)
        if(stayInside){
            this.setCursorById(cursor,true);//move
            return true;
        }
        return false;
    }

    getNewCursor(add:number,fromIndex:number=-1):[boolean,number]{
        if(fromIndex<0){
            fromIndex=this.cursorIndex;
        }
										   
        let newIndex=fromIndex+add;

        if(this.loopCursor){
            newIndex=((newIndex % this.uiChildren.length) + this.uiChildren.length) % this.uiChildren.length
        }else if(newIndex<0){
            return [false,-1];//out -1
        }else if(newIndex>=this.uiChildren.length){
            return [false,1];//out +1
        }

        if(newIndex===this.cursorIndex){
            return [false,0];//out 0
        }

        if(!nowSelectable(this.uiChildren[newIndex])){
            return this.getNewCursor(add,newIndex);
        }
        return [true,newIndex];
    }

    //abstract
    captureAllInput(ipg:InputGroup):boolean{
        return false;
    }

    captureInput(ip:Input):boolean{
        const udlr=UDLR(ip);
        if((
            (udlr.x!==0 && !(this.constructor as typeof UIParentBase).ignoreX) || 
            (udlr.y!==0 && !(this.constructor as typeof UIParentBase).ignoreY)
            ) && this.uiChildren.length>0){
            //console.log(udlr,this.tagName,this.cursorIndex,this.uiChildren.length)
            if(this.cursorIndex===-1){
                this.autoFindCursor(true);
                this.findAndActiveFirstSelectable();
                return true;
            }
            this.renewSelectable();
            return this.moveCursor(udlr.x,udlr.y);
        }
        for (var [buttonName, callback] of this.bindedButton) {
            if(ip.ui_tap.indexOf(buttonName)!==-1){
                if(callback(ip)){
                    return true;
                }
            }
        }
        return super.captureInput(ip);
    }

    private bindedButton=new Map<string,((ip:Input)=>boolean)>();
    bindButton(buttonName:string,callback?:(ip:Input)=>boolean){
        if(callback===undefined){
            this.bindedButton.delete(buttonName);
        }else{
            this.bindedButton.set(buttonName,callback);
        }
    }

    destory():void{
        this.uiChildren.forEach((child)=>{
            child.destory();
        })
        this.uiChildren=[];
        this.cursorChild=undefined;
        super.destory();
    }
}

export abstract class UIParentRootBase extends UIParentBase implements UIParentRoot{//main

    static suspendOnExit:boolean=true;
    
    static styles:CSSResultGroup = [...(super.styles?[super.styles]:[]),css`
    :host(.nonActive) *{
        pointer-events:none !important;
    }
    :host(.nonActive){
        pointer-events:none !important;
    }
    `]

}