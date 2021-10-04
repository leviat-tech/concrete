<template>
  <div>
    <div class="tab-div">
      <c-panel-slider title="Primary">
        <c-toolbar v-model="currentTool" default-tool="select">
          <c-tool-group>
            <c-tool name="Undo" tool-id="undo" icon="undo" disabled />
            <c-tool name="Redo" tool-id="redo" icon="redo" />
          </c-tool-group>
          <c-tool-group>
            <c-tool name="Select" tool-id="select" icon="pointer-outline" />
            <c-tool name="Pan" tool-id="pan" icon="hand" />
            <c-tool name="Code" tool-id="zoom-to-fit">
              <zoom-to-fit-icon />
            </c-tool>
            <c-tool :stateful="false" :hoverable="false" tool-id="option">
              <c-select
                size="xs"
                :options="[
                  { label: 'foo', value: 'foo' },
                  { label: 'bar', value: 'bar' },
                ]"
              />
            </c-tool>
          </c-tool-group>
        </c-toolbar>
        Test component.
        <div>
          <c-panel-link link-to="a">Drill Down</c-panel-link>
          <c-panel-link link-to="b">A different menu</c-panel-link>
        </div>
        Some more content.
        <c-icon>
          <code-icon />
        </c-icon>
        <c-icon>
          <zoom-to-fit-icon />
        </c-icon>
        <c-icon type="pointer-outline" />
        <c-panel panel-id="a" title="Secondary">
          <c-panel-link link-to="x">Drill more?</c-panel-link>
          <nested-component />
        </c-panel>
        <c-panel panel-id="b" title="Another?">
          A different Secondary Panel
        </c-panel>
      </c-panel-slider>
    </div>
    <div class="tab-div">
      <c-tab-switcher v-model="currentTab" tab-position="bottom">
        <template v-slot:labels>
          <c-tab-label tab-id="one">Tab Label 1</c-tab-label>
          <c-tab-label tab-id="two">Tab Label 2</c-tab-label>
          <c-tab-label tab-id="three">Tab Label 3</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab tab-id="one" class="tab-interior">
            <p>Tab content 1.</p>
            <p>
              Lorem ipsum dolor sit amet...
            </p>
          </c-tab>
          <c-tab tab-id="two" class="tab-interior">
            <p>Tab content 2</p>
            <p>
              Sed ut perspiciatis unde omnis...
            </p>
          </c-tab>
          <c-tab tab-id="three" class="tab-interior">
            <p>Content 3!</p>
          </c-tab>
        </template>
      </c-tab-switcher>
    </div>
    <div class="tab-div">
      <c-viewport>
        <c-svg-2d-viewport
          name="Elevation"
          viewport-id="elevation"
          :extents="{ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }"
        >
          <c-draggable-point
            :point="{ x: 5, y: 5 }"
          />
        </c-svg-2d-viewport>
      </c-viewport>
    </div>
  </div>
</template>

<script>
import ZoomToFitIcon from '../assets/icons/zoom-to-fit.svg';
import CodeIcon from '../assets/icons/code.svg';
import NestedComponent from './NestedComponent';


export default {
  name: 'TestComponent',
  components: {
    CodeIcon,
    ZoomToFitIcon,
    NestedComponent,
  },
  data() {
    return {
      currentTool: 'select',
      currentTab: null,
    };
  },
};
</script>
