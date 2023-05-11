<template>
  <div
    ref="containerRef"
    class="concrete__resizable relative overflow-hidden"
    draggable="false"
    @mousemove="drag"
    @mouseup="endDrag"
    :class="{ 'cursor-col-resize': dragging }"
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

const splitter = ref(null);
const panes = ref([]);
const containerRef = ref(null);
let leftMinWidth;
let rightMinWidth;
let currDrag;
let primaryPaneIndex;
let leftIsPrimary = true;
let dragging = false;

const leftPane = computed(() => panes.value[0]);
const rightPane = computed(() => panes.value[1]);

const resizeObserver = new ResizeObserver((entries) => {
  handleResize();
});

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
  handleResize();
};

const drag = (e) => {
  if (dragging) {
    currDrag = getCurrentMouseDrag(e).x;
    splitter.value.style.left = `${currDrag - splitterWidth.value}px`;
  }
};

const handleResize = () => {
  if (currDrag) {
    if (currDrag < leftMinWidth) {
      setLeftPrimary();
      leftPane.value.el.style.width = `${leftMinWidth}px`;
    } else {
      setLeftPrimary();
      leftPane.value.el.style.width = `${currDrag}px`;
    }

    const rightOffset = containerClientRect.value.width - rightMinWidth;
    if (currDrag > rightOffset) {
      setRightPrimary();
      rightPane.value.el.style.width = `${rightMinWidth}px`;
    } else {
      setLeftPrimary();
    }
  }

  splitter.value.style.left = `${
    leftPane.value.el.getBoundingClientRect().width - splitterWidth.value
  }px`;
};

const containerClientRect = computed(() =>
  containerRef.value.getBoundingClientRect()
);

const getCurrentMouseDrag = (e) => {
  const { clientX } = 'ontouchstart' in window && e.touches ? e.touches[0] : e;
  return {
    x: clientX - containerClientRect.value.left,
  };
};

const registerPane = (pane) => {
  panes.value.push(pane);
};

const setLeftPrimary = () => {
  rightPane.value.el.style = '';
  rightPane.value.el.classList.add('flex-1');
  leftPane.value.el.classList.remove('flex-1');
};

const setRightPrimary = () => {
  leftPane.value.el.style = '';
  leftPane.value.el.classList.add('flex-1');
  rightPane.value.el.classList.remove('flex-1');
};

const initialSetup = () => {
  if (primaryPaneIndex !== 0) leftIsPrimary = false;
  validateMinProps();
  splitter.value.style.left = `${
    leftPane.value.el.getBoundingClientRect().width - splitterWidth.value
  }px`;
};

const validateMinProps = () => {
  const containerWidth = containerClientRect.value.width;

  //calculate pixels from percentages
  if (panes.value[0].min + panes.value[1].min > 100) {
    leftMinWidth = containerWidth / 2;
    rightMinWidth = containerWidth / 2;
    console.warn(
      'prop "min" values provided breach 100%. Both now set to 50%.'
    );
  } else {
    const leftMin = panes.value[0].min || 50;
    const rightMin = panes.value[1].min || 10;
    leftMinWidth = containerWidth * (leftMin / 100);
    rightMinWidth = containerWidth * (rightMin / 100);
  }
};

onMounted(() => {
  panes.value
    .map((p) => p.el)
    .forEach((p, index) => {
      if (!primaryPaneIndex && p.primary) primaryPaneIndex = index;
      resizeObserver.observe(p);
    });

  validateMinProps();
  initialSetup();
  handleResize();

  window.addEventListener('resize', (e) => {
    initialSetup();
    handleResize();
  });
});

provide('resizable-pane', {
  registerPane,
});
</script>
