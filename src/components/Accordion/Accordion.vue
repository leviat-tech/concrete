<template>
<Disclosure as="div" v-slot="{ open }">
  <DisclosureButton class="w-full p-4 bg-gray-50 hover:bg-gray-100" @click="onClick(!open)">
    <div class="flex items-center justify-between">

      <template v-if="title">{{ title }}</template>

      <slot name="header"/>

      <ChevronUpIcon
          :class="[open && 'rotate-180 transform']"
          class="flex-none h-5 w-5 ml-2 transition-all"
      />
    </div>
  </DisclosureButton>

  <DisclosurePanel static>
    <div class="overflow-hidden transition-all duration-200" :style="{ height }">
      <div ref="content" class="p-4">
        <slot/>
      </div>
    </div>
  </DisclosurePanel>
</Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';

const props = defineProps({
  defaultOpen: { type: Boolean, default: false },
  title: String
});

const initialHeight = props.defaultOpen ? 'auto' : 0;
const height = ref(initialHeight);
const content = ref(null);
const TRANSITION_TIME = 300;

const onClick = (open) => {
  const contentHeight = content.value.getBoundingClientRect().height;
  height.value = contentHeight + 'px';

  if (open) {
    setTimeout(() => height.value = 'auto', TRANSITION_TIME);
  } else {
    setTimeout(() => height.value = '0');
  }
}
</script>
