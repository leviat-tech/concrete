<template>
  <div class="concrete__pane" ref="paneRef">
    <slot />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';


const props = defineProps({
  max: { type: Number, default: null },
  min: { type: Number, default: null },
});

const paneRef = ref(null);
const resizablePane = inject('resizable-pane');

onMounted(() => {
  resizablePane.registerPane({
    el: paneRef.value,
    min: props.min,
    max: props.max,
  });
});
</script>
