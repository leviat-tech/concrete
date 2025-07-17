<template>
  <div
    class="concrete__form-element"
    :class="{ 'flex flex-row justify-between w-full items-center': !stacked }"
  >
    <div
      :class="[
        stackedClass,
        sizeClass,
        textSizeClass,
        labelOrderClass,
        inputColorClass,
        disabledClass,
      ]"
      v-if="label || props.tooltip"
    >
      <div
        class="flex"
        :class="[
          {
            'justify-between': stacked,
            'text-right': !stacked,
            'flex-row-reverse': !stacked && props.tooltip,
          },
          labelWidthClass,
        ]"
      >
        <label
          class="leading-5 w-full"
          :class="[lineClampClass, labelClass]"
          :for="id"
          @mousedown="props.onMouseDown?.()"
          v-html="label"
        />
        <CTooltipIcon
          v-if="props.tooltip"
          :class="{ 'pr-2': !stacked }"
          :size="size"
          v-tooltip="props.tooltip"
        />
      </div>
    </div>
    <div :class="{ 'w-full': expandInput }">
      <div v-if="hasMultipleInputs" class="flex space-x-2">
        <slot></slot>
      </div>
      <slot v-else></slot>
      <div :class="['text-xs', messageClass]" v-if="status.message">
        {{ status.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';

import FormElementProps from 'types/FormElementProps';
import { useConcreteForms } from '../../composables/forms';
import { useInputClasses } from '../../composables/styles';

interface Props extends FormElementProps {
  labelOrder: number;
  labelWidth: string;
  labelClass: string;
  expandInput: boolean;
  onMouseDown: () => void;
  hasMultipleInputs: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  expandInput: true,
  hasMultipleInputs: false,
});

const { getFormLabel, getSizeValue, getStackedValue, getInputStatus, getLabelWidthValue } =
  useConcreteForms();

const LABEL_ORDER_CLASSES = {
  [0]: 'order-0 !basis-auto',
  [1]: 'order-1 !basis-auto',
};

const { textSizeClass, heightClass, disabledClass, inputColorClass } = useInputClasses(props);

const label = getFormLabel(props);
const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
const status = getInputStatus(props);
const labelWidth = getLabelWidthValue(props.labelWidth);

provide('form-section', { stacked, size });
provide('form-element', { size, color: props.color });

const sizeCheck = stacked ? 'stacked' : size;
const lineClampClass = {
  xs: 'line-clamp-1',
  sm: 'line-clamp-2',
  md: 'line-clamp-2',
  lg: 'line-clamp-2',
  stacked: 'py-0.5 align-baseline',
}[sizeCheck];

const widthCheck = stacked ? 'stacked' : labelWidth;
const labelWidthClass = {
  xxs: 'w-8',
  xs: 'w-16',
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-40',
  xl: 'w-48',
  stacked: 'w-full',
}[widthCheck];

const sizeClass = stacked ? '' : heightClass;

const messageClass = computed(() => {
  return {
    default: 'text-base-600',
    base: 'text-base-600',
    info: 'text-base-600',
    magic: 'text-base-600',
    success: 'text-status-success',
    warning: 'text-status-warning',
    danger: 'text-status-danger',
  }[status.value.color || 'default'];
});

const stackedClass = computed(() => {
  if (stacked) {
    return 'mb-1 truncate flex justify-between';
  }
  return 'flex flex-col justify-center pr-4';
});

const labelOrderClass = computed(() => {
  return props.labelOrder ? LABEL_ORDER_CLASSES[props.labelOrder] : '';
});
</script>
