<template>
  <div id="app">
    <div class="input-row">
      <c-draggable-list>
        <c-draggable-item v-for="(item, i) in draggableItems" :key="`drag_${i}`">
          <div>{{ item.name }}</div>
        </c-draggable-item>
      </c-draggable-list>
    </div>
    <div class="card-row">
      <c-dropdown>
        <template v-slot:button>Click to open</template>
        <template v-slot:content>This is dropdown content</template>
      </c-dropdown>
    </div>
    <div class="card-row">
      <c-card-list
        v-model="cardList"
        card-width="16rem"
      >
        <c-card
          v-for="(card, i) in cardList"
          :key="card.title"
          :index="i"
        >
          <template v-slot:title>
            {{ card.title }}
          </template>
          {{ card.content }}
        </c-card>
      </c-card-list>
    </div>
    <div class="tab-container">
      <c-viewport>
        <c-svg-2d-viewport
          key="section"
          viewport-id="section"
          icon="cube"
          name="Section"
        >
          <circle r="100" draggable />
        </c-svg-2d-viewport>
      </c-viewport>
    </div>
    <div class="input-row">
      <c-button>Hello</c-button>
      <c-button><c-icon type="plus" size="lg" /></c-button>
      <c-button :play="true">Hello</c-button>
      <c-button :play="true" :progress="50">Hello</c-button>
      <c-button @click="showModal = true">Click for modal</c-button>
      <c-button @click="showAlertbox">Click for alertbox</c-button>
      <c-button fill="bare">Bare button</c-button>
      <c-modal
        v-if="showModal"
        title="Modal Title"
        @close="showModal = false"
      >
        This is modal content.
      </c-modal>
    </div>
    <div>
      <p class="xs-font">XS size font: <c-icon type="play" /></p>
      <p class="sm-font">SM size font: <c-icon type="play" /></p>
      <p class="base-font">Base size font: <c-icon type="play" /></p>
      <p class="lg-font">LG size font: <c-icon type="play" /></p>
      <p class="xl-font">XL size font: <c-icon type="play" /></p>
      <p>
        <c-icon type="hand" size="xs" />
        <c-icon type="hand" size="sm" />
        <c-icon type="hand" size="md" />
        <c-icon type="hand" size="lg" />
        <c-icon type="hand" size="xl" />
      </p>
    </div>
    <div class="input-row">
      <c-text-input
        v-model="textValue"
        placeholder="Enter a Value"
        label="Text Input"
      />
    </div>
    <div class="input-row">
      <c-textarea
        v-model="textareaValue"
        placeholder="Enter a Value"
        label="Textarea"
      />
    </div>
    <div class="input-row">
      <c-quantity-input
        v-model="quantityValue"
        placeholder="Enter a Value"
        label="Quantity Input"
        :precision="1"
        units="m"
        :maximum="5"
        :minimum="0"
      />
    </div>
    <div class="input-row">
      <c-native-select
        v-model="selectValue"
        class="my-native-select"
        placeholder="Select an Option"
        label="Native Select"
        size="xs"
        :options="options"
      />
    </div>
    <div class="input-row">
      <c-select
        v-model="selectValue"
        class="my-native-select"
        placeholder="Select an Option"
        label="Select"
        size="xs"
        :options="options"
      />
    </div>
    <div class="input-row">
      <c-select
        v-model="customSelectValue"
        :show-image="true"
        :show-sections="true"
        label="Custom Select"
        :options="customSelectOptions"
      />
    </div>
    <div class="input-row">
      <c-search-select
        v-model="searchSelectValue"
        placeholder="Select an Option"
        label="Search Select"
        :options="options"
      />
    </div>
    <div class="input-row">
      <c-multi-select
        v-model="multiselectValues"
        placeholder="Select Multiple Options"
        label="Multi Select"
        :options="options"
      />
    </div>
    <div class="input-row">
      <c-checkbox
        v-model="booleanValue"
        label="Checkbox"
      />
    </div>
    <div class="input-row">
      <c-radio
        v-model="radioValue"
        :options="radioOptions"
        label="Radio"
      />
    </div>
    <div class="input-row">
      <c-table
        :data="tableData"
        :order-by="{
          direction: 'asc',
          prop: 'name',
        }"
      >
        <c-column
          prop="name"
          label="Name"
        />
        <c-column
          prop="quantity"
          label="Quantity"
        />
        <c-column
          prop="animal"
          label="Animal"
          :sortable="false"
        />
      </c-table>
    </div>
    <div class="input-row">
      <c-table
        :data="sortedData"
        :order-by="{
          direction: sortDirection,
          prop: sortProp,
        }"
        :external-sort="true"
        @sort="handleSort"
      >
        <c-column
          prop="name"
          label="Name"
        />
        <c-column
          prop="quantity"
          label="Quantity"
        />
        <c-column
          prop="animal"
          label="Animal"
          :sortable="false"
        />
      </c-table>
    </div>
    <div>
      <c-toolbar v-model="currentTool">
        <c-tool-group>
          <c-tool name="Select" tool-id="select" icon="pointer-outline" default-tool />
          <c-tool name="Pan" tool-id="pan" icon="hand" />
          <c-tool name="Pen" tool-id="pen" icon="pen" />
          <c-tool name="Polygon" tool-id="polygon" icon="polygon" />
        </c-tool-group>
        <c-tool-group>
          <c-tool
            name="Run"
            tool-id="play"
            icon="play"
            :stateful="false"
          />
          <c-tool name="Cool" tool-id="cool" text-button />
          <c-tool name="Pause" tool-id="pause" icon="pause" />
          <c-tool name="Chamfer" tool-id="chamfer">
            <chamfer />
          </c-tool>
        </c-tool-group>
      </c-toolbar>
    </div>
    <div class="tab-container">
      <c-tab-switcher
        tab-position="top"
      >
        <template v-slot:labels>
          <c-tab-label>Tab Label 1</c-tab-label>
          <c-tab-label>Tab Label 2</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab class="tab-interior">
            <p>Tab content 1.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </c-tab>
          <c-tab class="tab-interior">
            <p>Tab content 2</p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
              porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
              aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
              qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </c-tab>
        </template>
      </c-tab-switcher>
    </div>
    <c-checkbox
      v-model="switched2"
      label="Dynamic div 2"
    />
    <c-checkbox
      v-model="switched"
      label="Dynamic div"
    />
    <div class="tab-container">
      <c-panel-slider title="Primary">
        <c-panel-section>
          Content.
          <div v-if="switched">Dynamic content</div>
          <c-panel-link link-to="a">
            Drill Down. Lorem ipsum dolor sit amet, consectetur
          </c-panel-link>
          <c-panel-link link-to="b" size="xs">A different menu</c-panel-link>
        </c-panel-section>
        <c-panel-section>
          Some more content.
        </c-panel-section>
        <c-panel panel-id="a" title="Secondary">
          <c-panel-section>
            Secondary Content
            <div v-if="switched2">
              Secondary optional content.
            </div>
            <c-panel-link link-to="x">Drill more?</c-panel-link>
          </c-panel-section>
          <c-panel panel-id="x" title="Tertiary">
            <c-panel-section>
              Tertiary Content
              <c-panel-link link-to="q">Last one</c-panel-link>
            </c-panel-section>
            <c-panel panel-id="q" title="Last one">
              <c-panel-section>
                Some final content
              </c-panel-section>
            </c-panel>
          </c-panel>
        </c-panel>
        <c-panel panel-id="b" title="Another?">
          A different Secondary Panel
        </c-panel>
      </c-panel-slider>
    </div>

    <div class="input-row">
      <c-masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 1}" gutter="1.5rem">
        <div class="card">Hi Dave</div>
        <div class="card">Second div</div>
        <div class="card">Third</div>
        <div class="card">Fourth</div>
      </c-masonry>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import CDraggableList from '@/components/DraggableList';
import CButton from '@/components/Button';
import CDropdown from '@/components/Dropdown';
import CIcon from '@/components/Icon';
import CNativeSelect from '@/components/NativeSelect';
import CSelect from '@/components/Select';
import CQuantityInput from '@/components/QuantityInput';
import CTextInput from '@/components/TextInput';
import CTextarea from '@/components/Textarea';
import CCheckbox from '@/components/Checkbox';
import CRadio from '@/components/Radio';
import CSearchSelect from '@/components/SearchSelect';
import CMultiSelect from '@/components/MultiSelect';
import CModal from '@/components/Modal';
import { CToolbar, CToolGroup, CTool } from '@/components/Toolbar';
import { CTable, CColumn } from '@/components/Table';
import { CTabSwitcher, CTabLabel, CTab } from '@/components/TabSwitcher';
import { CPanelSlider, CPanel, CPanelLink, CPanelSection } from '@/components/PanelSlider';
import CMasonry from '@/components/Masonry';
import CViewport from '@/components/Viewport';
import CCardList from '@/components/CardList';
import CCard from '@/components/Card';
import CSvg2dViewport from '@/components/Svg2dViewport';
import Chamfer from '@/assets/icons/chamfer.svg';


export default {
  name: 'App',
  components: {
    CCardList,
    CCard,
    CButton,
    CDraggableList,
    CDropdown,
    CIcon,
    CTextInput,
    CTextarea,
    CQuantityInput,
    CNativeSelect,
    CSearchSelect,
    CSelect,
    CMultiSelect,
    CCheckbox,
    CRadio,
    CModal,
    CToolbar,
    CToolGroup,
    CTool,
    CTable,
    CColumn,
    CTabSwitcher,
    CTabLabel,
    CTab,
    CPanelSlider,
    CPanel,
    CPanelLink,
    CPanelSection,
    CMasonry,
    CViewport,
    CSvg2dViewport,
    Chamfer,
  },
  data() {
    return {
      showDropdown: false,
      textValue: null,
      textareaValue: null,
      quantityValue: 0,
      selectValue: '',
      customSelectValue: '',
      searchText: '',
      searchSelectValue: null,
      multiselectValues: [],
      booleanValue: false,
      radioValue: null,
      showModal: false,
      switched: true,
      switched2: true,
      currentTool: 'select',
      sortDirection: 'asc',
      sortProp: 'name',
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 60 },
        { x: 80, y: 60 },
        { x: 80, y: 45 },
        { x: 60, y: 45 },
        { x: 40, y: 60 },
        { x: 0, y: 60 },
      ],
      cardList: [
        { title: 'Card A', content: 'Content A' },
        { title: 'Card B', content: 'Content B' },
        { title: 'Card C', content: 'Content C' },
        { title: 'Card D', content: 'Content D' },
        { title: 'Card E', content: 'Content E' },
        { title: 'Card F', content: 'Content F' },
        { title: 'Card G', content: 'Content G' },
        { title: 'Card H', content: 'Content H' },
      ],
      draggableItems: [
        { name: 'Dave' },
        { name: 'Angie' },
      ],
    };
  },
  computed: {
    options() {
      return [
        { label: 'hello', value: 1 },
        { label: 'darkness', value: 2 },
        { label: 'my', value: 3 },
        { label: 'old', value: 4 },
        { label: 'friend', value: 5 },
        { label: 'goodbye', value: 6 },
      ];
    },
    radioOptions() {
      return [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ];
    },
    tableData() {
      return [
        { name: 'Wendy', quantity: 3, animal: 'cat' },
        { name: 'Roger', quantity: 2, animal: 'pigeon' },
        { name: 'Angie', quantity: 4, animal: 'mink' },
      ];
    },
    sortedData() {
      if (!this.sortProp || !this.sortDirection) return this.tableData;
      return this.tableData.slice().sort((a, b) => {
        const aValue = get(a, this.sortProp);
        const bValue = get(b, this.sortProp);
        const aSort = this.sortDirection === 'asc' ? -1 : 1;
        if (aValue < bValue) return aSort;
        if (aValue > bValue) return -1 * aSort;
        return 0;
      });
    },
    customSelectOptions() {
      return [
        { section: 'Screws', image: '/images/socket-head-screw.png', label: 'Socket Head Screw', value: 1 },
        { section: 'Screws', image: '/images/flat-head-screw.png', label: 'Flat Head Screw', value: 2 },
        { section: 'Screws', image: '/images/hex-head-screw.png', label: 'Hex Head Screw', value: 3 },
        { section: 'Screws', image: '/images/round-head-screw.png', label: 'Round Head Screw', value: 4 },
        { section: 'Nuts', image: '/images/flange-nut.png', label: 'Flange Nut', value: 5 },
        { section: 'Nuts', image: '/images/hex-nut.png', label: 'Hex Nut', value: 6 },
        { section: 'Nuts', image: '/images/lock-nut.png', label: 'Lock Nut', value: 7 },
        { section: 'Nuts', image: '/images/slotted-nut.png', label: 'Slotted Nut', value: 8 },
        { section: 'Washers', image: '/images/washer.png', label: 'Washer', value: 9 },
        { section: 'Washers', image: '/images/lock-washer.png', label: 'Locking Washer', value: 10 },
        { section: 'Washers', image: '/images/leveling-washer.png', label: 'Leveling Washer', value: 11 },
        { section: 'Washers', image: '/images/cushioning-washer.png', label: 'Cushioning Washer', value: 12 },
        { section: 'Washers', image: '/images/sealing-washer.png', label: 'Sealing Washer', value: 12 },
      ];
    },
    polygon() {
      return this.points.map(({ x, y }) => `${x},${y}`).join(' ');
    },
  },
  methods: {
    handleSearch(text) {
      this.searchText = text;
    },
    showAlertbox() {
      this.$alert('Message content');
    },
    handleSort({ direction, prop }) {
      this.sortDirection = direction;
      this.sortProp = prop;
      // console.log('sorted?', JSON.stringify(this.sortedData, null, 2));
    },
  },
};
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
