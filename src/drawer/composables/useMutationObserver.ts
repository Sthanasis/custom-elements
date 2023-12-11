import { ref } from 'vue';

export const useMutationObserver = (callback: () => void) => {
  const mutationObserver = ref<MutationObserver>(
    new MutationObserver(callback)
  );

  function observe(target: HTMLElement) {
    mutationObserver.value.observe(target, {
      childList: true,
      subtree: true,
    });
  }

  function disconnect() {
    mutationObserver.value.disconnect();
  }

  return { observe, disconnect };
};
