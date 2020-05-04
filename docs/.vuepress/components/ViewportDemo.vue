<template>
  <div class="container">
    <c-viewport>
      <c-svg-2d-viewport
        key="rectangle"
        viewport-id="rectangle"
        name="Rectangle"
        :fit-margin="3"
      >
        <rect width="300" height="100" />
      </c-svg-2d-viewport>
      <c-svg-2d-viewport
        key="circle"
        viewport-id="circle"
        name="Circle"
        :fit-margin="3"
      >
        <circle r="100" draggable />
      </c-svg-2d-viewport>
    </c-viewport>
  </div>
</template>

<script>
export default {
  name: 'test-demo',
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

</style>