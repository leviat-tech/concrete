<template>
  <button
    :id="id"
    :class="[sizeClass, colorClass, cursorClass, paddingClass]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    class="concrete__button"
  >
    <slot />
  </button>
</template>


<script setup>
import { computed } from 'vue';
import { useSizeProp, colorProp } from '../../composables/props.js';
import { useSizeValue } from '../../composables/forms';
import { useCursorClass } from '../../composables/styles.js';

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
  xs: 'h-8 text-xs py-0.5',
  sm: 'h-8 text-sm py-1',
  md: 'h-10 text-base py-2',
  lg: 'h-12 text-lg py-2',
}[size];

const cursorClass = useCursorClass(props);
const paddingClass = (props.customPadding) ? '' : 'px-4';

const color = computed(() => (!props.color || props.color === 'default') ? 'indigo' : props.color);
const colorClass = computed(() => {
  const colorValue = color.value;

  let className = '';
  if(props.fill === 'solid') {
    className += 'border';
    if(props.disabled) {
      className += ` border-${colorValue}-light bg-${colorValue}-light text-${colorValue}-lightest`;
    }
    else {
      className += ` text-white hover:border-${colorValue}-dark hover:bg-${colorValue}-dark`;
      if (props.active) {
        className += ` border-${colorValue}-darkest bg-${colorValue}-darkest `;
      }
      else {
        className += ` border-${colorValue} bg-${colorValue} `;
      }
    }
  } else if (props.fill === 'outline') {
    className += 'border';
    if(props.disabled) {
      className += ` border-${colorValue}-lightest text-${colorValue}-lightest`;
    }
    else {
      if (props.active) {
        className += `  bg-${colorValue}-darkest border-${colorValue}-darkest text-white`;
      }
      else {
        className += ` border-${colorValue} text-${colorValue}`;
      }
    }
  } else {
    if(props.disabled) {
      className += `text-${colorValue}-light`;
    }
    else {
      className += `text-${colorValue} hover:text-${colorValue}-dark`;
      if (props.active) {
        className += `  text-${colorValue}-darkest `;
      }
      else {
        className += ` text-${colorValue}`;
      }
    }
  }
  return className;
})
</script>
