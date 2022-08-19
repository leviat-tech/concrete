<template>
  <!-- <Tab class="w-full items-center justify-around p-4 hover:bg-gray-100">

  </Tab> -->

  <Tab v-slot="{ selected }" as="template">
    <button
      class="w-full items-center justify-around p-4 hover:bg-gray-100"
      :class="[selected ? 'bg-gray-50 font-bold z-[2]' : '']"
    >
      <slot />
    </button>
  </Tab>
</template>

<script setup>
import { Tab } from '@headlessui/vue';

const props = defineProps({});
</script>
