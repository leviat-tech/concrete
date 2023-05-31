<template>
  <div>
    <CIcon :size="props.size" type="information-circle" color="default" class="bg-indigo-dark text-indigo-lightest rounded-full cursor-pointer" />
  </div>
</template>


<script setup>
import { useSizeProp } from '../../composables/props.js';

const props = defineProps({
  size: useSizeProp(),
});
</script>