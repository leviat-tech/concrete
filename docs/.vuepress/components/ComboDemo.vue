<template>
  <div class="demo-container">
    <div class="main-content">
      <div class="toolbar-container">
        <c-toolbar default-tool="select">
          <c-tool-group>
            <c-tool name="Undo" tool-id="undo" icon="undo" />
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
        <c-button @click="showModal = true">Click me</c-button>
      </div>
    </div>
    <div class="sidebar-container">
      <c-tab-switcher tab-position="bottom">
        <template v-slot:labels>
          <c-tab-label>Inputs</c-tab-label>
          <c-tab-label>Nested Menus</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab>
            <c-panel-slider title="Inputs">
              <c-text-input label="Text" />
              <c-quantity-input
                label="Quantity"
                :precision="1"
                :value="0"
                units="m"
                :maximum="5"
                :minimum="0"
              />
              <c-select
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
                label="Native Select"
                :options="[
                  { label: 'hello', value: 1 },
                  { label: 'darkness', value: 2 },
                  { label: 'my', value: 3 },
                  { label: 'old', value: 4 },
                  { label: 'friend', value: 5 }
                ]"
              />
              <c-textarea
                label="Textarea"
                :rows="3"
              />
              <c-checkbox label="Checkbox" />
              <c-radio
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
export default {
  name: 'ComboDemo',
  data() {
    return {
      showModal: false
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
}

.main-content {
  flex-grow: 1;
}

.toolbar-container {
  border-bottom: $border-sm solid $color-gray-04;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .5rem;
  box-sizing: border-box;
}

.sidebar-container {
  flex: none;
  width: 20rem;
  border-left: $border-sm solid $color-gray-04;
}

/deep/ .concrete-input-label.concrete {
  width: 6rem;
}

/deep/ .concrete-select-row {
  margin-bottom: 0.5rem;
}

</style>