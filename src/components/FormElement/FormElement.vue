<template>
  <div :class="{ 'flex flex-row justify-between w-full' : !stacked }">
    <div :class="[stackedClass, sizeClass, textSizeClass]" v-if="computedLabel">
      <span class="leading-5" :class="[lineClampClass]">
        {{ computedLabel }}
      </span>
    </div>
    <div class="w-full">
      <slot></slot>
      <div :class="['text-xs', messageClass]" v-if="message">{{message}}</div>
    </div>
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

    label: String,
    labelFormatter: Function,
    message: String,
    stacked: {
      type: Boolean,
      default: false,
    },
  });

  const computedLabel = computed(() => {
    if (props.label != null && props.label !== '') {
      return (typeof props.labelFormatter === 'function') ? props.labelFormatter(props.label) : props.label;
    }
    return null;
  });

  const sizeCheck = (props.stacked) ? 'stacked' : props.size;
  const lineClampClass = computed(() => {
    return {
      xs: 'line-clamp-1',
      sm: 'line-clamp-2',
      md: 'line-clamp-2',
      lg: 'line-clamp-2',
      stacked: 'py-0.5 align-baseline'
    }[sizeCheck];
  });

  const sizeClass = computed(() => {
    return {
      xs: 'h-6',
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
      stacked: ''
    }[sizeCheck];
  });

  const textSizeClass = computed(() => {
    return {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }[props.size];
  });

  const messageClass = computed(() => {
    return {
      default: 'text-gray-400',
      indigo: 'text-indigo',
      sky: 'text-sky',
      steel: 'text-steel',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    }[props.color];
  });

  const stackedClass = props.stacked ? 'mb-1 truncate' : 'basis-1/2 flex flex-col justify-center pr-8';


</script>