<template>
  <div :class="['relative inline-flex items-center px-3 border whitespace-nowrap', sizeClass, typeClass, colorClass, transparentClass]">
    <slot />
  </div>
</template>

<script setup>

  import { computed } from 'vue';

  const props = defineProps({
    color: {
      type: String,
      default: 'default',
      validator: (prop) => ['default', 'indigo', 'sky', 'steel', 'success', 'warning', 'danger'].includes(prop),
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value)
      }
    },
    transparent: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'prefix',
      validator: (prop) => ['prefix', 'suffix', 'other'].includes(prop),
    },
  });

  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[props.size || 'md'];

  const typeClass = {
    prefix: 'border-r-0',
    suffix: 'border-l-0',
    other: '',
  }[props.type || 'prefix'];
  
  const transparentClass =  (props.transparent) ? 'bg-transparent' : ' bg-gray-50';

  const colorClass = computed(() => {
    return {
      default: 'border-gray-300 text-gray-500',
      indigo: 'border-indigo-light text-indigo-darkest',
      sky: 'border-sky-light text-sky-darkest',
      steel: 'border-steel-light text-steel-darkest',
      success: 'border-success-light text-success-darkest',
      warning: 'border-warning-light text-warning-darkest',
      danger: 'border-danger-light text-danger-darkest',
    }[props.color];
  });


</script>