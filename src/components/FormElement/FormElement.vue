<template>
  <div
    class="concrete__form-element"
    :class="{ 'flex flex-row justify-between w-full': !stacked }"
  >
    <div
      :class="[stackedClass, sizeClass, textSizeClass, labelOrderClass, inputColorClass, disabledClass]"
      v-if="label || props.tooltip"
    >
      <div class="flex w-full" :class="{ 'justify-between' : stacked, 'flex-row-reverse' : !stacked && props.tooltip }">
        <label
          class="leading-5 whitespace-nowrap w-full"
          :class="[lineClampClass, labelClass]"
          :for="id"
          @mousedown="props.onMouseDown?.()"
          v-html="label"
        />
        <CTooltipIcon v-if="props.tooltip" :class="{ 'pr-2' : !stacked }" :size="size" v-tooltip="props.tooltip"/>
      </div>
    </div>
    <div :class="{ 'w-full': expandInput }">
      <slot></slot>
      <div :class="['text-xs', messageClass]" v-if="status.message">
        {{ status.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import { colorProp, useSizeProp } from '../../composables/props';
import { useConcreteForms } from '../../composables/forms';
import { useInputClasses } from '../../composables/styles';

const props = defineProps({
  id: String,
  label: String,
  labelFormatter: Function,
  message: String,
  stacked: { type: Boolean },
  expandInput: { type: Boolean, default: true },
  color: colorProp,
  disabled: { type: Boolean, default: false },
  size: useSizeProp(),
  noLabel: { type: Boolean },
  labelOrder: { type: Number },
  labelClass: String,
  tooltip: String,
  onMouseDown: Function
});

const {
  getFormLabel,
  getSizeValue,
  getStackedValue,
  getInputStatus,
} = useConcreteForms();

const LABEL_ORDER_CLASSES = {
  [0]: 'order-0 !basis-auto',
  [1]: 'order-1 !basis-auto',
};

const { textSizeClass, heightClass, disabledClass, inputColorClass } = useInputClasses(props);

const label = getFormLabel(props);
const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const status = getInputStatus(props);

provide('form-section', { stacked, size });
provide('form-element', { size, color: props.color });

const sizeCheck = stacked ? 'stacked' : size;
const lineClampClass = {
  xs: 'line-clamp-1',
  sm: 'line-clamp-2',
  md: 'line-clamp-2',
  lg: 'line-clamp-2',
  stacked: 'py-0.5 align-baseline',
}[sizeCheck];

const sizeClass = stacked ? '' : heightClass;

const messageClass = computed(() => {
  return {
    default: 'text-gray-400',
    indigo: 'text-indigo',
    sky: 'text-sky',
    steel: 'text-steel',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[status.value.color || 'default'];
});

const stackedClass = stacked
  ? 'mb-1 truncate flex justify-between'
  : (label)
    ? 'flex basis-1/2 flex-col justify-center pr-6'
    : 'flex flex-col justify-center pr-2';

const labelOrderClass = computed(() => {
  return props.labelOrder ? LABEL_ORDER_CLASSES[props.labelOrder] : '';
});
</script>
