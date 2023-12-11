import type { DrawerEvents as DrawerEventsType } from '@drawer/types/drawerEvents';

export const DrawerEvents: { [key in keyof DrawerEventsType]: key } = {
  CLOSE: 'CLOSE',
  IS_DRAGGING: 'IS_DRAGGING',
  TRANSLATE: 'TRANSLATE',
  CHANGE_HEIGHT_STEP: 'CHANGE_HEIGHT_STEP',
};
