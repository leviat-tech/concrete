<template>
  <div class="w-full concrete__form-section">
    <slot name="title">
      <div
        class="flex justify-between w-full mb-2"
        :class="[underlineClass, inputColorClass, textSizeClass]"
      >
        <h4 v-if="title" class="text-base text-sky-dark font-bold">
          {{ title }}
        </h4>
        <slot name="toolbar"></slot>
      </div>
    </slot>

    <div class="w-full" :class="innerClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { useConcreteForms } from '../../composables/forms';
import { useInputClasses } from '../../composables/styles';
import FormElementProps from '../../types/FormElementProps';

interface Props extends FormElementProps {
  title?: string;
  underline?: boolean;
  innerClass?: string;
  headingSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  headingSize: 1,
  underline: false,
});

const { getSizeValue, getStackedValue } = useConcreteForms();
const { inputColorClass, textSizeClass } = useInputClasses(props);

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
provide('form-section', { stacked, size });

const underlineClass = props.underline ? 'border-b' : '';
</script>
