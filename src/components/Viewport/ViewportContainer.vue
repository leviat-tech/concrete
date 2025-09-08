<template>
  <div
    ref="viewportContainer"
    class="
      concrete__viewport-container
      w-full
      h-full
      flex
      items-center
      justify-center
      overflow-hidden
    "
    :class="{ 'grid bg-base-200': !fullWidth }"
    :style="{ 'grid-template-columns': colStyle }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, provide } from 'vue';

interface ReactiveState {
  maximized: string | number | null;
}

interface Props {
  options: unknown[];
  modelValue: string | number | null;
  forceFullWidth?: boolean;
  columns?: number | null;
  aspectRatio?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
});

const emit =
  defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void;
    (e: 'resize'): void;
  }>();

const viewportContainer = ref<HTMLElement | null>(null);
const reactive = ref<ReactiveState>({ maximized: props.modelValue });
const cols = ref<number>(1);
const observer = ref<ResizeObserver | null>(null);

const fullWidth = computed(() => {
  return props.forceFullWidth || reactive.value.maximized !== null || props.options.length < 2;
});

const colStyle = computed(() => {
  return `repeat(${cols.value}, minmax(0, 1fr))`;
});

watch(
  () => props.modelValue,
  (nv) => {
    reactive.value.maximized = nv;
  }
);

watch(
  () => props.columns,
  () => {
    setCols();
  },
  { immediate: true }
);

function minimize() {
  reactive.value.maximized = null;
  emit('update:modelValue', reactive.value.maximized);
}

function maximize(id: string | number) {
  reactive.value.maximized = id;
  emit('update:modelValue', reactive.value.maximized);
}

function columnsCalc(ar: number, aspectRatio: number, options: number): number {
  let low: number, high: number;

  if (aspectRatio > ar) {
    const cell = Math.floor(aspectRatio / ar);
    const units = Math.ceil(options / cell);
    const cols = units ** (1 / cell);
    low = Math.floor(cols);
    high = Math.ceil(cols);
  } else {
    const cell = Math.floor(ar / aspectRatio);
    const units = Math.ceil(options / cell);
    const rows = units ** (1 / cell);
    const cols = Math.ceil(options / rows);
    low = Math.floor(cols);
    high = Math.ceil(cols);
  }

  if (low === high) return Math.max(low, 1);

  const lowRows = options / low;
  const lowAr = lowRows / low;
  const highRows = options / high;
  const highAr = highRows / high;

  return Math.abs(aspectRatio - lowAr) < Math.abs(aspectRatio - highAr)
    ? Math.max(low, 1)
    : Math.max(high, 1);
}

function setCols() {
  if (props.columns !== null && props.columns !== undefined) {
    cols.value = props.columns;
  } else {
    const width = viewportContainer.value?.clientWidth || 1;
    const height = viewportContainer.value?.clientHeight || 1;
    const ar = width / height;
    cols.value = columnsCalc(ar, props.aspectRatio ?? 1, props.options.length);
  }
  emit('resize');
}

onMounted(() => {
  observer.value = new ResizeObserver(setCols);
  if (viewportContainer.value) {
    observer.value.observe(viewportContainer.value);
  }
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
});

provide('minimize', minimize);
provide('maximize', maximize);
provide('containerOptions', props.options);
provide('viewportContainer', reactive.value);
</script>

<style scoped>
.concrete__viewport-container {
  gap: 1px;
}
</style>
