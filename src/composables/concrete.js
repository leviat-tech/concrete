import { inject } from 'vue';

export const defaultOptions = {
  size: 'md',
  stacked: false,
  components: null,
  labelFormatter: (props) => props.label || props.id,
  inputHandler: null,
  inputIdToValue: null,
  wrapFormInputs: true,
}

export const useConcrete = () => {
  return inject('concrete', defaultOptions);
}

