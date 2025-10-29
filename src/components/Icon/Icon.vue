<template>
  <slot v-if="$slots.default" />

  <component v-else :is="iconComponent" :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { icons } from './icons.js';

import { AvailableColors, AvailableSizes } from '../../types/FormElementProps';

const props = withDefaults(
  defineProps<{
    spin?: boolean;
    size?: AvailableSizes;
    color?: AvailableColors;
    type: keyof typeof icons;
  }>(),
  {
    size: 'md',
    color: 'default',
  }
);

const sizeClass = computed(() => {
  const sizes: Record<AvailableSizes, string> = {
    xs: 'w-3',
    sm: 'w-4',
    md: 'w-6',
    lg: 'w-8',
    xl: 'w-10',
    '2xl': 'w-12',
    '3xl': 'w-16',
  };
  return sizes[props.size];
});

const iconComponent = computed(() => {
  const icon = icons[props.type];

  if (!icon) {
    console.warn(`CIcon - invalid icon type (${props.type})`);
  }
  return icon;
});

const classes = computed(() => {
  const base = ['flex-none', 'text-sm'];
  if (colorClass.value) {
    base.push(colorClass.value);
  }
  if (sizeClass.value) {
    base.push(sizeClass.value);
  }
  if (props.spin) {
    base.push('animate-spin');
  }
  return base;
});

const colorClass = computed(() => props.color && `text-${props.color}`);
</script>
