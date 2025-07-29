<template>
  <button
    :title="name"
    :class="[staticClasses, heightClass, colorClass, (textButton && 'px-2') || widthClass]"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    @mouseleave="mousedown = false"
    @click="onClick"
  >
    <template v-if="textButton">{{ name }}</template>
    <CIcon v-else-if="icon" :type="icon" :size="iconSize"/>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import CIcon from '../Icon/Icon.vue';
import { icons } from 'components/Icon/icons.js';
import { useConcreteForms } from '../../composables/forms';
import { AvailableColors, AvailableSizes } from 'types/FormElementProps.js';

interface Props {
  name?: string;
  toolId?: string;
  stateful?: boolean;
  disabled?: boolean;
  hoverable?: boolean;
  textButton?: boolean;
  color?: AvailableColors;
  iconSize?: AvailableSizes;
  icon?: keyof typeof icons;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'xs',
  name: 'default',
  stateful: false,
  disabled: false,
  hoverable: true,
  color: 'default',
  textButton: false,
});

const emit = defineEmits(['click']);

const selectedTool = inject('concreteSelectedTool', null);
const isActive = props.stateful ? computed(() => selectedTool.value === props.toolId) : false;
const mousedown = ref(false);

const size: 'xs' | 'sm' | 'md' | 'lg'  = useConcreteForms().getSizeValue(props.size);
const heightClass = computed(
  () =>
    ({
      xs: 'h-8 text-xs p-1.5',
      sm: 'h-8 text-sm p-1',
      md: 'h-10 text-base p-1.5',
      lg: 'h-12 text-lg p-1.5',
    }[size])
);

const widthClass = computed(
  () =>
    ({
      xs: 'w-8',
      sm: 'w-8',
      md: 'w-10',
      lg: 'w-12',
    }[size])
);

const staticClasses =
  'flex items-center justify-center rounded-button concrete__tool outline-none border';

const classMap = {
  base: 'text-base-600',
  'base-enabled': ' hover:text-base-800',
  'base-active': ' border-base-600',

  brand: 'text-brand-600',
  'brand-enabled': ' hover:text-brand-800',
  'brand-active': ' border-brand-600',

  info: 'text-info-600',
  'info-enabled': ' hover:text-info-800',
  'info-active': ' border-info-600',

  magic: 'text-magic-600',
  'magic-enabled': ' hover:text-magic-800',
  'magic-active': ' border-magic-600',

  success: 'text-success-600',
  'success-enabled': ' hover:text-success-800',
  'success-active': ' border-success-600',

  warning: 'text-warning-600',
  'warning-enabled': ' hover:text-warning-800',
  'warning-active': ' border-warning-600',

  danger: 'text-danger-600',
  'danger-enabled': ' hover:text-danger-800',
  'danger-active': ' border-danger-600',
};

const color = computed(() => (!props.color || props.color === 'default' ? 'base' : props.color));

const colorClass = computed(() => {
  const c = color.value;
  let className = classMap[c];
  if (props.disabled) className += ' opacity-50 cursor-not-allowed';
  else if (props.hoverable) className += classMap[`${c}-enabled`];
  className += isActive.value ? classMap[`${c}-active`] : ' border-transparent';
  return className;
});

const onClick = () => {
  if (props.disabled) return;

  if (props.stateful) {
    selectedTool.value = props.toolId;
  }

  emit('click', props.toolId);
};
</script>
