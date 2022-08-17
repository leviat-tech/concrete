<template>
  <div class="concrete__input-affix relative inline-flex items-center px-3 border whitespace-nowrap"
       :class="[sizeClass, typeClass, colorClass, transparentClass]">
    <slot />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { colorProp, useSizeProp } from '../../composables/props.js';
import { useInputColorClassValue } from '../../composables/styles.js';
import { useSizeValue } from '../../composables/forms.js';

const { color } = inject('form-element', { color: null });

const props = defineProps({
  color: colorProp,
  size: useSizeProp(),
  transparent: { type: Boolean, default: false },
  type: {
    type: String,
    default: 'prefix',
    validator: (prop) => ['prefix', 'suffix', 'other'].includes(prop),
  },
});

const size = useSizeValue(props.size);

const transparentClass =  (props.transparent) ? 'bg-transparent' : ' bg-gray-50';
const colorClass = useInputColorClassValue(props);

const sizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}[size];

const typeClass = {
  prefix: 'border-r-0',
  suffix: 'border-l-0',
  other: '',
}[props.type || 'prefix'];

</script>

