<template>
  <div class="w-full concrete__form-section space-y-4">
    <slot name="title">
      <CHeading
        v-if="title"
        :title="title"
        :color="color"
        :underline="underline"
        :size="headingSize"
      >
        <slot name="toolbar"></slot>
      </CHeading>
    </slot>

    <CStack :class="innerClass">
      <slot />
    </CStack>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { useConcreteForms } from '../../composables/forms';
import CHeading from '../Heading/Heading.vue';
import CStack from '../Stack/Stack.vue';
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

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);

provide('form-section', { stacked, size });
</script>
