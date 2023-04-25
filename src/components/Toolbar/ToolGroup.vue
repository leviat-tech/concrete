<template>
  <div
    class="flex items-center concrete__tool-group"
    :class="[
      dividerLeft && 'border-l ml-2 pl-2',
      dividerRight && 'border-r mr-2 pr-2',
      verticalLayout && 'flex-col',
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  dividerLeft: Boolean,
  dividerRight: Boolean,
  verticalLayout: Boolean,
});
</script>
