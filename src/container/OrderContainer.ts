import Container from "./Container";
import { UIChild } from "../ui";

export default class OrderContainer extends Container {
  moveCursor(x: number, y: number): boolean {
    if (this.cursorChild) {
      const attrName =
        x != 0
          ? x < 0
            ? "orderleft"
            : "orderright"
          : y < 0
            ? "orderup"
            : "orderdown";
      const targetName = this.cursorChild?.getAttribute(attrName);
      if (targetName) {
        //*(not tested yet)
        let com = this.shadowRoot!.querySelector(`[orderName=${targetName}]`);
        if (com) {
          this.setCursor(com as UIChild, true);
          return true;
        }
      }
    }

    return false;
  }
}
/**
 * <domui-order-container>
 *  <domui-child orderName='a' orderRight='b' orderDown='c'>A</domui-child>
 *  <domui-child orderName='b' orderLeft='a' orderDown='d'>B</domui-child>
 *  <domui-child orderName='c' orderUp='a' orderRight='d'>C</domui-child>
 * </domui-order-container>
 *
 *
 */
