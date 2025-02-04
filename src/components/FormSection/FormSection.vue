<template>
  <div class="w-full concrete__form-section space-y-4">
    <slot name="title">
      <CHeading v-if="title" :title="title" :color="color" :underline="underline" :size="headingSize">
        <slot name="toolbar"></slot>
      </CHeading>
    </slot>

    
    <CStack :class="innerClass">
      <slot />
    </CStack>
  </div>
</template>


<script setup>
import { provide } from 'vue';
import { colorProp, useSizeProp } from '../../composables/props';
import { useConcreteForms } from '../../composables/forms';
import CHeading from '../Heading/Heading.vue';
import CStack from '../Stack/Stack.vue';

const props = defineProps({
  color: colorProp,
  size: useSizeProp(),
  labelFormatter: Function,
  title: { type: String, default: '' },
  underline: { type: Boolean, default: false },
  stacked: { type: Boolean },
  innerClass: String,
  headingSize: {type: Number, default: 1 },
});

const { getSizeValue, getStackedValue } = useConcreteForms();

const size = getSizeValue(props.size);
const stacked = getStackedValue(props.stacked);
provide('form-section', { stacked, size });

</script>
