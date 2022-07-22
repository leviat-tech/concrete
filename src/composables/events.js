import { inject } from 'vue';

export const useEventHandler = (eventName, props, emit, valueRef, dirtyRef) => {
  const concrete = inject('concrete');
  const globalHandler = concrete.inputHandler;

  // Convert the raw event name to its corresponding prop name e.g. blur -> onBlur
  const propName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;

  return () => {
    // Prevent handlers firing if input value has not changed
    if (dirtyRef.value === false) return;

    dirtyRef.value = false;

    if (props[propName] || !globalHandler) {
      return emit(eventName, valueRef.value)
    }

    globalHandler(props.id, valueRef.value);
  }
}
