<template>
  <div class="flex w-full">
    <slot name="prefix" class="z-10"/>
    <input
      ref="inputRef"
      v-model="value"
      type="text"
      :class="['relative truncate z-20 w-full border text-left focus:outline-none focus:ring-1 focus:border-indigo-light focus:ring-indigo-light', sizeClass, colorClass, disabledClass, cursorClass, bgColor ]"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readOnly"
      
      @keydown.enter="$emit('enter')"
      @blur="$emit('blur')"
    >
    <slot name="suffix" class="z-10" />
  </div>
</template>

<script setup>
  
  import { computed, ref } from 'vue';

  const props = defineProps({
    modelValue: String,
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
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    transparent: { type: Boolean, default: false },
  });

  const emit = defineEmits(['update:modelValue', 'enter', 'blur']);

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  });

  const sizeClass = {
    xs: 'h-6 text-xs pl-3 pr-6 py-0.5',
    sm: 'h-8 text-sm pl-3 pr-8 py-1',
    md: 'h-10 text-base pl-3 pr-10 py-2',
    lg: 'h-12 text-lg pl-3 pr-12 py-2',
  }[props.size || 'md'];

  const cursorClass = (props.disabled) ? 'cursor-not-allowed' : 'cursor-text';
  
  const bgColor =  (props.transparent) ? 'bg-transparent' : 'bg-white';

  const colorClass = computed(() => {
    return {
      default: 'border-gray-300 text-black',
      indigo: 'border-indigo-light text-indigo-darkest',
      sky: 'border-sky-light text-sky-darkest',
      steel: 'border-steel-light text-steel-darkest',
      success: 'border-success-light text-success-darkest',
      warning: 'border-warning-light text-warning-darkest',
      danger: 'border-danger-light text-danger-darkest',
    }[props.color];
  });

  const disabledClass = computed(() => {
    return (props.disabled) && 'opacity-60';
  });

  const inputRef = ref(null);

  const focus = () => {
    inputRef.value.focus();
  }

  const blur = () => {
    inputRef.value.blur();
  }

  defineExpose({
    focus,
    blur,
  });

</script>