<template>
  <TabGroup as="div" class="h-full flex flex-col"
            :selectedIndex="modelValue"
            :defaultIndex="defaultIndex"
            @change="onChange">

    <CTabList v-if="tabPosition === 'top'" :labels="labels">
      <!-- CTabLabel must be used in the template labels slot -->
      <slot name="labels" />
    </CTabList>

    <TabPanels class="flex flex-col flex grow">
      <!-- CTabPanel must be used in the default slot -->
      <slot />
    </TabPanels>

    <CTabList v-if="tabPosition === 'bottom'" :labels="labels" class="border-t">
      <!-- CTabLabel must be used in the template labels slot -->
      <slot name="labels" />
    </CTabList>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabPanels } from '@headlessui/vue';
import CTabList from './CTabList.vue';
import { ref } from 'vue';

const props = defineProps({
  labels: { type: Array },
  tabPosition: {
    default: 'top',
    validator(value) {
      // The value must match one of these strings
      return ['top', 'bottom'].includes(value);
    },
  },
  defaultIndex: { type: Number, default: 0 },
  modelValue: { type: Number }
});

const emit = defineEmits(['update:modelValue'])

const isVModelActive = props.modelValue !== undefined;

const selectedIndex = (isVModelActive) ? props.modelValue : ref(props.defaultIndex);

function onChange(index) {
  if (isVModelActive) {
    emit('update:modelValue', index);
  } else {
    selectedIndex.value = index;
  }
}

</script>
