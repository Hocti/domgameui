import {Input,YES,NO,PAUSE,click, InputGroup, InputSource, ControlWrap, tap, UIButtonOptional} from 'controlwrap'
import {css} from 'lit';

export const clamp = function(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
};

export function delay(time:number=1000):Promise<void>{
  return new Promise((resolve)=>{
      setTimeout(()=>{
          resolve();
      },time);
  })
}

export async function nextTick(fn:()=>void):Promise<void>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fn();
            resolve();
        },0)
    })
}

export function anyPlayerPress(ips:InputGroup):number{
    for(let k in ips.player){
        if(YES(ips.player[k]) || PAUSE(ips.player[k])){
            return parseInt(k);
        }
    }
    return -1
}

export function anyPress(ips:InputGroup):InputSource|undefined{
    if(click(ips)){
        return InputSource.mouse;
    }else if(YES(ips.system) || PAUSE(ips.system)){
        return InputSource.system;
    }
    return anyPlayerPress(ips)>=0?InputSource.player:undefined;
}


export function getRect(obj:HTMLElement):{w:number,h:number,x:number,y:number}{
  const rect = obj.getBoundingClientRect();
  return {
    y: rect.top + window.scrollY,
    x: rect.left + window.scrollX,
    w: rect.width,
    h: rect.height
  };
}

export function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }
  
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
      return false;
    }
  
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }

  export function removeElementWithIndex<T>(array: T[], index: number): T[] {
    if(index<0 || index>=array.length){
        return array;
    }
    return array.slice(0, index).concat(array.slice(index + 1));
  }

export const s=(v:number)=>css`calc(${v} * var(--rootS))`;
export const l=(v:number)=>css`calc(${v} * var(--rootL))`;
export const w=(v:number)=>css`calc(${v} / 100 * var(--rootWidth))`;
export const h=(v:number)=>css`calc(${v} / 100 * var(--rootHeight))`;
