<template>
  <Tab
    class="w-full items-center justify-around p-4 hover:bg-gray-100 border-r"
  >
    <slot />
  </Tab>
</template>

<script setup>
import { Tab } from '@headlessui/vue';

const props = defineProps({});
</script>
