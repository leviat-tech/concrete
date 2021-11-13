<template>
  <div id="app">
    <div class="tab-div">
      <c-viewport-container
        v-model="maximized"
        :options="[ 'a' ]"
      >
        <c-viewport
          v-model="aviewport"
          viewport-id="a"
          :options="[
            { label: 'Elevation', value: 'elevation' },
          ]"
        >
          <elevation-drawing />
        </c-viewport>
        <!-- <c-viewport
          v-model="bviewport"
          viewport-id="b"
          :options="[
            { label: 'Section', value: 'section' },
          ]"
        >
          <section-drawing />
        </c-viewport> -->
      </c-viewport-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
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
