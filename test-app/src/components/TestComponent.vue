<template>
  <div>

    <c-form-section title="Form Section Test">

    </c-form-section>
    
    <div class="h-box">

      <div class="flex flex-col flex-grow">
        <div class="flex-limit v-box scroll project">
          <c-status-bar class="status-bar">
            <template slot="icon">
              <c-icon type="hand" size="xxl"/>
            </template>
            default
          </c-status-bar>
        </div>
      </div>

      <!-- preview panel -->
      <c-resizable
        class="right flex-limit v-box"
        :min="350"
        :max="700"
      >
        <c-status-bar class="status-bar">
          <template slot="icon">
            <c-icon type="hand" size="xxl"/>
          </template>
          default
        </c-status-bar>
      </c-resizable>

    </div>

    <c-accordion v-model="accordion1">
      <template slot="title">
        <b> Title </b>
      </template>
      <template slot="toolbar">
        <c-icon type="plus" />
      </template>
      <template>
        <hr />
        <div v-for="item in ['item1','item2','item3','item4']" :key="item">
          {{item}}
          <hr />
        </div>
      </template>
    </c-accordion>
    
    <c-status-bar class="status-bar">
      <template slot="icon">
        <c-icon type="hand" size="xxl"/>
      </template>
      default
    </c-status-bar>


    <c-status-bar class="status-bar" type="danger">
      danger
    </c-status-bar>

    <c-status-bar class="status-bar" type="info">
      info
    </c-status-bar>
    
    <c-status-bar class="status-bar" type="warning">
      warning
    </c-status-bar>

    <c-status-bar class="status-bar" type="success">
      <template slot="icon">
        <c-icon type="check" size="xl"/>
      </template>
      success
    </c-status-bar>

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
      point: { x: 5, y: 5 },
      hoverPt: { x: 0, y: 0 },
      accordion1: false,
    };
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    },
  },
};
</script>
