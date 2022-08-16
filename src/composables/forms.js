import { useConcrete } from './concrete';
import { inject, onMounted, onUnmounted } from 'vue';
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

  onMounted(() => {
    const input = inputRef.value;
    const el = (input instanceof HTMLElement) ? input : input.el;
    if (!(el instanceof HTMLElement)) logger.warn(`Could not register input with id '${id}'`);
    registeredInputs[id] = el;
    if (typeof registerInputs === 'function') {
      registerInputs(id, el);
    }
  });

  onUnmounted(() => {
    delete registeredInputs[id];
  });
}
