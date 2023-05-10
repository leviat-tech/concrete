<template>
  <div class="concrete__pane flex-1" ref="paneRef">
    <slot />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';

const props = defineProps({
  min: { type: Number, default: null },
});

const paneRef = ref(null);
const resizablePane = inject('resizable-pane');

onMounted(() => {
  resizablePane.registerPane({
    el: paneRef.value,
    min: props.min,
  });
});
</script>
