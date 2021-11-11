<template>
  <div
    class="concrete-viewport"
    :class="{ 'concrete-viewport-grid': !fullWidth }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CViewportContainer',
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number], default: null },
  },
  data() {
    return {
      maximized: this.value,
    };
  },
  computed: {
    fullWidth() {
      return this.maximized || this.options.length < 2;
    },
  },
  watch: {
    value: {
      handler(nv) {
        this.maximized = nv;
      },
    },
  },
  provide() {
    return {
      minimize: this.minimize,
      maximize: this.maximize,
      containerOptions: this.options,
    };
  },
  methods: {
    minimize() {
      this.maximized = null;
      this.$emit('input', this.maximized);
    },
    maximize(id) {
      this.maximized = id;
      this.$emit('input', this.maximized);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.concrete-viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.concrete-viewport-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 1px;
    background-color: $color-gray-04;
  }
}

.concrete-viewport > div {
  background-color: #fff;
}

</style>
