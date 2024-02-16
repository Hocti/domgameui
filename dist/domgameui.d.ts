/*!
 * domgameui - v1.0.0
 * By hocti
 * Compiled Wed, 14 Feb 2024 19:38:56 UTC
 *
 * domgameui is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
import { Input, InputGroup, InputSource } from 'controlwrap';
import * as lit from 'lit';
import { LitElement, TemplateResult, CSSResultGroup, PropertyValueMap } from 'lit';
import EventEmitter from 'eventemitter3';
import * as lit_html from 'lit-html';

type inputType = string | number | boolean;
interface UI extends LitElement {
    show(): void;
    hide(): void;
    destory(): void;
    enterAni(): Promise<void>;
    exitAni(): Promise<void>;
    suspend(): Promise<void>;
    resume(): Promise<void>;
    inAnimation(): boolean;
    isDisplay(): boolean;
    renderWrap(content: TemplateResult<1>): TemplateResult<1>;
    renderCore(): TemplateResult<1>;
}
interface UIInteractive extends UI {
    captureInput(ip: Input): boolean;
}
interface UIParent extends UIInteractive {
    captureAllInput(ipg: InputGroup): boolean;
    getChildren(): UIChild[];
    cursorChild: UIChild | undefined;
    cursorIndex: number;
    cursorSelectable: boolean;
    setCursor(com?: UIChild, autoActive?: Boolean): void;
    autoFindCursor(selectFirst?: boolean, autoActive?: Boolean): void;
    findAndActiveFirstSelectable(): UISelectable | undefined;
    renewSelectable(): boolean;
    bindButton(buttonName: string, callback?: (ip: Input) => boolean): void;
}
interface UIChild extends UIInteractive {
    getParent(): UIParent | undefined;
    getRoot(): UIParentRoot | undefined;
    setParentsCursorToMe(): void;
}
interface UISelectable extends UIChild {
    active: boolean;
    lock: boolean;
    unselectable: boolean;
    hints?: string;
    callback?: (t?: any) => void;
}
interface UIParentRoot extends UIParent {
}
interface UIPanel extends UIParentRoot {
    clickBG2Close: boolean;
    allowUserClose: boolean;
    close(): Promise<void>;
}
interface UIInput<T extends inputType> extends UISelectable {
    getVal(): T;
    setVal(val: T): void;
}
declare function isUIChild(element: any): boolean;
declare function isUIParent(element: any): boolean;
declare function isUIParentRoot(element: any): boolean;
declare function isUIChildRoof(element: any): boolean;
declare function isContainer(element: any): boolean;
declare function isUISelectable(element: any): boolean;
declare function nowSelectable(element: any): boolean;
declare function isUIPanel(element: any): boolean;

declare class UIMaster extends EventEmitter {
    private static _instance;
    static getInstance(): UIMaster;
    static init(div: HTMLDivElement): UIMaster;
    private _div;
    private rootElement;
    private layers;
    private constructor();
    private lastSize;
    private _fontsize;
    minRatio: number;
    maxRatio: number;
    minWidth: number;
    minHeight: number;
    fontSizeOnMin: number;
    scaleAble: boolean;
    fixSize: boolean;
    get width(): number;
    get height(): number;
    get shortSide(): number;
    get fontSize(): number;
    private onReisze;
    setSize(w?: number, h?: number, scale?: number): void;
    private innerSetSize;
    private lastInputs;
    frameUpdate(inputs: InputGroup): void;
    private changeInputType;
    hideMouseWhenKeyPress: boolean;
    private mouseChange;
    private activeUI?;
    private activeChild?;
    private activeComponent?;
    private activeBG?;
    private activeGame?;
    private activeMain?;
    private activePanels;
    private activeFG?;
    private breadCrumb;
    showMain(ui?: UIParentRoot): Promise<void>;
    private closeMain;
    private appendMain;
    showBG(ui?: UI): Promise<void>;
    showFG(ui?: UI): Promise<void>;
    showPanel(panel: UIPanel): Promise<void>;
    closedPanel(panel: UIPanel): Promise<void>;
    closeAllPanel(): Promise<void>;
    closeLastPanel(): Promise<void>;
    next(ui: UIParentRoot): Promise<void>;
    back(): Promise<void>;
    findActiveUI(): void;
    private setActiveUI;
    setActiveComponent(com?: UISelectable): boolean;
    removeIfActive(com: UIChild): void;
}
declare let MI: UIMaster;

declare function getSingletonUI<T extends UIBase>(classRef: new () => T): T;
declare abstract class UIBase extends LitElement implements UI {
    static styles: CSSResultGroup;
    static eleName: string;
    protected static makeName(tagname: string): string;
    static createInstance(): UIBase;
    static initedNode: Set<string>;
    static prepare(eleName?: string): void;
    static suspendOnExit: boolean;
    renderCore(): TemplateResult<1>;
    renderWrap(content: TemplateResult<1>): TemplateResult<1>;
    render(): TemplateResult<1>;
    constructor();
    show(): void;
    hide(): void;
    enterAni(): Promise<void>;
    suspend(): Promise<void>;
    resume(): Promise<void>;
    exitAni(): Promise<void>;
    destory(): void;
    protected _inAnimation: boolean;
    protected _isDisplay: boolean;
    inAnimation(): boolean;
    isDisplay(): boolean;
}
declare abstract class UIInteractiveBase extends UIBase implements UIInteractive {
    unselectable: boolean;
    captureInput(ip: Input): boolean;
}
declare abstract class UIChildBase extends UIInteractiveBase implements UIChild {
    getParent(): UIParent | undefined;
    getRoot(): UIParentRoot | undefined;
    setParentsCursorToMe(): void;
}

declare const fullScreenCSS: lit.CSSResult;
declare const centerCSS: lit.CSSResult;
declare const flexCenterCSS: lit.CSSResult;
declare const Layer: typeof UIBase;

declare abstract class UIBG extends UIBase {
    static styles: CSSResultGroup;
}

declare abstract class UIParentBase extends UIInteractiveBase implements UIParent {
    uiChildren: UIChild[];
    cursorChild: UIChild | undefined;
    cursorSelectable: boolean;
    cursorIndex: number;
    loopCursor: boolean;
    static ignoreX: boolean;
    static ignoreY: boolean;
    getChildren(renew?: boolean): UIChild[];
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    setCursor(com?: UIChild, autoActive?: boolean): void;
    setCursorById(id: number, autoActive?: boolean): void;
    private autoFindChildCursor;
    autoFindCursor(selectFirst?: boolean, autoActive?: boolean): void;
    renewSelectable(): boolean;
    private findAndActiveIfSelectable;
    findAndActiveFirstSelectable(): UISelectable | undefined;
    moveCursor(x: number, y: number): boolean;
    getNewCursor(add: number, fromIndex?: number): [boolean, number];
    captureAllInput(ipg: InputGroup): boolean;
    captureInput(ip: Input): boolean;
    private bindedButton;
    bindButton(buttonName: string, callback?: (ip: Input) => boolean): void;
    destory(): void;
}
declare abstract class UIParentRootBase extends UIParentBase implements UIParentRoot {
    static suspendOnExit: boolean;
    static styles: CSSResultGroup;
}

declare abstract class UIPanelBase extends UIParentRootBase implements UIPanel {
    static styles: CSSResultGroup;
    clickBG2Close: boolean;
    allowUserClose: boolean;
    close(): Promise<void>;
}

declare class Container extends UIParentBase implements UIChild, UIParent {
    getParent(): UIParent | undefined;
    getRoot(): UIParentRoot | undefined;
    setParentsCursorToMe(): void;
    static readonly eleName: string;
    callFromChild(child: UISelectable): void;
}

declare class ScrollContainer extends Container {
    static readonly eleName: string;
    scrollable: boolean;
    scrollFloat: boolean;
    scrollDisplayBlock: number;
    static styles: CSSResultGroup;
    callFromChild(child: UISelectable): void;
    wrapper: HTMLElement;
    setCursor(com?: UIChild, autoActive?: boolean): void;
    renderWrap(content: TemplateResult<1>): TemplateResult<1>;
}

declare class HoriContainer extends Container {
    static styles: CSSResultGroup;
    loopCursor: boolean;
    static ignoreY: boolean;
}
declare class ListContainer extends ScrollContainer {
    static readonly eleName: string;
    static styles: CSSResultGroup;
    static ignoreX: boolean;
}

declare enum SwitchType {
    shoulder = 0,
    arrow = 1,
    none = 2
}
declare class TabContainer extends Container {
    static readonly eleName: string;
    static styles: CSSResultGroup;
    readonly loop: boolean;
    readonly showLR: boolean;
    readonly tabSelectable: boolean;
    readonly switchType: SwitchType;
    protected currentTabIndex: number;
    slotElements: Element[];
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    renderTabBtn(title: string, id: number): lit_html.TemplateResult<1>;
    renderTabBtns(): lit_html.TemplateResult<1>;
    renderCore(): lit_html.TemplateResult<1>;
    get TotalTab(): number;
    get currentTab(): number;
    switchTab(id: number): void;
    nextTab(): void;
    prevTab(): void;
    captureInput(ip: Input): boolean;
}

declare class GridContainer extends ScrollContainer {
    eachRow: number;
    moveCursor(x: number, y: number): boolean;
    renderWrap(content: TemplateResult<1>): TemplateResult<1>;
}

declare class MixContainer extends Container {
    static readonly eleName: string;
    childUDLR: number[][];
    childRect: {
        w: number;
        h: number;
        x: number;
        y: number;
    }[];
    findCloset(id: number, x: number, y: number): number;
    linkToZero(id: number): boolean;
    countLinked(id: number): Set<number>;
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    moveCursor(x: number, y: number): boolean;
}

declare abstract class UISelectableBase extends UIChildBase {
    static styles: CSSResultGroup;
    selected: boolean;
    triggered: boolean;
    label?: string;
    hints: string;
    title: string;
    lock: boolean;
    active: boolean;
    callback?: ((t?: CustomEvent) => void) | undefined;
    select(): boolean;
    constructor();
    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    getHints(): string;
}

declare class Button extends UISelectableBase {
    constructor();
    selected: boolean;
    static styles: CSSResultGroup;
    playLockShake(): void;
    doPress(): boolean;
    renderCore(): TemplateResult<1>;
    captureInput(ip: Input): boolean;
}

declare class RangeComponent extends UISelectableBase {
    value: number;
    min: number;
    max: number;
    each: number;
    useFloat: boolean;
    static styles: lit.CSSResult[];
    renderCore(): TemplateResult<1>;
    onChange(e: Event): void;
    renderWrap(content: TemplateResult): TemplateResult<1>;
    render(): TemplateResult<1>;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    add(_add: -1 | 1): void;
    captureInput(ip: Input): boolean;
}

declare class HorizontalSelector extends UISelectableBase {
    value: string;
    readonly optionArray: string[];
    readonly radioName: string;
    constructor();
    static styles: lit.CSSResult[];
    renderWrap(content: TemplateResult): TemplateResult<1>;
    renderOption(option: string): TemplateResult<1>;
    optionName: Map<string, string>;
    getOptionName(option: string): string;
    private _onChange;
    renderCore(): TemplateResult<1>;
    render(): TemplateResult<1>;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    add(_add: -1 | 1): void;
    captureInput(ip: Input): boolean;
}

declare class CheckBox extends UISelectableBase {
    value: boolean;
    renderCore(): TemplateResult<1>;
    private _onChange;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    captureInput(ip: Input): boolean;
}

declare class Selector extends UISelectableBase {
    value: string;
    readonly optionArray: string[];
    readonly radioName: string;
    constructor();
    static styles: lit.CSSResult[];
    renderWrap(content: TemplateResult): TemplateResult<1>;
    optionName: Map<string, string>;
    getOptionName(option: string): string;
    private _onChange;
    renderCore(): TemplateResult<1>;
    render(): TemplateResult<1>;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    add(_add: -1 | 1): void;
    captureInput(ip: Input): boolean;
}

declare const clamp: (value: number, min: number, max: number) => number;
declare function delay(time?: number): Promise<void>;
declare function nextTick(fn: () => void): Promise<void>;
declare function anyPlayerPress(ips: InputGroup): number;
declare function anyPress(ips: InputGroup): InputSource | undefined;
declare function getRect(obj: HTMLElement): {
    w: number;
    h: number;
    x: number;
    y: number;
};
declare function deepEqual(obj1: any, obj2: any): boolean;
declare function removeElementWithIndex<T>(array: T[], index: number): T[];
declare const s: (v: number) => lit.CSSResult;
declare const l: (v: number) => lit.CSSResult;
declare const w: (v: number) => lit.CSSResult;
declare const h: (v: number) => lit.CSSResult;

declare const styled: (name: string, styles: CSSResultGroup, superclass?: typeof UIBase) => typeof UIBase;

declare class AlertPanel extends UIPanelBase {
    static suspendOnExit: boolean;
    static styles: CSSResultGroup;
    private alertType;
    private withCancel;
    show(): void;
    buttonName(input: string): string;
    renderButtons(): TemplateResult<1>;
    renderCore(): TemplateResult<1>;
    private static addPanel;
    static alert(str: TemplateResult): Promise<void>;
    static confirm(str: TemplateResult, withCancel?: boolean): Promise<boolean>;
    endAlert(): void;
    endConfirm(yes: boolean): void;
    onCancel(): void;
    onYes(): void;
    onNo(): void;
    captureInput(ip: Input): boolean;
}

export { AlertPanel, Button, CheckBox, Container, GridContainer, HoriContainer, HorizontalSelector, Layer, ListContainer, MI, MixContainer, RangeComponent, ScrollContainer, Selector, TabContainer, type UI, UIBG, UIBase, type UIChild, UIChildBase, type UIInput, type UIInteractive, UIInteractiveBase, UIMaster, type UIPanel, UIPanelBase, type UIParent, type UIParentRoot, UIParentRootBase, type UISelectable, anyPlayerPress, anyPress, centerCSS, clamp, deepEqual, delay, flexCenterCSS, fullScreenCSS, getRect, getSingletonUI, h, type inputType, isContainer, isUIChild, isUIChildRoof, isUIPanel, isUIParent, isUIParentRoot, isUISelectable, l, nextTick, nowSelectable, removeElementWithIndex, s, styled, w };
