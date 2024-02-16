
import {LitElement, html, css, CSSResultGroup} from 'lit';
import {customElement, property,state,query} from 'lit/decorators.js';
import {styled} from '../extra/styled'

export const fullScreenCSS=css`
display: block;
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
`

export const centerCSS=css`
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
`

export const flexCenterCSS=css`
display: flex;
justify-content: center;
align-items: center;
`

/*
@customElement('ui-layer')
export class Layer extends LitElement{
    

    static styles:CSSResultGroup = [css`
    :host {
        ${fullScreenCSS}
        pointer-events:none;
    }
    :host * {
        pointer-events:auto;
    }
    :slotted(*) {
        pointer-events:auto;
    }
    :host([noninteractive]) {
        pointer-events:none !important;
    }
    `]
    
    render() {
      return html`<slot></slot>`;
    }
}
*/

export const Layer=styled('domui-layer',css`
:host {
    ${fullScreenCSS}
    pointer-events:none;
}
:host * {
    pointer-events:auto;
}
:slotted(*) {
    pointer-events:auto;
}
:host([noninteractive]) {
    pointer-events:none !important;
}
`)
