<template>
  <c-masonry :cols="{default: 3, 768: 2, 640: 1}" gutter="1.5rem">
    <div class="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    <div class="card">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    <div class="card">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
    <div class="card">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
  </c-masonry>
</template>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.card {
  @include shadow;
  border: $border-sm solid $color-gray-04;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: $radius;
}
</style>