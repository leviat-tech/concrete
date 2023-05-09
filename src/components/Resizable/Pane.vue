<template>
  <div class="concrete__pane" ref="paneRef">
    <slot />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';

const props = defineProps({
  min: { type: Number, default: null },
  primary: { type: Boolean, default: false },
});

const paneRef = ref(null);
const resizablePane = inject('resizable-pane');

onMounted(() => {
  resizablePane.registerPane({
    el: paneRef.value,
    min: props.min,
    primary: props.primary,
  });
});
</script>
