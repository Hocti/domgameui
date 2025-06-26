import { css, CSSResultGroup } from "lit";
import { UIBase } from "../ui/SimpleBaseUI";
import { fullScreenCSS } from "./Layer";

export abstract class UIBG extends UIBase {
  static styles: CSSResultGroup = [
    css`
      :host {
        ${fullScreenCSS}
        pointer-events:none;
      }
    `,
  ];
}
