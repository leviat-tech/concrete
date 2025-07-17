<template>
  <div class="concrete__input-affix relative inline-flex items-center px-3 border border-inherit whitespace-nowrap bg-base-100"
       :class="[sizeClass, typeClass, userClass, roundedClass, widthClass]">
    <slot />
  </div>
</template>

<script setup>
import { colorProp, useSizeProp } from '../../composables/props.js';
import { useConcreteForms } from '../../composables/forms.js';
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
  fixedWidth: {
    type: String,
    default: 'none',
    validator: (prop) => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(prop),
  }
});

const size = useConcreteForms().getSizeValue(props.size);
const userClassProp = props.type + 'Class';
const userClass = inject(userClassProp, '');

const roundedClass = {
  prefix: 'rounded-l-input',
  suffix: 'rounded-r-input',
  other: '',
}[props.type];

const sizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}[size];

const widthClass = {
  none: '',
  xs: 'w-8',
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-20',
}[props.fixedWidth];

const typeClass = {
  prefix: 'border-r-0',
  suffix: 'border-l-0',
  other: '',
}[props.type || 'prefix'];

</script>

