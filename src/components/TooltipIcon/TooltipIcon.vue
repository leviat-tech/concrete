<template>
  <div>
    <CIcon :size="props.size" type="information-circle" color="default" class=" text-info-700 cursor-pointer" :class="size" />
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useSizeProp } from '../../composables/props.js';

const props = defineProps({
  size: useSizeProp(),
});

const size = computed(() => (['xs', 'sm'].includes(props.size)) ? 'h-5 w-5' : 'h-6 w-6');


</script>