<template>
  <div class="flex flex-row justify-between">
    <div :class="['basis-1/2 flex flex-col justify-center pr-8',sizeClass]" v-if="computedLabel">
      <span :class="['leading-none py-0.5', lineClampClass]">
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
  });

  const computedLabel = computed(() => {
    if (props.label != null && props.label !== '') {
      return (typeof props.labelFormatter === 'function') ? props.labelFormatter(props.label) : props.label;
    }
    return null;
  });

  const lineClampClass = computed(() => {
    return {
      xs: 'line-clamp-1',
      sm: 'line-clamp-2',
      md: 'line-clamp-2',
      lg: 'line-clamp-2',
    }[props.size];
  });

  const sizeClass = computed(() => {
    return {
      xs: 'text-xs h-6',
      sm: 'text-sm h-8',
      md: 'text-base h-10',
      lg: 'text-lg h-12',
    }[props.size];
  });

  const messageClass = computed(() => {
    return {
      default: 'text-gray-300',
      indigo: 'text-indigo',
      sky: 'text-sky',
      steel: 'text-steel',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    }[props.color];
  });


</script>