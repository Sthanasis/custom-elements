import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./header";

@customElement("bottom-drawer")
export class Drawer extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      position: fixed;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      background-color: inherit;
      left: 0;
      bottom: 0;
      border-radius: 0.75rem;
      overflow: hidden;
    }
  `;

  render() {
    return html`<drawer-header></drawer-header>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bottom-drawer": Drawer;
  }
}
