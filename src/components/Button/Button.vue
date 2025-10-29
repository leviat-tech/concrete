<template>
  <button
    :id="id"
    :class="[
      ...flexClass,
      sizeClass,
      colorClass,
      cursorClass,
      paddingClass,
      fillWidthClass,
      { 'opacity-50': disabled },
    ]"
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

import CIcon from '../Icon/Icon.vue';
import { icons } from '../../components/Icon/icons.js';
import FormElementProps from '../../types/FormElementProps';
import { useConcreteForms } from '../../composables/forms';
import { useCursorClass } from '../../composables/styles.js';

type IconType = keyof typeof icons;

interface Props extends FormElementProps {
  spinner?: {
    type: IconType[];
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

const flexClass = ['flex', 'gap-2', 'items-center', 'justify-center'];

const sizeClass = computed(
  () =>
    ({
      xs: 'h-8 text-xs py-0.5',
      sm: 'h-8 text-sm py-1',
      md: 'h-10 text-base py-2',
      lg: 'h-12 text-lg py-2',
    }[size])
);

const cursorClass = useCursorClass(props);
const paddingClass = computed(() => (props.customPadding ? '' : 'px-4'));
const fillWidthClass = computed(() => (props.fillWidth ? 'w-full' : ''));

const classMap = {
  solid: 'border text-white rounded-button',

  'solid-base-enabled': ' hover:border-base-700 hover:bg-base-700',
  'solid-base-default': ' border-base-500 bg-base-500',
  'solid-base-active': ' border-base-800 bg-base-800',

  'solid-brand-enabled': ' hover:border-brand-700 hover:bg-brand-700',
  'solid-brand-default': ' border-brand-500 bg-brand-500',
  'solid-brand-active': ' border-brand-800 bg-brand-800',

  'solid-info-enabled': ' hover:border-info-700 hover:bg-info-700',
  'solid-info-default': ' border-info-500 bg-info-500',
  'solid-info-active': ' border-info-800 bg-info-800',

  'solid-magic-enabled': ' hover:border-magic-700 hover:bg-magic-700',
  'solid-magic-default': ' border-magic-500 bg-magic-500',
  'solid-magic-active': ' border-magic-800 bg-magic-800',

  'solid-success-enabled': ' hover:border-success-700 hover:bg-success-700',
  'solid-success-default': ' border-success-500 bg-success-500',
  'solid-success-active': ' border-success-800 bg-success-800',

  'solid-warning-enabled': ' hover:border-warning-700 hover:bg-warning-700',
  'solid-warning-default': ' border-warning-500 bg-warning-500',
  'solid-warning-active': ' border-warning-800 bg-warning-800',

  'solid-danger-enabled': ' hover:border-danger-700 hover:bg-danger-700',
  'solid-danger-default': ' border-danger-500 bg-danger-500',
  'solid-danger-active': ' border-danger-800 bg-danger-800',

  outline: 'border rounded-button',

  'outline-base-enabled': ' hover:border-base-700 hover:bg-base-700 hover:text-white',
  'outline-base-default': ' border-base-500 text-base-500',
  'outline-base-active': ' border-base-800 bg-base-800 text-white',

  'outline-brand-enabled': ' hover:border-brand-700 hover:bg-brand-700 hover:text-white',
  'outline-brand-default': ' border-brand-500 text-brand-500',
  'outline-brand-active': ' border-brand-800 bg-brand-800 text-white',

  'outline-info-enabled': ' hover:border-info-700 hover:bg-info-700 hover:text-white',
  'outline-info-default': ' border-info-500 text-info-500',
  'outline-info-active': ' border-info-800 bg-info-800 text-white',

  'outline-magic-enabled': ' hover:border-magic-700 hover:bg-magic-700 hover:text-white',
  'outline-magic-default': ' border-magic-500 text-magic-500',
  'outline-magic-active': ' border-magic-800 bg-magic-800 text-white',

  'outline-success-enabled': ' hover:border-success-700 hover:bg-success-700 hover:text-white',
  'outline-success-default': ' border-success-500 text-success-500',
  'outline-success-active': ' border-success-800 bg-success-800 text-white',

  'outline-warning-enabled': ' hover:border-warning-700 hover:bg-warning-700 hover:text-white',
  'outline-warning-default': ' border-warning-500 text-warning-500',
  'outline-warning-active': ' border-warning-800 bg-warning-800 text-white',

  'outline-danger-enabled': ' hover:border-danger-700 hover:bg-danger-700 hover:text-white',
  'outline-danger-default': ' border-danger-500 text-danger-500',
  'outline-danger-active': ' border-danger-800 bg-danger-800 text-white',

  ghost: 'font-medium',

  'ghost-base-enabled': ' hover:text-base-700 hover:underline',
  'ghost-base-default': ' text-base-500',
  'ghost-base-active': ' text-base-800',

  'ghost-brand-enabled': ' hover:text-brand-700 hover:underline',
  'ghost-brand-default': ' text-brand-500',
  'ghost-brand-active': ' text-brand-800',

  'ghost-info-enabled': ' hover:text-info-700 hover:underline',
  'ghost-info-default': ' text-info-500',
  'ghost-info-active': ' text-info-800',

  'ghost-magic-enabled': ' hover:text-magic-700 hover:underline',
  'ghost-magic-default': ' text-magic-500',
  'ghost-magic-active': ' text-magic-800',

  'ghost-success-enabled': ' hover:text-success-700 hover:underline',
  'ghost-success-default': ' text-success-500',
  'ghost-success-active': ' text-success-800',

  'ghost-warning-enabled': ' hover:text-warning-700 hover:underline',
  'ghost-warning-default': ' text-warning-500',
  'ghost-warning-active': ' text-warning-800',

  'ghost-danger-enabled': ' hover:text-danger-700 hover:underline',
  'ghost-danger-default': ' text-danger-500',
  'ghost-danger-active': ' text-danger-800',
};
const color = computed(() => (!props.color || props.color === 'default' ? 'base' : props.color));
const colorClass = computed(() => {
  const c = color.value;
  let className = '';
  const disabledClass = 'opacity-50 rounded-button';
  if (props.fill === 'solid') {
    className += classMap.solid;
    className += props.disabled ? disabledClass : classMap[`solid-${c}-enabled`];
    className += props.active ? classMap[`solid-${c}-active`] : classMap[`solid-${c}-default`];
  } else if (props.fill === 'outline') {
    className += classMap.outline;
    className += props.disabled ? disabledClass : classMap[`outline-${c}-enabled`];
    className += props.active ? classMap[`outline-${c}-active`] : classMap[`outline-${c}-default`];
  } else {
    className += classMap.ghost;
    className += props.disabled ? disabledClass : classMap[`ghost-${c}-enabled`];
    className += props.active ? classMap[`ghost-${c}-active`] : classMap[`ghost-${c}-default`];
  }
  return className;
});
</script>
