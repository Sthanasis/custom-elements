import { SwipePosition } from '@drawer/types/swipePosition';
import { heightToTopOffset, vhToPixels } from '@drawer/utilities';
import { getNextHigherValue, getNextLowerValue } from '@drawer/utilities';

function getSwipeUpPosition(payload: {
  currentStep: number;
  heightSteps: number[];
  contentHeight: number;
  translate: number;
}): SwipePosition {
  // 1) Get next max height
  const { currentStep, heightSteps, contentHeight, translate } = payload;
  const nextHeight = getNextHigherValue(heightSteps, currentStep);
  // 2) !nextHeight translate to contentHeight;
  const contentOffset = heightToTopOffset(contentHeight);
  if (!nextHeight)
    return {
      position: contentOffset,
      heightStep: currentStep,
    };
  // 3) currentStep > contentHeight translate to contentHeight
  if (vhToPixels(nextHeight) > contentHeight)
    return {
      position: contentOffset,
      heightStep: nextHeight,
    };
  const nextHeightOffset = heightToTopOffset(vhToPixels(nextHeight));
  // 4) translate < nextHeight recursion
  if (translate < nextHeightOffset)
    return getSwipeUpPosition({ ...payload, currentStep: nextHeight });
  // 5) translate to nextHeight
  return {
    position: nextHeightOffset,
    heightStep: nextHeight,
  };
}

function getSwipeDownPosition(payload: {
  currentStep: number;
  heightSteps: number[];
  translate: number;
}): SwipePosition {
  const { currentStep, heightSteps, translate } = payload;
  // 1) Get next Max Height
  const nextHeightStep = getNextLowerValue(heightSteps, currentStep);
  // 2) !nextHeight close;
  if (!nextHeightStep)
    return {
      position: null,
      heightStep: currentStep,
    };

  const nextHeightPosition = heightToTopOffset(vhToPixels(nextHeightStep));
  // 3) translate > nextHeight recursion
  if (translate > nextHeightPosition)
    return getSwipeDownPosition({ ...payload, currentStep: nextHeightStep });
  // 4) translate to nextHeight
  return {
    position: nextHeightPosition,
    heightStep: nextHeightStep,
  };
}

export { getSwipeDownPosition, getSwipeUpPosition };
