

import {LitElement, html, css, CSSResultGroup} from 'lit';
import {customElement, property,state,query} from 'lit/decorators.js';
import { UIBase } from '../ui/SimpleBaseUI';
import { fullScreenCSS } from './Layer';

export abstract class UIBG extends UIBase{
    static styles:CSSResultGroup = [css`
    :host {
        ${fullScreenCSS}
        pointer-events:none;
    }`
    ]
}