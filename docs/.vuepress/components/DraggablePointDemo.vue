<template>
  <div class="container">
    <svg
      class="svg"
      viewBox="0 0 100 100"
    >
      <c-draggable-point
        :point="point"
        :scale="0.5"
        @dragging="setPoint"
        @drag-end="setPoint"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      point: { x: 50, y: 50 },
    };
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.container {
  margin: 0 auto;
  width: 100%;
  height: 25rem;
  border: $border-sm solid $color-gray-04;

  @media (min-width: 640px) {
    width: 25rem;
  }
}

.svg {
  width: 100%;
  height: 100%;
}

</style>