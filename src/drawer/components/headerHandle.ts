import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header-handle")
export class HeaderHandle extends LitElement {
  constructor() {
    super();
  }

  static styles = [
    css`
      :host {
        display: flex;
        height: 4px;
        width: 36px;
        border-radius: 9999px;
        background-color: white;
      }
    `,
  ];

  protected render() {
    return html`<div></div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "header-handle": HeaderHandle;
  }
}
