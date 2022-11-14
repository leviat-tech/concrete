import { inject } from 'vue';
import logger from '../utils/logger.js';

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
    const isVModelActive = props.modelValue !== undefined;
    if (isVModelActive) {
      return;
    }

    // Don't fire the global handler without an 'id' prop
    if (props.id === undefined) {
      logger.warn(`Cannot fire global input handler without an 'id' prop`, props);
      return;
    }

    globalHandler?.(props.id, valueRef.value);
  }
}
