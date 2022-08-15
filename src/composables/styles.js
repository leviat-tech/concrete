import { computed } from 'vue';

export const useInputColorClassValue = (colorProp) => computed(() => {
  const colorClassMap = {
    default: 'border-gray-300 text-black',
    indigo: 'border-indigo-light text-indigo-darkest',
    sky: 'border-sky-light text-sky-darkest',
    steel: 'border-steel-light text-steel-darkest',
    success: 'border-success-light text-success-darkest',
    warning: 'border-warning-light text-warning-darkest',
    danger: 'border-danger-light text-danger-darkest',
  };

  return colorClassMap[colorProp]
});
