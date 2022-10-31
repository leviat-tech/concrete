import { inject } from 'vue';

export const useEventHandler = (eventName, props, emit, valueRef, dirtyRef) => {
  const concrete = inject('concrete', {});
  const globalHandler = concrete.inputHandler;

  // Convert the raw event name to its corresponding prop name e.g. blur -> onBlur
  const propName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;

  return () => {
    // Prevent handlers firing if input value has not changed
    if (dirtyRef.value === false) return;

    dirtyRef.value = false;

    // If an event listener has been specified then only emit that event
    if (props[propName]) {
      return emit(eventName, valueRef.value)
    }

    // Don't fire the global handler if v-model is being used
    if (props.modelValue) {
      return;
    }

    globalHandler?.(props.id, valueRef.value);
  }
}
