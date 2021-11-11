<template>
  <div>
    <div class="tab-div">
      <c-viewport
        :options="[
          { label: 'Elevation', value: 'elevation' },
          { label: 'Section', value: 'section' }
        ]"
      >
        <c-svg-2d-viewport
          name="Elevation"
          viewport-id="elevation"
          :extents="{ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }"
          v-model="hoverPt"
        >
          <c-draggable-point
            :point="point"
            @dragging="setPoint"
            @dragend="setPoint"
          />
          <c-draggable-point
            :point="{ x: 0, y: 0 }"
            @dragging="setPoint"
            @dragend="setPoint"
          />
          <c-draggable-point
            :point="{ x: -5, y: -5 }"
            @dragging="setPoint"
            @dragend="setPoint"
          />
        </c-svg-2d-viewport>
        <c-svg-2d-viewport
          name="Section"
          viewport-id="section"
          :extents="{ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }"
          v-model="hoverPt"
        >
          <c-draggable-point
            :point="point"
            @dragging="setPoint"
            @dragend="setPoint"
          />
          <c-draggable-point
            :point="{ x: 0, y: 0 }"
            @dragging="setPoint"
            @dragend="setPoint"
          />
          <c-draggable-point
            :point="{ x: -5, y: -5 }"
            @dragging="setPoint"
            @dragend="setPoint"
          />
        </c-svg-2d-viewport>
      </c-viewport>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewportExample',
  data() {
    return {
      point: { x: 5, y: 5 },
      hoverPt: { x: 0, y: 0 },
    };
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    },
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  .status-bar {
    margin: 1.2rem;
  }

  .h-box {
    display: flex;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    align-items: stretch;
    align-items: center;
  }

  .v-box {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
  }

  .project {
    flex: none;
    border-right: 1px solid $color-gray-04;
  }

  .flex-limit {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .flex-col {
    flex-direction: column;
}

</style>