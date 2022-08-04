<template>
  <div class="" ref="paneRef">
    <slot />
  </div>
</template>

<script setup>
  import { computed, inject, ref, provide, useSlots, onMounted } from 'vue';
  

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
  })

</script>
