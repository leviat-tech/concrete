<template>
  <div ref="viewportContainer" class="
      concrete__viewport-container
      w-full
      h-full
      flex
      items-center
      justify-center
      overflow-hidden
    " :class="{ 'grid bg-base-200': !fullWidth }" :style="{ 'grid-template-columns': colStyle }">
    <slot />
  </div>
</template>

<style scoped>
.concrete__viewport-container {
  gap: 1px;
}
</style>

<script>
function columns(ar, aspectRatio, options) {
  let low;
  let high;
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

  // Ideal number of columns is between two potential options--which
  // is nearest to the desired aspect ratio?
  const lowRows = options / low;
  const lowAr = lowRows / low;
  const highRows = options / high;
  const highAr = highRows / high;

  if (Math.abs(aspectRatio - lowAr) < Math.abs(aspectRatio - highAr)) {
    return Math.max(low, 1);
  }
  return Math.max(high, 1);
}

export default {
  name: 'CViewportContainer',
  props: {
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    forceFullWidth: { type: Boolean },
    columns: { type: Number, default: null },

    // A target aspect ratio for each viewport;
    // Used to determine how to tile multiple viewports.
    aspectRatio: { type: Number, default: 1 },
  },
  data() {
    return {
      reactive: {
        maximized: this.value,
      },
      cols: 1,
      observer: null,
    };
  },
  computed: {
    fullWidth() {
      return (
        this.forceFullWidth ||
        this.reactive.maximized ||
        this.options.length < 2
      );
    },
    colStyle() {
      return `repeat(${this.cols}, minmax(0, 1fr))`;
    },
  },
  watch: {
    modelValue: {
      handler(nv) {
        this.reactive.maximized = nv;
      },
    },
    columns: {
      handler() {
        this.setCols();
      },
      immediate: true
    },
  },
  provide() {
    return {
      minimize: this.minimize,
      maximize: this.maximize,
      containerOptions: this.options,
      viewportContainer: this.reactive,
    };
  },
  mounted() {
    this.observer = new ResizeObserver(this.setCols);
    this.observer.observe(this.$refs.viewportContainer);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
  methods: {
    minimize() {
      this.reactive.maximized = null;
      this.$emit('update:modelValue', this.reactive.maximized);
    },
    maximize(id) {
      this.reactive.maximized = id;
      this.$emit('update:modelValue', this.reactive.maximized);
    },
    setCols() {
      if (this.columns !== null) {
        this.cols = this.columns;
      } else {
        const width = this.$refs.viewportContainer?.clientWidth || 1;
        const height = this.$refs.viewportContainer?.clientHeight || 1;
        const ar = width / height;

        this.cols = columns(ar, this.aspectRatio, this.options.length);
      }
      this.$emit('resize');
    },
  },
};
</script>
