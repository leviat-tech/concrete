<template>
  <div class="flex items-center"
       :class="[
           dividerLeft && 'border-l ml-2 pl-2',
           dividerRight && 'border-r mr-2 pr-2',
       ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  dividerLeft: Boolean,
  dividerRight: Boolean,
})
</script>