<template>
  <div id="app">
    <div class="tab-div">
      <c-viewport-container
        v-model="maximized"
        :options="[ 'a', 'b' ]"
      >
        <c-viewport
          v-model="aviewport"
          viewport-id="a"
          :maximized="maximized"
          :options="[
            { label: 'Elevation', value: 'elevation' },
          ]"
        >
          <elevation-drawing />
        </c-viewport>
        <c-viewport
          v-model="bviewport"
          viewport-id="b"
          :maximized="maximized"
          :options="[
            { label: 'Section', value: 'section' },
          ]"
        >
          <section-drawing />
        </c-viewport>
      </c-viewport-container>
    </div>
  </div>
</template>

<script>
import ElevationDrawing from './test-components/ElevationDrawing.vue';
import SectionDrawing from './test-components/SectionDrawing.vue';


export default {
  name: 'App',
  components: {
    ElevationDrawing,
    SectionDrawing,
  },
  data() {
    return {
      maximized: null,
      aviewport: 'elevation',
      bviewport: 'section',
    };
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
