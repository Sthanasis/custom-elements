import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { classMap } from "lit/directives/class-map.js";

import "./header";
import {
  drawerPubSub,
  getSwipeDownPosition,
  getSwipeUpPosition,
  heightToTopOffset,
} from "@drawer/utilities";
import { SwipePosition } from "@drawer/types";
import { DrawerEvents } from "@drawer/constants";
@customElement("bottom-drawer")
export class Drawer extends LitElement {
  intersector = createRef<HTMLDivElement>();
  container = createRef<HTMLDivElement>();

  @property({ type: Boolean, reflect: true })
  open = false;
  @property({ state: true, type: Array })
  accessor _steps = [100];

  @property({ state: true, type: Number })
  accessor _offset = 0;
  @property({ state: true, type: Boolean })
  accessor _isDragging = false;
  @property({ state: true, type: Number })
  accessor _start = 0;
  @property({ state: true, type: Number })
  accessor _delta = 0;
  @property({ state: true, type: Number })
  accessor _tempHeightStep = 0;
  @property({ state: true, type: Number })
  accessor _contentHeight = 0;
  @property({ state: true, type: Number })
  accessor _activeStepHeight = 0;
  @property({ state: true, type: Number })
  accessor _initialPosition = 0;

  constructor() {
    super();
  }

  static styles = css`
    .container {
      position: fixed;
      width: 100%;
      height: 100vh;
      display: flex;
      flex-flow: column;
      background-color: inherit;
      left: 0;
      bottom: 0;
      overflow: hidden;
      transform: translateY(100%);
    }

    .transition {
      transition: transform 300ms ease-in;
    }
  `;

  private _adjustPosition() {
    if (!this.intersector.value) return;
    this._contentHeight = this.intersector.value.offsetTop;
    this._offset = window.innerHeight - this.intersector.value.offsetTop;
  }

  private getSwipePosition(): SwipePosition {
    if (this._delta < 0)
      return getSwipeUpPosition({
        contentHeight: this._contentHeight,
        currentStep: this._tempHeightStep,
        heightSteps: this._steps,
        translate: this._offset,
      });
    else if (this._delta > 0)
      return getSwipeDownPosition({
        currentStep: this._tempHeightStep,
        heightSteps: this._steps,
        translate: this._offset,
      });
    return { heightStep: this._tempHeightStep, position: this._start };
  }

  onTouchStart(e: TouchEvent) {
    if (e.cancelable) e.preventDefault();
    this._start = e.touches[0].clientY;
    this._initialPosition = this._offset ?? 0;
    this._tempHeightStep = this._activeStepHeight;
  }

  onTouchMove(e: TouchEvent) {
    if (e.cancelable) e.preventDefault();
    const { clientY } = e.touches[0];
    this._delta = clientY - this._start;
    drawerPubSub.emit(DrawerEvents.IS_DRAGGING, true);
    const moveDifference = this._initialPosition + this._delta;
    if (
      clientY <= 0 ||
      this._delta === 0 ||
      moveDifference <= heightToTopOffset(this._contentHeight) ||
      clientY <= heightToTopOffset(this._contentHeight)
    )
      return;
    drawerPubSub.emit(DrawerEvents.TRANSLATE, moveDifference);
  }

  onTouchEnd() {
    drawerPubSub.emit(DrawerEvents.IS_DRAGGING, false);
    const { position, heightStep } = this.getSwipePosition();

    if (position === null) drawerPubSub.emit(DrawerEvents.CLOSE);
    else if (this._delta !== 0) {
      drawerPubSub.emit(DrawerEvents.TRANSLATE, position);
      drawerPubSub.emit(DrawerEvents.CHANGE_HEIGHT_STEP, heightStep);
    }
    this._start = 0;
    this._delta = 0;
  }

  connectedCallback(): void {
    super.connectedCallback();
    drawerPubSub.on(DrawerEvents.IS_DRAGGING, (isDragging) => {
      this._isDragging = isDragging;
    });
    drawerPubSub.on(DrawerEvents.TRANSLATE, (translate) => {
      this._offset = translate;
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    drawerPubSub.clear();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, _old, value);
    this._adjustPosition();
  }

  override render() {
    const classes = {
      container: true,
      active: this.open,
      transition: !this._isDragging,
    };

    return html`
      <style>
        .active {
          transform: translateY(${this._offset}px) !important;
        }
      </style>
      <div
        class="${classMap(classes)}"
        @touchstart="${this.onTouchStart}"
        @touchmove="${this.onTouchMove}"
        @touchend="${this.onTouchEnd}"
      >
        <slot name="header">
          <drawer-header></drawer-header>
        </slot>

        <slot></slot>
        <div ${ref(this.intersector)}></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bottom-drawer": Drawer;
  }
}
