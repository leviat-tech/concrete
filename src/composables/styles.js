import { computed } from 'vue';
import { useConcreteForms } from './forms';

const heightClassMap = {
  xs: 'h-8',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

export const textSizeClassMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const hPaddingClassMap = {
  xs: 'px-1.5',
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-2',
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

const layoutClasses = 'block truncate z-20 w-full border text-left'
const focusClasses = 'focus:outline-none focus:ring-0 focus:border-indigo-light';
export const inputStaticClasses = [layoutClasses, focusClasses].join(' ' +
  '');

export const useInputColorClassValue = (props) => {
  const status = useConcreteForms().getInputStatus(props);

  return computed(() => {
    return colorClassMap[status.value?.color] || colorClassMap.default;
  });
}

export const useCursorClass = (props, enabledCursorClass) => {
  return computed(() => props.disabled ? 'cursor-not-allowed' : enabledCursorClass);
}

export const useInputClasses = (props) => {
  const size = useConcreteForms().getSizeValue(props.size);
  const heightClass = heightClassMap[size];
  const textSizeClass = textSizeClassMap[size];
  const hPaddingClass = hPaddingClassMap[size];
  const mergedSizeClass = [heightClass, textSizeClass, hPaddingClass].join(' ');

  return {
    heightClass,
    textSizeClass,
    hPaddingClass,
    mergedSizeClass,
    inputColorClass: useInputColorClassValue(props),
    bgColorClass: (props.transparent) ? 'bg-transparent' : 'bg-white',
    disabledClass: computed(() => props.disabled && 'opacity-60'),
  }
}
