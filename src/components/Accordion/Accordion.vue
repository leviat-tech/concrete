<template>
  <Disclosure
    as="div"
    v-slot="{ open }"
    class="concrete__accordion"
    :class="textClass"
    :defaultOpen="defaultOpen"
  >
    <DisclosureButton class="w-full text-left" @click="onClick(!open)">
      <div v-if="title" class="flex items-center font-bold">
        <TriangleIcon :class="[iconClass, transitionClass, open ? 'rotate-180' : 'rotate-90']" class="flex-none mr-2"/>
        <span>{{ title }}</span>
      </div>

      <slot v-else name="title" :open="open" />
    </DisclosureButton>

    <DisclosurePanel static>
      <div class="overflow-hidden" :class="transition && transitionClass" :style="{ height }">
        <div ref="content">
          <slot :open="open" />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import TriangleIcon from '../Icon/icons/TriangleIcon.vue';
import { useSizeProp } from '../../composables/props.js';
import { useSizeValue } from '../../composables/forms.js';
import { textSizeClassMap } from '../../composables/styles.js';

const props = defineProps({
  defaultOpen: { type: Boolean, default: false },
  transition: Boolean,
  size: useSizeProp('lg'),
  title: String,
});

const initialHeight = props.defaultOpen ? 'auto' : 0;
const height = ref(initialHeight);
const content = ref(null);
const TRANSITION_TIME = props.transition ? 400 : 0;

const size = useSizeValue(props.size);

const textClass = textSizeClassMap[size];
const transitionClass = props.transition ? 'transition-all' : '';

const iconClass = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
}[size]

const onClick = (open) => {
  const contentHeight = content.value.getBoundingClientRect().height;
  height.value = contentHeight + 'px';

  if (open) {
    setTimeout(() => (height.value = 'auto'), TRANSITION_TIME);
  } else {
    setTimeout(() => (height.value = '0'));
  }
};
</script>
