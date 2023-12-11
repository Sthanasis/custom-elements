import { ComputedRef, Ref, ref } from 'vue';

import { DrawerEvents } from '@drawer/constants';
import type { SwipePosition } from '@drawer/types';
import {
  getSwipeDownPosition,
  getSwipeUpPosition,
  heightToTopOffset,
} from '@drawer/utilities';
import drawerPubSub from '@drawer/utilities/drawerPubSub';

export const useDrawerGestures = (
  steps: ComputedRef<number[]>,
  contentHeight: Ref<number>,
  translate: Ref<number>,
  activeStepHeight: Ref<number>
) => {
  const start = ref<number>(0),
    delta = ref<number>(0),
    tempHeightStep = ref<number>(0);

  function getSwipePosition(): SwipePosition {
    if (delta.value < 0)
      return getSwipeUpPosition({
        contentHeight: contentHeight.value,
        currentStep: tempHeightStep.value,
        heightSteps: steps.value,
        translate: translate.value,
      });
    else if (delta.value > 0)
      return getSwipeDownPosition({
        currentStep: tempHeightStep.value,
        heightSteps: steps.value,
        translate: translate.value,
      });
    return { heightStep: tempHeightStep.value, position: start.value };
  }

  function onTouchStart(e: TouchEvent) {
    if (e.cancelable) e.preventDefault();
    start.value = translate.value;
    tempHeightStep.value = activeStepHeight.value;
    drawerPubSub.emit(
      DrawerEvents.CHANGE_HEIGHT_STEP,
      steps.value[steps.value.length - 1]
    );
  }

  function onDrag(e: TouchEvent) {
    if (e.cancelable) e.preventDefault();
    drawerPubSub.emit(DrawerEvents.IS_DRAGGING, true);
    const { clientY } = e.touches[0];
    delta.value = clientY - start.value;
    if (clientY <= 0) return;
    if (clientY <= heightToTopOffset(contentHeight.value)) return;
    if (delta.value === 0) return;
    drawerPubSub.emit(DrawerEvents.TRANSLATE, clientY);
  }

  function onTouchEnd() {
    drawerPubSub.emit(DrawerEvents.IS_DRAGGING, false);
    const { position, heightStep } = getSwipePosition();
    if (position === null) drawerPubSub.emit(DrawerEvents.CLOSE);
    else if (delta.value !== 0) {
      drawerPubSub.emit(DrawerEvents.TRANSLATE, position);
      drawerPubSub.emit(DrawerEvents.CHANGE_HEIGHT_STEP, heightStep);
    }
    start.value = 0;
    delta.value = 0;
  }

  return {
    onTouchStart,
    onDrag,
    onTouchEnd,
  };
};
