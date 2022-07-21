import { computed, inject } from 'vue';

export const colorProp = {
  type: String,
  default: 'default',
  validator: (prop) => ['default', 'indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
}

export const useSizeProp = (maxSize = 'lg') => {
  const allSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const sliceAtIndex = allSizes.indexOf(maxSize) + 1;
  const validPropSizes = (sliceAtIndex === 0) ? allSizes : allSizes.slice(0, sliceAtIndex);

  return {
    type: String,
    validator(value) {
      return validPropSizes.includes(value)
    }
  }
}

export const useSizeValue = (sizeProp) => {
  const options = inject('concrete', { size: 'md'});

  return sizeProp || options.size;
}

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
})
