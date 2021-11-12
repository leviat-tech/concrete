<template>
  <div id="app">
    <div class="tallboi" />
    <c-select :value="1" :options="options" :formatter="formatter" />
  </div>
</template>

<script>
import Select from './components/Select.vue';


export default {
  name: 'App',
  components: {
    CSelect: Select,
  },
  computed: {
    options() {
      return [1, 2111111111111111111111, 3];
    },
    formatter() {
      return (val) => `${val} mm`;
    },
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
  font-family: "system-ui",
    "BlinkMacSystemFont",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif";
  -webkit-font-smoothing: antialiased;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  width: 5vw;
}

p {
  display: block;
}

.tab-div {
  width: 24rem;
  height: 24rem;
  border: 1px solid #D8DBE1;
}

</style>
