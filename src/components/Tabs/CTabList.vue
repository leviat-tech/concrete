<template>
  <TabList class="w-full flex divide-x">
    <template v-if="labels">
      <CTabLabel v-for="label in labels">
        {{ label }}
      </CTabLabel>
    </template>
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
