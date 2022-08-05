import { inject } from 'vue';

export const defaultOptions = {
  size: 'sm',
  components: null,
  labelFormatter: (label) => label,
  inputHandler: null
}

export const useConcrete = () => {
  return inject('concrete', defaultOptions);
}

