<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  .container-column {
    position: relative;
    overflow: visible;
  }
  .handle {
    opacity: 0%;
    background: grey;
    position: absolute;
    height: 100%;
    width: 10px;
    left:-5px;
    z-index: 99;
    transition: opacity 0.5s ease;
    &:hover {
      cursor: col-resize;
      opacity: 25%;
    }
  }
  .center {
    padding: 5px;
    // background: yellow;
  }
</style>


<template>
  <div ref="el" class="resizable" :style="style">
    <div class="container-column h-box flex-grow">
      <div class="handle flex-limit" v-dragged="dragged" draggable="false">
      </div>
      <div class="center flex-grow v-box scroll">
        <slot></slot>
      </div>
      <!-- <div class="right-handle flex-limit"></div> -->
    </div>
  </div>
</template>


<script>
export default {
  name: 'k-resizable',
  props: ['min', 'max'],
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
    this.initial = this.$refs.el.offsetWidth;
    this.resize(this.initial);
  },
};
</script>
