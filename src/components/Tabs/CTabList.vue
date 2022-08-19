<template>
  <TabList class="w-full flex divide-x">
    <CTabLabel v-for="label in labels">
      {{ label }}
    </CTabLabel>
    <!-- CTabLabel must be used in the template labels slot -->
    <slot />
  </TabList>
</template>

<script setup>
import { TabList } from '@headlessui/vue';
import CTabLabel from './CTabLabel.vue';

const props = defineProps({
  labels: Array,
});
</script>
