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
  md: 'text-base',
  lg: 'text-lg',
};

const hPaddingClassMap = {
  xs: 'px-1.5',
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-2',
};

const colorClassMap = {
  default: 'border-base-300 text-base-800',
  base: 'border-base-300 text-base-800',
  brand: 'border-base-300 text-base-800',
  success: 'border-status-success text-base-800',
  warning: 'border-status-warning text-base-800',
  danger: 'border-status-danger text-base-800',
  info: 'border-status-info text-base-800',
  magic: 'border-status-magic text-base-800 ',
};

const layoutClasses = 'block truncate z-20 w-full border font-normal text-left'
const focusClasses = 'focus:outline-none focus:ring-1 focus:border-brand-700 hover:border-base-600';
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

export const useRoundedClass = (props) => {
  return computed(() => {
    if(props.prefix == null && props.suffix == null) {
      return 'rounded-input';
    } else if(props.prefix == null) {
      return 'rounded-l-input';
    } else if(props.suffix == null) {
      return 'rounded-r-input';
    } else {
      return '';
    }
  })
}

export const useInputClasses = (props) => {
  const size = useConcreteForms().getSizeValue(props.size);
  const heightClass = heightClassMap[size];
  const textSizeClass = textSizeClassMap[size];
  const hPaddingClass = hPaddingClassMap[size];
  const mergedSizeClass = [heightClass, textSizeClass, hPaddingClass].join(' ');

  const inputColorClass = computed(() => props.disabled
    ? 'opacity-50 border-base-500'
    : useInputColorClassValue(props)
  );

  return {
    heightClass,
    textSizeClass,
    hPaddingClass,
    mergedSizeClass,
    inputColorClass: inputColorClass.value,
    bgColorClass: (props.transparent) ? 'bg-transparent' : 'bg-white',
    disabledClass: computed(() => props.disabled && 'opacity-90'),
  }
}
