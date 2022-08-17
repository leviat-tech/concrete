<template>
  <div class="w-full concrete__form-section">

    <slot name="title">
      <div class="flex justify-between w-full" :class="[underlineClass, inputColorClass, mergedSizeClass]" >
          <h2 v-if="title" class="font-bold">{{ title }}</h2>
        <slot name="toolbar"></slot>
      </div>
    </slot>

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup>

import { provide } from 'vue';
import { colorProp, useSizeProp } from '../../composables/props';
import { useSizeValue, useStackedValue } from '../../composables/forms';
import { useInputClasses, useInputColorClassValue } from '../../composables/styles';


const props = defineProps({
  color: colorProp,
  size: useSizeProp(),
  title: { type: String, default: '' },
  underline: { type: Boolean, default: false },
  stacked: { type: Boolean },
});

const {
  inputColorClass,
  mergedSizeClass
} = useInputClasses(props);

const size = useSizeValue(props.size);
const stacked = useStackedValue(props.stacked);
provide('form-section',  { stacked, size });

const underlineClass = (props.underline) ? 'border-b' : '';

</script>