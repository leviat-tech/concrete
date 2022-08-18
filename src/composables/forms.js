import { useConcrete } from './concrete';
import { computed, inject, onMounted, onUnmounted } from 'vue';
import logger from '../utils/logger.js';

export const useFormLabel = (props) => {
  const concrete = useConcrete();
  const formatter = props.labelFormatter || concrete.labelFormatter;
  return (!!props.label) ? formatter(props.label, props.id) : null;
}

export const useSizeValue = (sizeProp) => {
  const concrete = inject('concrete', { size: null });
  const formSection = inject('form-section', { size: null });
  const formElement = inject('form-element', { size: null });
  return sizeProp || formElement.size || formSection.size || concrete.size || 'md';
}

export const useStackedValue = (stackedProp) => {
  const concrete = inject('concrete', { stacked: null });
  const formSection = inject('form-section', { stacked: null });
  const formElement = inject('form-element', { stacked: null });
  return stackedProp || formElement.stacked || formSection.stacked || concrete.stacked || false;
}

export const useFormElementValue = (labelProp) => {
  const formElement = inject('form-element', { isFormElement: null });
  return formElement.isFormElement || !!labelProp;
}

export const useInputValue = (props) => {
  const { inputIdToValue } = useConcrete();

  if (props.modelValue !== undefined || !props.id || !inputIdToValue) return props.modelValue;

  return inputIdToValue(props.id)
}

export const useRegisterInput = (id, inputRef) => {
  const { registerInputs, registeredInputs } = useConcrete();

  if (!id || !inputRef || !registerInputs) return;

  const isCustomHandler = (typeof registerInputs === 'function');
  let unregisterInput;

  onMounted(() => {
    const input = inputRef.value;
    const el = (input instanceof HTMLElement) ? input : input.el;
    if (!(el instanceof HTMLElement)) {
      return logger.warn(`Could not register input with id '${id}'`);
    }

    if (!isCustomHandler) {
      registeredInputs[id] = el;
      return;
    }

    unregisterInput = registerInputs(id, el);
    if (typeof unregisterInput !== 'function') {
      logger.warn(`Input id '${id}' registered without returning an unregister function`);
    }
  });

  onUnmounted(() => {
    if (isCustomHandler) {
      unregisterInput();
    } else {
      delete registeredInputs[id];
    }
  });
}

export const useInputStatus = (props) => {
  const { inputGetStatus } = useConcrete();
  const colorTypeMap = {
    info: 'default',
    warning: 'warning',
    error: 'danger',
  }

  return computed(() => {
    const defaultStatus = { color: props.color || 'default' };

    // Local props take precedence over global getters
    if (props.message) {
      return { message: props.message, color: props.color };
    }

    if (!inputGetStatus || !props.id) return defaultStatus;

    const status = inputGetStatus(props.id);

    if (!status) return defaultStatus;

    if (typeof status === 'string') {
      return { message: status, color: props.color || colorTypeMap.error };
    }

    if (typeof status === 'object') {
      const { message, type } = status;

      if (!message) return defaultStatus;

      const color = type ? colorTypeMap[type] : colorTypeMap.error;
      return { message, color: props.color || color };
    }
  })
}
