import { computed } from 'vue';
import { useInputStatus, useSizeValue } from './forms';

const heightClassMap = {
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

const textSizeClassMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const vPaddingClassMap = {
  xs: 'py-0.5',
  sm: 'py-1',
  md: 'py-2',
  lg: 'py-2',
};

const colorClassMap = {
  default: 'border-gray-300 text-black',
  indigo: 'border-indigo-light text-indigo-darkest',
  sky: 'border-sky-light text-sky-darkest',
  steel: 'border-steel-light text-steel-darkest',
  success: 'border-success-light text-success-darkest',
  warning: 'border-warning-light text-warning-darkest',
  danger: 'border-danger-light text-danger-darkest',
};

const layoutClasses = 'block truncate z-20 w-full border text-left px-3'
const focusClasses = 'focus:outline-none focus:ring-1 focus:border-indigo-light focus:ring-indigo-light';
export const inputStaticClasses = [layoutClasses, focusClasses].join(' ' +
  '');

export const useInputColorClassValue = (props) => {
  const status = useInputStatus(props);

  return computed(() => {
    return colorClassMap[status.value?.color]
  });
}

export const useInputClasses = (props) => {
  const size = useSizeValue(props.size);
  const heightClass = heightClassMap[size];
  const textSizeClass = textSizeClassMap[size];
  const vPaddingClass = heightClassMap[size];
  const mergedSizeClass = [heightClass, textSizeClass, vPaddingClass].join(' ');

  return {
    heightClass,
    textSizeClass,
    vPaddingClass,
    mergedSizeClass,
    inputColorClass: useInputColorClassValue(props),
    bgColorClass: (props.transparent) ? 'bg-transparent' : 'bg-white',
    disabledClass: computed(() => props.disabled && 'opacity-60'),
  }
}
