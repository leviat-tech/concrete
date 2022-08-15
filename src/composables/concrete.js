import { inject } from 'vue';

export const defaultOptions = {
  size: 'sm',
  stacked: false,
  components: null,
  labelFormatter: (label) => label,
  inputHandler: null,
  inputIdToValue: null,
}

export const useConcrete = () => {
  return inject('concrete', defaultOptions);
}

