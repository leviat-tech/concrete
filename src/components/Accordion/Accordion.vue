<template>
  <Disclosure
    as="div"
    v-slot="{ open }"
    class="concrete__accordion relative"
    :class="textClass"
    :defaultOpen="isOpen"
  >
    <DisclosureButton class="w-full text-left" @click="onClick()">
      <div v-if="title" class="flex items-center font-bold">
        <TriangleIcon
          :class="[
            iconClass,
            transitionClass,
            open ? 'rotate-180' : 'rotate-90',
          ]"
          class="flex-none mr-2"
        />
        <slot name="customTitle" v-if="$slots.customTitle" />
        <span v-else :class="titleClass">{{ title }}</span>
      </div>

      <slot v-else name="title" :open="open" />
    </DisclosureButton>

    <DisclosurePanel static>
      <div
        class="relative overflow-y-auto"
        :class="transition && transitionClass"
        :style="styles"
      >
        <div ref="content">
          <slot :open="open" />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

import { ref, inject, reactive } from 'vue';
import TriangleIcon from '../Icon/icons/TriangleIcon.vue';
import { useSizeProp } from '../../composables/props.js';
import { useSizeValue } from '../../composables/forms.js';
import { textSizeClassMap } from '../../composables/styles.js';

const { accordionState } = inject('concrete', {});

const props = defineProps({
  defaultOpen: { type: Boolean, default: false },
  transition: Boolean,
  size: useSizeProp('lg'),
  title: String,
  titleClass: String,
  accordionId: { type: String, required: false },
});

let isOpen = accordionState[props.accordionId] ?? props.defaultOpen;

const emit = defineEmits(['opened', 'closed']);

const initialHeight = isOpen ? 'auto' : 0;
const initialOverflow = isOpen ? 'visible' : 'hidden';
const height = ref(initialHeight);
const styles = reactive({
  height: initialHeight,
  overflow: initialOverflow,
});
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
}[size];

const onClick = () => {
  isOpen = !isOpen;
  if (props.accordionId) accordionState[props.accordionId] = isOpen;

  const contentHeight = content.value.getBoundingClientRect().height;
  height.value = isOpen ? `${contentHeight}px` : '0';

  if (isOpen) {
    styles.height = height.value;
    setTimeout(
      () => ((styles.overflow = 'visible'), (styles.height = 'auto')),
      TRANSITION_TIME
    );
    emit('opened');
  } else {
    styles.overflow = 'hidden';
    styles.height = '0';
    emit('closed');
  }
};
</script>
