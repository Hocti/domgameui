/**
 * add elements...
 * set each element udlr's index
 * 
 * set/get element size & position?
 * 
 * function check all linked
 */
import Container from './Container';
import {UIChild} from '../ui';
import {getRect} from '../utils';

const oppo=(i:number):number=>i<=1?(i==0?1:0):(i==2?3:2);

export default class MixContainer extends Container{

    static readonly eleName:string="base-mix-container";

    childUDLR:number[][]=[];
    childRect:{w:number,h:number,x:number,y:number}[]=[];

    findCloset(id:number,x:number,y:number):number{
        const selfRect=this.childRect[id];
        const total=this.childRect.length;
        let currId:number=-1;
        let currDis:number=10000;
        for(let i=0;i<total;i++){
            if(i===id)
                continue;
                const rect=this.childRect[i];

            let thisDis:number=-1;
            let otherDis:number=-1;
            if(x!==0){
                if(x=-1){
                    thisDis=selfRect.x-(rect.x+rect.w);
                }else if(x==1){
                    thisDis=rect.x-selfRect.x+selfRect.w;
                }
                otherDis=selfRect.y>rect.y?selfRect.y-rect.y:rect.y-(selfRect.y+selfRect.h);
            }else if(y!==0){
                if(y==-1){
                    thisDis=selfRect.y-(rect.y+rect.w);
                }else if(y==1){
                    thisDis=rect.y-selfRect.y+selfRect.w;
                }
                otherDis=selfRect.x>rect.x?selfRect.x-rect.x:rect.x-(selfRect.x+selfRect.w);
            }

            if(thisDis>=0 && thisDis<currDis && thisDis<otherDis){
                currDis=thisDis;
                currId=i;
            }
        }

        return currId;
    }

    linkToZero(id:number):boolean{
        return this.countLinked(id).has(0);
        /*
        if(this.childUDLR[id].indexOf(0)!=-1)return true;
        let tested=new Set<number>([id]);
        let linkedID=new Set<number>([id,...this.childUDLR[id]]);
        let tried=0;
        do{
            linkedID.forEach((v)=>{
                if(tested.has(v))return;
                if(v==-1){
                    tested.add(-1);
                    return;
                }
                if(this.childUDLR[v].indexOf(0)!==-1)return true;
                for(let i of this.childUDLR[v]){
                    linkedID.add(i);
                }
                tested.add(v);
            })
            if(tried++>100){
                console.error('linkToZero fail',id,linkedID,tested);
                return false;
            }
        }while(tested.size<linkedID.size);
        
        return false;
        */
    }

    countLinked(id:number):Set<number>{
        let linkedID=new Set<number>([...this.childUDLR[id]]);
        for(let i=0;i<this.childUDLR.length;i++){
            if(i===id)continue;
            this.childUDLR[i].indexOf(id)!==-1 && linkedID.add(i);
        }
        return linkedID;
    }

    updated(_changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        this.childUDLR=[];
        this.childRect=[];
        const total=this.uiChildren.length;
        for(let i=0;i<total;i++){
            this.childRect[i]=getRect(this.uiChildren[i]);
            this.childUDLR[i]=[-1,-1,-1,-1];
        }
        for(let i=0;i<total;i++){
            const tempResult=[
                this.findCloset(i,0,-1),
                this.findCloset(i,0,1),
                this.findCloset(i,-1,0),
                this.findCloset(i,1,0)
            ];
            for(let j=0;j<4;j++){
                if(this.childUDLR[i][j]===-1 && tempResult[j]!==-1){
                    this.childUDLR[i][j]=tempResult[j]
                    this.childUDLR[tempResult[j]][oppo(j)]=i;
                }
            }
        }

        for(let i=1;i<total;i++){
            if(!this.linkToZero(i)){
                console.error('link fail',i);
                //*
            }
        }
    }

    moveCursor(x:number,y:number):boolean{
        const newIndex=this.childUDLR[this.cursorIndex][x==1?3:(x==-1?2:(y==-1?0:1))]
        if(newIndex>=0 && newIndex!==this.cursorIndex){
            this.setCursorById(newIndex,true);
            return true;
        }
        return false;
    }

}