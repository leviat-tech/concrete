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
let leftIsPrimary;
let dragging = false;

const leftPane = computed(() => panes.value[0]);
const rightPane = computed(() => panes.value[1]);

const resizeObserver = new ResizeObserver((entries) => {
  handleResize();
});

const splitterClass = computed(() => {
  return {
    thin: 'w-1 bg-steel',
    thick: 'seperator-img w-3 bg-steel',
    default: 'w-2 bg-transparent hover:bg-steel-dark hover:opacity-40',
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
  window.dispatchEvent(new Event('resize'));
};

const drag = (e) => {
  if (dragging) {
    currDrag = getCurrentMouseDrag(e).x;
    splitter.value.style.left = `${currDrag - splitterWidth.value}px`;
  }
};

const getCurrentMouseDrag = (e) => {
  const { clientX } = 'ontouchstart' in window && e.touches ? e.touches[0] : e;
  return {
    x: clientX - containerClientRect.value.left,
  };
};

const containerClientRect = computed(() =>
  containerRef.value.getBoundingClientRect()
);

const registerPane = (pane) => {
  panes.value.push(pane);
};

const handleResize = () => {
  setPaneWidths();

  splitter.value.style.left = `${
    leftPane.value.el.getBoundingClientRect().width - splitterWidth.value
  }px`;
};

const setPaneWidths = () => {
  const containerWidth = containerClientRect.value.width;

  if (leftIsPrimary) {
    leftPane.value.el.style.flexGrow = '';
    rightPane.value.el.style.flexGrow = '1';
    leftPane.value.el.style.flexBasis =
      currDrag > leftMinWidth ? `${currDrag}px` : `${leftMinWidth}px`;
  } else {
    leftPane.value.el.style.flexGrow = '1';
    rightPane.value.el.style.flexGrow = '';
    rightPane.value.el.style.flexBasis =
      currDrag > containerWidth - rightMinWidth
        ? `${currDrag}px`
        : `${rightMinWidth}px`;
  }
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

  if (leftIsPrimary) {
    rightMinWidth = rightPane.value.min || containerWidth / 2;

    if (leftPane.value.usePercent) {
      //percent
      leftMinWidth =
        leftPane.value.min > 90
          ? containerWidth * 0.9
          : containerWidth * (leftPane.value.min / 100);
    } else {
      //pixels
      leftMinWidth = leftPane.value.min || containerWidth / 2;
    }
  } else {
    leftMinWidth = leftPane.value.min || containerWidth / 2;
    if (rightPane.value.usePercent) {
      //percent
      rightMinWidth =
        rightPane.value.min > 90
          ? containerWidth * 0.9
          : containerWidth * (rightPane.value.min / 100);
    } else {
      //pixels
      rightMinWidth = rightPane.value.min || containerWidth / 2;
    }
  }
};

onMounted(() => {
  const unitsRegex = /px|%/;

  panes.value.forEach((pane, index) => {
    pane.usePercent = pane.min?.includes('%');

    pane.min = +pane.min?.replace(unitsRegex, '');

    if (!primaryPaneIndex && pane.primary) primaryPaneIndex = index;
    leftIsPrimary = primaryPaneIndex === 0;

    resizeObserver.observe(pane.el);
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
