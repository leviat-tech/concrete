import { inject } from 'vue';
import { defaultOptions } from '../';

export const useConcrete = () => {
  return inject('concrete', defaultOptions);
}
