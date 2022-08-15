import { useConcrete } from './concrete.js';
import { inject } from 'vue';

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