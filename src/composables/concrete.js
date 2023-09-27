
import { inject, reactive } from 'vue';

export const defaultOptions = {
  size: 'md',
  stacked: false,
  components: null,
  labelFormatter: (props) => props.label || props.id,
  inputHandler: null,
  inputIdToValue: null,
  wrapFormInputs: true,
  accordionState: reactive({}),
  customUnits: null,
  defaultSpinner: true,
};

export const useConcrete = () => {
  return inject('concrete', defaultOptions);
};
