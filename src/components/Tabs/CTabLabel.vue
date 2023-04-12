<template>
  <Tab v-slot="{ selected }" as="template">
    <button
      class="w-full items-center justify-around p-4 bg-gray-100 hover:bg-gray-50 border-b text-default-light"
      :class="{ 'bg-white font-bold z-[2] border-b-0': selected }"
    >
      <slot />
    </button>
  </Tab>
</template>

<script setup>
import { Tab } from '@headlessui/vue';

const props = defineProps({});
</script>
