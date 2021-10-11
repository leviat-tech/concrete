<template>
  <div ref="el" :style="style">
    <div class="container-column">
      <div class="handle" v-dragged.prevent="dragged" draggable="false" />
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CResizable',
  props: ['min', 'max', 'name'],
  data() {
    return {
      start: null,
      end: null,
      initial: null,
      current: null,
    };
  },
  computed: {
    style() {
      return { width: `${this.current}px` };
    },
  },
  methods: {
    dragged(e) {
      if (e.first) {
        this.start = {
          x: e.clientX,
          y: e.clientY,
        };
      } else if (e.last) {
        this.end = {
          x: e.clientX,
          y: e.clientY,
        };
        this.resize(this.initial + (this.start.x - this.end.x));
        localStorage.setItem(this.name || 'c-resizable', this.current);
        this.initial = this.current;
      } else if (this.start) {
        this.resize(this.initial - e.offsetX);
      }
    },
    resize(width) {
      this.current = width;
      if (this.min !== undefined) {
        this.current = Math.max(this.current, this.min);
      }
      if (this.max !== undefined) {
        this.current = Math.min(this.current, this.max);
      }
    },
  },
  mounted() {
    this.initial = Number(localStorage.getItem(this.name || 'c-resizable')) || this.$refs.el.offsetWidth;
    this.resize(this.initial);
  },
};
</script>

<style scoped lang="scss">

  .container-column {
    position: relative;
    overflow: visible;
    display: flex;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
  }

  .handle {
    opacity: 0;
    background: grey;
    position: absolute;
    height: 100%;
    width: 0.5rem;
    left: -5px;
    z-index: 49;
    transition: opacity 0.5s ease;
    flex-grow: 0;
    flex-shrink: 0;
    &:hover {
      cursor: col-resize;
      opacity: 0.25;
    }
  }

  .content {
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }

</style>
