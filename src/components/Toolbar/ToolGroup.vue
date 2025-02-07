<template>
  <div
    class="flex items-center concrete__tool-group space-x-2"
    :class="[
      dividerLeft && 'border-l border-base-600 ml-2 pl-2',
      dividerRight && 'border-r border-base-600 mr-2 pr-2',
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
