import { LitElement, unsafeCSS, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./headerHandle";

@customElement("drawer-header")
export class DrawerHeader extends LitElement {
  constructor() {
    super();
  }

  @property({ type: String })
  handleColor = "black";

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 8px 0;
      cursor: pointer;
    }
  `;

  styles = css`
    header-handle {
      background-color: ${unsafeCSS(this.handleColor)};
    }
  `;

  render() {
    return html`<header-handle></header-handle> `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "drawer-header": DrawerHeader;
  }
}
