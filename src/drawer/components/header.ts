import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("drawer-header")
export class DrawerHeader extends LitElement {
  @property({ type: String, attribute: "handle-color" })
  handleColor = "black";

  constructor() {
    super();
    this.handleColor = "black";
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 8px 0;
        cursor: pointer;
      }

      div {
        display: flex;
        height: 4px;
        width: 36px;
        border-radius: 9999px;
        background-color: black;
      }
    `;
  }

  render() {
    return html`<div></div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "drawer-header": DrawerHeader;
  }
}
