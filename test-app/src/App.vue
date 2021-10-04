<template>
  <div id="app">
    <test-component />
  </div>
</template>

<script>
import TestComponent from './components/TestComponent.vue'

export default {
  name: 'App',
  components: {
    TestComponent
  }
}
</script>

<style lang="scss">
@import './assets/styles/index.scss';
@import './assets/styles/variables.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

p {
  display: block;
}

.concrete-button {
  margin-right: 0.5rem;
}

.my-native-select.concrete-input-row {
  width: 18rem;
}

.card-row {
  padding: 2rem;
  width: 100%;
}

.tab-container {
  width: 24rem;
  height: 24rem;
  border: $border-sm solid $color-gray-04;
  margin-bottom: 1.5rem;
}

.test-box {
  width: 1rem;
  height: 1rem;
  background-color: red;
}

.tab-interior {
  padding: 1rem;
}

.xs-font {
  font-size: $text-xs;
}

.sm-font {
  font-size: $text-sm;
}

.base-font {
  font-size: $text-base;
}

.lg-font {
  font-size: $text-lg;
}

.xl-font {
  font-size: $text-xl;
}
</style>
