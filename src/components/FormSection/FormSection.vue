<template>
  <div class="w-full">

    <slot name="title">
      <div class="flex justify-between w-full" :class="[underlineClass, colorClass, sizeClass]" >
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

  import { computed } from 'vue';
  import { colorProp, useSizeProp } from '../../composables/props';
  import { useSizeValue } from '../../composables/styles';
  

  const props = defineProps({
    color: colorProp,
    size: useSizeProp(),
    title: { type: String, default: '' },
    underline: { type: Boolean, default: false },
  });
  
  const size = useSizeValue(props.size);
  const sizeClass = {
    xs: 'h-6 text-xs py-0.5',
    sm: 'h-8 text-sm py-1',
    md: 'h-10 text-base py-2',
    lg: 'h-12 text-lg py-2',
  }[size];

  const colorClass = {
    default: 'border-gray-300 text-black',
    indigo: 'border-indigo-light text-indigo-darkest',
    sky: 'border-sky-light text-sky-darkest',
    steel: 'border-steel-light text-steel-darkest',
    success: 'border-success-light text-success-darkest',
    warning: 'border-warning-light text-warning-darkest',
    danger: 'border-danger-light text-danger-darkest',
  }[props.color];
  
  const underlineClass = (props.underline) ? 'border-b' : '';

</script>