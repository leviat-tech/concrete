<template>
    <div class="flex justify-between w-full items-center" :class="[underlineClass, colorClass, sizeClass]">
      <div :class="[textClass]">{{ title }}</div>
      <slot name="toolbar"></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { colorProp } from '../../composables/props';
import { useConcreteForms } from '../../composables/forms';

const props = defineProps({
  color: colorProp,
  size: { type: Number, default: 1 },
  title: { type: String, default: '' },
  underline: { type: Boolean, default: false },
});

const { getSizeValue, getStackedValue } = useConcreteForms();

const size = getSizeValue(props.size);

const underlineClass = computed(() => (props.underline ? 'border-b' : ''));

const colorClass = computed(() => {
  const options = {
    default: 'border-base-300 text-base-800',
    success: 'border-status-success text-success-600',
    warning: 'border-status-warning text-warning-600',
    danger: 'border-status-danger text-danger-600',
    info: 'border-status-info text-info-600',
    magic: 'border-status-magic text-magic-600',
  }
  return options[props.color] || options.default;
});

const sizeClass = computed(() => {
  const options = {
    1: 'h-8',
    2: 'h-8',
    3: 'h-6',
    4: 'h-6',
  }
  return options[props.size] || options[1];
});

const textClass = computed(() => {
  const options = {
    1: 'text-base font-semibold',
    2: 'text-sm font-semibold',
    3: 'text-xs font-semibold',
    4: 'text-xs font-normal',
  }
  return options[props.size] || options[1];
});

</script>
