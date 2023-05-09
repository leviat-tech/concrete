<template>
  <!-- <div ref="containerRef" draggable="false" class="concrete__resizable relative" :class="{ 'cursor-col-resize' : dragging }" >  -->
  <div
    ref="containerRef"
    class="concrete__resizable relative"
    @mousemove="drag"
    @mouseup="endDrag"
  >
    <slot />
    <div
      class="separator absolute"
      :class="splitterClass"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="endDrag"
      @touchstart="startDrag"
      @touchmove="drag"
      @touchend="endDrag"
      ref="splitter"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.separator {
  /* Prevent the browser's built-in drag from interfering */
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: col-resize;
  z-index: 69;
  height: 100%;
}

.seperator-img {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='30'><path d='M2 0 v30 M5 0 v30 M8 0 v30' fill='none' stroke='black'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<script setup>
import { computed, ref, provide, onMounted } from 'vue';

const props = defineProps({
  splitter: {
    type: String,
    default: 'default',
    validator: (prop) => ['default', 'thick', 'thin'].includes(prop),
  },
});

const emit = defineEmits(['resize']);

const splitter = ref(null);
const panes = ref([]);
const containerRef = ref(null);
let primaryPaneIndex;
let secondaryPaneIndex;
let currDrag;
let dragging = false;

const leftPane = computed(() => panes.value[0]);
const rightPane = computed(() => panes.value[1]);

const splitterClass = computed(() => {
  return {
    thin: 'w-1 bg-gray-300',
    thick: 'seperator-img w-3 bg-gray-300',
    default: 'w-3 bg-transparent hover:bg-gray-300 hover:opacity-40',
  }[props.splitter];
});

const splitterWidth = computed(() => {
  return {
    thin: 2,
    thick: 6,
    default: 6,
  }[props.splitter];
});

const startDrag = () => {
  dragging = true;
};

const endDrag = () => {
  dragging = false;
  if (primaryPaneIndex === 0) {
    leftPane.value.el.style.width = `${currDrag}px`;
  } else {
    rightPane.value.el.style.width = `${
      containerClientRect.value.width - currDrag
    }px`;
  }
};

const drag = (e) => {
  if (dragging) {
    currDrag = getCurrentMouseDrag(e).x;

    if (primaryPaneIndex === 0) {
      splitter.value.style.left =
        currDrag < getPrimaryPaneWidth.value
          ? getPrimaryPaneWidth.value
          : `${currDrag}px`;
      return;
    }

    splitter.value.style.right =
      currDrag > containerClientRect.value.width - getPrimaryPaneWidth.value
        ? getPrimaryPaneWidth.value
        : `${currDrag}px`;
  }
};

onMounted(() => {
  if (!panes.value[0].min && panes.value[1].min) {
    rightPane.value.el.classList.add('flex-1');
    leftPane.value.el.classList.add('flex-1');
  }

  primaryPaneIndex = panes.value.findIndex((p) => p.primary) ?? 0;
  secondaryPaneIndex = panes.value.findIndex((p) => !p.primary) ?? 1;

  if (primaryPaneIndex < 0) primaryPaneIndex = 0; //handle no primary set
  if (secondaryPaneIndex < 0) primaryPaneIndex = 1;

  if (panes.value[primaryPaneIndex].min)
    panes.value[primaryPaneIndex].el.style.minWidth = getPrimaryPaneWidth.value;

  if (primaryPaneIndex === 0) {
    leftPane.value.el.classList.remove('flex-1');
    splitter.value.style.left = `${splitterElementLeftPosition.value}px`;
    return;
  }

  rightPane.value.el.classList.remove('flex-1');
  splitter.value.style.left = `${splitterElementLeftPosition.value}px`;
});

const splitterElementLeftPosition = computed(
  () => leftPane.value.el.getBoundingClientRect().width - splitterWidth.value
);

const getCurrentMouseDrag = (e) => {
  const { clientX } = 'ontouchstart' in window && e.touches ? e.touches[0] : e;
  return {
    x: clientX - containerClientRect.value.left,
  };
};

const containerClientRect = computed(() =>
  containerRef.value.getBoundingClientRect()
);

const getPrimaryPaneWidth = computed(
  () =>
    `${
      panes.value[primaryPaneIndex].min ?? containerClientRect.value.width / 2
    }px`
);

const registerPane = (pane) => {
  panes.value.push(pane);
};

provide('resizable-pane', {
  registerPane,
});
</script>
