<template>
  <div class="concrete__input-affix relative inline-flex items-center px-3 border border-inherit whitespace-nowrap bg-transparent"
       :class="[sizeClass, typeClass, userClass]">
    <slot />
  </div>
</template>

<script setup>
import { colorProp, useSizeProp } from '../../composables/props.js';
import { useSizeValue } from '../../composables/forms.js';
import { inject } from 'vue';

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
const userClassProp = props.type + 'Class';
const userClass = inject(userClassProp, '');

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

