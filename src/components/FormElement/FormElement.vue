<template>
  <div class="concrete__form-element" :class="{ 'flex flex-row justify-between w-full' : !stacked }">
    <div :class="[stackedClass, sizeClass, textSizeClass]" v-if="label">
      <label class="leading-5" :class="[lineClampClass]" :for="id">
        {{ label }}
      </label>
    </div>
    <div :class="{ 'w-full' : expandInput }">
      <slot></slot>
      <div :class="['text-xs', messageClass]" v-if="status.message">{{ status.message }}</div>
    </div>
  </div>
</template>


<script setup>

import { computed, provide } from 'vue';
import { colorProp, useSizeProp } from '../../composables/props';
import { useFormLabel, useSizeValue, useStackedValue, useInputStatus } from '../../composables/forms';
import { useInputClasses } from '../../composables/styles';

const props = defineProps({
  id: String,
  label: String,
  labelFormatter: Function,
  message: String,
  stacked: { type: Boolean },
  expandInput: { type: Boolean, default: true },
  color: colorProp,
  size: useSizeProp(),
  noLabel: { type: Boolean },
});

const {
  textSizeClass,
  heightClass,
  disabledClass,
} = useInputClasses(props);

const label = useFormLabel(props);
const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
const status = useInputStatus(props);

provide('form-section', { stacked, size });
provide('form-element', { size, color: props.color })

const sizeCheck = (stacked) ? 'stacked' : size;
const lineClampClass = {
  xs: 'line-clamp-1',
  sm: 'line-clamp-2',
  md: 'line-clamp-2',
  lg: 'line-clamp-2',
  stacked: 'py-0.5 align-baseline'
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

const stackedClass = stacked ? 'mb-1 truncate' : 'basis-1/2 flex flex-col justify-center pr-8';

</script>
