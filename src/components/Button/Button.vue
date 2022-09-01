<template>
  <button
    :id="id"
    :class="[sizeClass, colorClass, cursorClass, paddingClass]"
    :disabled="disabled"
    @click="$emit('click')"
    class="concrete__button"
  >
    <div>
      <slot />
    </div>
  </button>
</template>


<script setup>
import { computed } from 'vue';
import { useSizeProp, colorProp } from '../../composables/props.js';
import { useSizeValue } from '../../composables/forms';

const props = defineProps({
  id: { type: String, default: null },
  color: colorProp,
  size: useSizeProp(),
  fill: {
    type: String,
    default: 'solid',
    validator: (prop) => ['solid', 'outline', 'ghost'].includes(prop),
  },
  disabled: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  customPadding: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);
const size = useSizeValue(props.size);

const sizeClass = {
  xs: 'h-6 text-xs py-0.5',
  sm: 'h-8 text-sm py-1',
  md: 'h-10 text-base py-2',
  lg: 'h-12 text-lg py-2',
}[size];

const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-pointer';
const paddingClass = (props.customPadding) ? '' : 'px-4';

const color = (!props.color || props.color === 'default') ? 'indigo' : props.color;
const colorClass = computed(() => {
  let className = '';
  if(props.fill === 'solid') {
    className += 'border';
    if(props.disabled) {
      className += ` border-${color}-light bg-${color}-light text-${color}-lightest`;
    }
    else {
      className += ` text-white hover:border-${color}-dark hover:bg-${color}-dark`;
      if (props.active) { 
        className += ` border-${color}-darkest bg-${color}-darkest `;
      }
      else {
        className += ` border-${color} bg-${color} `;
      }
    }
  } else if (props.fill === 'outline') {
    className += 'border';
    if(props.disabled) {
      className += ` border-${color}-lightest text-${color}-lightest`;
    }
    else {
      className += ` hover:text-white hover:bg-${color}`;
      if (props.active) { 
        className += `  bg-${color}-darkest border-${color}-darkest text-white`;
      }
      else {
        className += ` border-${color} text-${color}`;
      }
    }
  } else {
    if(props.disabled) {
      className += `text-${color}-light`;
    }
    else {
      className += `text-${color} hover:text-${color}-dark`;
      if (props.active) { 
        className += `  text-${color}-darkest `;
      }
      else {
        className += ` text-${color}`;
      }
    }
  }
  return className;
})
</script>