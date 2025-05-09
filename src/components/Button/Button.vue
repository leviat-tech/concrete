<template>
  <button
    :id="id"
    :class="[...flexClass, sizeClass, colorClass, cursorClass, paddingClass]"
    :disabled="disabled || spinner?.rotating"
    @click="$emit('click', $event)"
    class="concrete__button"
  >
    <slot />
    <CIcon v-if="spinner" :type="spinnerType" :spin="spinner.rotating" :size="size" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useConcreteForms } from '../../composables/forms';
import { useCursorClass } from '../../composables/styles.js';
import CIcon from '../Icon/Icon.vue';
import FormElementProps from '../../types/FormElementProps';

interface Props extends FormElementProps {
  spinner?: {
    type: string;
    rotating: boolean;
  };
  active?: boolean;
  fillWidth?: boolean;
  customPadding?: boolean;
  fill?: 'solid' | 'outline' | 'ghost';
}

const props = withDefaults(defineProps<Props>(), {
  fill: 'solid',
});

const emit = defineEmits(['click']);
const size = useConcreteForms().getSizeValue(props.size);

// spinner
const [staticType = 'sync', dynamicType] = props.spinner?.type || [];
const spinnerType = computed(() => {
  if (dynamicType) return props.spinner?.rotating ? dynamicType : staticType;
  return staticType;
});

const flexClass = ['flex', 'gap-1', 'items-center', 'justify-items-center'];

const sizeClass = {
  xs: 'h-8 text-xs py-0.5',
  sm: 'h-8 text-sm py-1',
  md: 'h-10 text-base py-2',
  lg: 'h-12 text-lg py-2',
}[size];

const cursorClass = useCursorClass(props);
const paddingClass = props.customPadding ? '' : 'px-4';

const color = computed(() => (!props.color || props.color === 'default' ? 'indigo' : props.color));
const colorClass = computed(() => {
  const colorValue = color.value;

  let className = '';
  if (props.fill === 'solid') {
    className += 'border';
    if (props.disabled) {
      className += ` border-${colorValue}-light bg-${colorValue}-light text-${colorValue}-lightest`;
    } else {
      className += ` text-white hover:border-${colorValue}-dark hover:bg-${colorValue}-dark`;
      if (props.active) {
        className += ` border-${colorValue}-darkest bg-${colorValue}-darkest `;
      } else {
        className += ` border-${colorValue} bg-${colorValue} `;
      }
    }
  } else if (props.fill === 'outline') {
    className += 'border';
    if (props.disabled) {
      className += ` border-${colorValue}-lightest text-${colorValue}-lightest`;
    } else {
      if (props.active) {
        className += `  bg-${colorValue}-darkest border-${colorValue}-darkest text-white`;
      } else {
        className += ` border-${colorValue} text-${colorValue}`;
      }
    }
  } else {
    if (props.disabled) {
      className += `text-${colorValue}-light`;
    } else {
      className += `text-${colorValue} hover:text-${colorValue}-dark`;
      if (props.active) {
        className += `  text-${colorValue}-darkest `;
      } else {
        className += ` text-${colorValue}`;
      }
    }
  }
  return className;
});
</script>
