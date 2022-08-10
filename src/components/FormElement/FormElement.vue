<template>
  <div class="concrete__form-element" :class="{ 'flex flex-row justify-between w-full' : !stacked }">
    <div :class="[stackedClass, sizeClass, textSizeClass]" v-if="label">
      <span class="leading-5" :class="[lineClampClass]">
        {{ label }}
      </span>
    </div>
    <div :class="{ 'w-full' : expandInput }">
      <slot></slot>
      <div :class="['text-xs', messageClass]" v-if="message">{{message}}</div>
    </div>
  </div>
</template>


<script setup>

import { computed, provide, inject } from 'vue';
import { useFormLabel } from '../../composables/forms.js';
import { colorProp, useSizeProp } from '../../composables/props';
import { useSizeValue, useStackedValue } from '../../composables/forms.js';


const props = defineProps({
  id: String,
  label: String,
  labelFormatter: Function,
  message: String,
  stacked: { type: Boolean },
  expandInput: { type: Boolean, default: true },
  color: colorProp,
  size: useSizeProp(),
});

const label = useFormLabel(props);
const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
provide('form-section',  { stacked, size });
provide('form-element',  { size, color: props.color, isFormElement: true })

const sizeCheck = (stacked) ? 'stacked' :size;
const lineClampClass = computed(() => {
  return {
    xs: 'line-clamp-1',
    sm: 'line-clamp-2',
    md: 'line-clamp-2',
    lg: 'line-clamp-2',
    stacked: 'py-0.5 align-baseline'
  }[sizeCheck];
});

const sizeClass = computed(() => {
  return {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    stacked: ''
  }[sizeCheck];
});

const textSizeClass = computed(() => {
  return {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];
});

const messageClass = computed(() => {
  return {
    default: 'text-gray-400',
    indigo: 'text-indigo',
    sky: 'text-sky',
    steel: 'text-steel',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[props.color];
});

const stackedClass = stacked ? 'mb-1 truncate' : 'basis-1/2 flex flex-col justify-center pr-8';


</script>
