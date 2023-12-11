import type { DrawerEvents } from '@drawer/types/drawerEvents';

class PubSub<T> {
  private subscriptions;
  constructor() {
    this.subscriptions = new Map<keyof T, (args: any) => void>();
  }

  on<Key extends keyof T>(event: Key, callback: (args: T[Key]) => void) {
    this.subscriptions.set(event, callback);
  }

  emit<Key extends keyof T>(event: Key, data?: T[Key]) {
    const cb = this.subscriptions.get(event);
    cb?.(data);
  }

  off(event: keyof T) {
    this.subscriptions.delete(event);
  }

  clear() {
    this.subscriptions.clear();
  }
}

const drawerPubSub = new PubSub<DrawerEvents>();

export default drawerPubSub;
