import { useConcrete } from './concrete';
import { computed, inject, onMounted, onUnmounted, watch } from 'vue';
import logger from '../utils/logger.js';

function getInputElementFromRef(inputRef) {
  const input = inputRef.value;
  const el = (input instanceof HTMLElement) ? input : input.el;
  if (!(el instanceof HTMLElement)) {
    logger.warn('Could not register input');
  }
  return el;
}

export const useConcreteForms = () => {
  const concrete = useConcrete();
  
  return {
    getFormLabel: (props) => {
      const noLabel = ( props.noLabel || (!props.id && !props.label) );
      const formSection = inject('form-section', { size: null });
      const formatter = props.labelFormatter || formSection.labelFormatter || concrete.labelFormatter;
      return (!noLabel) ? formatter(props) : null;
    },
    getNoWrapValue: (props) => {
      return (props.noWrap || !concrete.wrapFormInputs);
    },
    getSizeValue: (sizeProp) => {
      const formSection = inject('form-section', { size: null });
      const formElement = inject('form-element', { size: null });
      return sizeProp || formElement.size || formSection.size || concrete.size || 'md';
    },
    getLabelWidthValue: (labelWidthProp) => {
      const formSection = inject('form-section', { labelWidth: null });
      const formElement = inject('form-element', { labelWidth: null });
      return labelWidthProp || formElement.labelWidth || formSection.labelWidth || concrete.labelWidth || 'md';
    },
    getStackedValue: (stackedProp) => {
      const formSection = inject('form-section', { stacked: null });
      const formElement = inject('form-element', { stacked: null });
      return stackedProp || formElement.stacked || formSection.stacked || concrete.stacked || false;
    },
    getInputValue: (props) => {
      const { inputIdToValue } = concrete;
      if (props.modelValue !== undefined || !props.id || !inputIdToValue) return props.modelValue;
      return inputIdToValue(props.id)
    },
    registerInput: (props, inputRef) => {
      const { id } = props;
      const { registerInputs, registeredInputs } = concrete;
      if (!id || !inputRef || !registerInputs) return;
      const isCustomHandler = (typeof registerInputs === 'function');
      let currentId = id;
      let unregisterInput;

      onMounted(() => {
        const el = getInputElementFromRef(inputRef);
        if (!isCustomHandler) {
          registeredInputs[id] = el;
          return;
        }

        unregisterInput = registerInputs(id, el);
        if (typeof unregisterInput !== 'function') {
          logger.warn(`Input id '${id}' registered without returning an unregister function`);
        }
      });

      // Re-register the input if the id changes
      watch(
        () => props.id,
        (nextId, prevId) => {
          currentId = nextId;

          const el = getInputElementFromRef(inputRef);
          if (isCustomHandler) {
            unregisterInput();
            unregisterInput = registerInputs(nextId, el);
            return;
          }

          delete registeredInputs[prevId];
          registeredInputs[nextId] = el
        }
      )

      onUnmounted(() => {
        if (isCustomHandler) {
          unregisterInput();
        } else {
          delete registeredInputs[currentId];
        }
      });
    },
    getInputStatus: (props) => {
      const { inputGetStatus } = concrete;
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
    },
    getInputIdToOptions: (props) => {
      if (props.options?.length) return props.options;

      const { inputIdToOptions } = concrete;
      return inputIdToOptions?.(props.id) || [];
    },
    getDefaultSpinner: () => {
      return concrete.defaultSpinner;
    },
  }
}
