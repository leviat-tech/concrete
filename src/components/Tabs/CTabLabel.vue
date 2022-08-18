<template>
  <Tab class="w-full items-center justify-around p-4 hover:bg-gray-100">
    <slot />
  </Tab>
</template>

<script setup>
import { Tab } from '@headlessui/vue';

const props = defineProps({});
</script>
<style lang="scss" scoped>
// Styling active tab
button[aria-selected='true'] {
  @apply bg-gray-50 font-bold z-[2];
}
</style>
