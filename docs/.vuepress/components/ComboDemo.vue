<template>
  <div class="demo-container">
    <div class="main-content">
      <div class="toolbar-container">
        <c-toolbar default-tool="select">
          <c-tool-group>
            <c-tool name="Undo" tool-id="undo" icon="undo" v-concrete-tooltip="'hi dave'" />
            <c-tool name="Redo" tool-id="redo" icon="redo" />
          </c-tool-group>
          <c-tool-group>
            <c-tool name="Select" tool-id="select" icon="pointer-outline" />
            <c-tool name="Pan" tool-id="pan" icon="hand" />
            <c-tool name="Pen" tool-id="pen" icon="pen" />
          </c-tool-group>
          <c-tool-group>
            <c-tool name="Run" tool-id="play" icon="play" />
            <c-tool name="Pause" tool-id="pause" icon="pause" />
          </c-tool-group>
        </c-toolbar>
        <c-button @click="showModal = true" class="show-modal-button">Click&nbsp;me</c-button>
      </div>
      <div class="concrete-demo-drawing">
        <c-viewport>
          <plan-demo
            key="plan-a"
            viewport-id="plan-a"
            name="Plan A"
            :fit-margin="3.5"
            :initial-points="[
              { x: 0, y: 0 },
              { x: 100, y: 0 },
              { x: 65, y: 50 },
              { x: 100, y: 100 },
              { x: 0, y: 100 },
            ]"
            fit-to-content
          />
          <plan-demo
            key="plan-b"
            viewport-id="plan-b"
            name="Plan B"
            :fit-margin="3.5"
            :initial-points="[
              { x: 0, y: 0 },
              { x: 100, y: 0 },
              { x: 100, y: 60 },
              { x: 80, y: 60 },
              { x: 80, y: 45 },
              { x: 60, y: 45 },
              { x: 40, y: 60 },
              { x: 0, y: 60 },
            ]"
            fit-to-content
          />
        </c-viewport>
      </div>
    </div>
    <div
      class="sidebar-container"
      :class="{ 'show-sidebar': showSidebar }"
    >
      <button
        class="show-sidebar-button"
        :class="{ 'show-sidebar': showSidebar }"
        @click="showSidebar = !showSidebar"
      >
        <c-icon
          :type="showSidebar ? 'chevron-right' : 'chevron-left'"
          size="lg"
        />
      </button>
      <c-tab-switcher
        tab-position="bottom"
        class="tab-switcher"
        :class="{ 'show-sidebar': showSidebar }"
      >
        <template v-slot:labels>
          <c-tab-label>Inputs</c-tab-label>
          <c-tab-label>Nested Menus</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab>
            <c-panel-slider title="Inputs">
              <c-text-input label="Text" size="sm" />
              <c-quantity-input
                label="Quantity"
                :precision="1"
                :value="0"
                units="m"
                :maximum="5"
                :minimum="0"
                size="sm"
              />
              <c-select
                size="sm"
                label="Select"
                placeholder="Select one"
                show-image
                image-size="sm"
                :options="[
                  {
                    section: 'Screws',
                    image: '/images/socket-head-screw.png',
                    label: 'Socket Hd.',
                    value: 1
                  },
                  { 
                    section: 'Screws',
                    image: '/images/flat-head-screw.png',
                    label: 'Flat Head',
                    value: 2
                  },
                  {
                    section: 'Screws',
                    image: '/images/hex-head-screw.png',
                    label: 'Hex Head',
                    value: 3
                  },
                  {
                    section: 'Screws',
                    image: '/images/round-head-screw.png',
                    label: 'Round Hd.',
                    value: 4
                  }
                ]"
              />
              <c-search-select
                size="sm"
                label="Search"
                :options="[
                  { label: 'hello', value: 1 },
                  { label: 'darkness', value: 2 },
                  { label: 'my', value: 3 },
                  { label: 'old', value: 4 },
                  { label: 'friend', value: 5 },
                ]"
              />
              <c-multi-select
                size="sm"
                :value="[1]"
                label="Multi Select"
                :options="[
                  { label: 'your', value: 1 },
                  { label: 'name', value: 2 },
                  { label: 'was', value: 3 },
                  { label: 'deborah', value: 4 },
                ]"
              />
              <c-native-select
                size="sm"
                label="Native Select"
                :value="1"
                :options="[
                  { label: 'hello', value: 1 },
                  { label: 'darkness', value: 2 },
                  { label: 'my', value: 3 },
                  { label: 'old', value: 4 },
                  { label: 'friend', value: 5 }
                ]"
              />
              <c-textarea
                size="sm"
                label="Textarea"
                :rows="3"
              />
              <c-checkbox label="Checkbox" size="sm" />
              <c-radio
                size="sm"
                label="Radio"
                :options="[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]"
              />
            </c-panel-slider>
          </c-tab>
          <c-tab>
            <c-panel-slider title="Nested">
              Menu options:
              <div>
                <c-panel-link link-to="a">Secondary menu</c-panel-link>
                <c-panel-link link-to="b">A different menu</c-panel-link>
                <c-panel-link link-to="c">A third menu</c-panel-link>
                <c-panel-link link-to="d">A fourth menu</c-panel-link>
              </div>
              <c-panel panel-id="a" title="Secondary">
                <c-panel-link link-to="x">Next menu</c-panel-link>
                <c-panel panel-id="x" title="Tertiary">
                  The menus can be of arbitrary depth.
                  <c-panel-link link-to="q">Last one</c-panel-link>
                  <c-panel panel-id="q" title="Last one">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </c-panel>
                </c-panel>
              </c-panel>
              <c-panel panel-id="b" title="Menu B">
                A different Secondary Panel
              </c-panel>
              <c-panel panel-id="c" title="Menu C">
                A different Secondary Panel
              </c-panel>
              <c-panel panel-id="d" title="Menu D">
                A different Secondary Panel
              </c-panel>
            </c-panel-slider>
          </c-tab>
        </template>
      </c-tab-switcher>
    </div>
    <c-modal
      v-if="showModal"
      title="Modal Title"
      @close="showModal = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </c-modal>
  </div>
</template>

<script>
import PlanDemo from './PlanDemo';


export default {
  name: 'ComboDemo',
  components: { PlanDemo },
  data() {
    return {
      showModal: false,
      showSidebar: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.demo-container {
  width: 100%;
  height: 25rem;
  margin-top: 2rem;
  display: flex;
  text-align: left;
  border: $border-sm solid $color-gray-04;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.show-modal-button {
  margin: .25rem .5rem .25rem .5rem; 
}

.toolbar-container {
  border-bottom: $border-sm solid $color-gray-04;
  width: 100%;
  flex-grow: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.concrete-demo-drawing {
  width: 100%;
  flex: 1 1 0%;
  overflow: hidden;
}

.sidebar-container {
  display: flex;
  flex: none;
  width: 1.5rem;
  border-left: $border-sm solid $color-gray-04;

  &.show-sidebar {
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 0;
    background-color: $color-white;
  }

  @media (min-width: 640px) {
    width: 20rem;
  }
}

.show-sidebar-button {
  cursor: pointer;
  border: none;
  outline: none;
  height: 100%;
  width: 1.5rem;
  padding: 0;
  text-align: center;
  flex: none;
  background-color: $color-white;

  &.show-sidebar {
    border-right: $border-sm solid $color-gray-04;
  }

  &:hover {
    background-color: $color-gray-01;
  }

  &:active {
    background-color: $color-gray-02;
  }

  @media (min-width: 640px) {
    display: none;
  }
}

.tab-switcher {
  display: none;
  flex: 1 1 0%;

  &.show-sidebar {
    display: flex;
  }

  @media (min-width: 640px) {
    flex: none;
    width: 20rem;
    display: flex;
  }
}

/deep/ .concrete-input-label.concrete {
  width: 6rem;
}

/deep/ .concrete-input-row {
  margin-bottom: 0.5rem;
}

</style>
