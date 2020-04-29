<template>
  <div class="component-container">
    <div class="container-interior" :class="{ theme }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentContainer',
  props: {
    theme: { type: String, default: 'light' },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.component-container {
  box-sizing: border-box;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.container-interior {
  box-sizing: border-box;
  text-align: center;
  border: $border-sm solid $color-gray-04;
  border-radius: 0.5rem;
  padding: 3rem 2rem 3rem 2rem;

  &.light {
    background-color: $color-white;
  }

  &.dark {
    background-color: $color-gray-10;
  }
}

.container-interior > * + * {
  margin-left: 1rem;
  margin-top: 1rem;
}

/deep/ .concrete-select-row {
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
}

</style>