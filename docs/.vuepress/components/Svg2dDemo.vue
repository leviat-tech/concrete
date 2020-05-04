<template>
  <component-container>
    <div class="container">
      <plan-demo
        key="plan-a"
        viewport-id="plan-a"
        name="Plan A"
        :fit-margin="2"
        :initial-points="[
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 65, y: 50 },
          { x: 100, y: 100 },
          { x: 0, y: 100 },
        ]"
        fit-to-content
      />
    </div>
  </component-container>
</template>

<script>
import ComponentContainer from './ComponentContainer';
import PlanDemo from './PlanDemo';


export default {
  name: 'Svg2dDemo',
  components: {
    ComponentContainer,
    PlanDemo,
  },
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