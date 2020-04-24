<template>
  <div id="app">
    <div class="input-row">
      <c-button>Hello</c-button>
      <c-button><plus /></c-button>
      <c-button :play="true">Hello</c-button>
      <c-button :play="true" :progress="50">Hello</c-button>
      <c-button @click="showModal = true">Click for modal</c-button>
      <c-button @click="showAlertbox">Click for alertbox</c-button>
      <c-modal
        v-if="showModal"
        title="Modal Title"
        @close="showModal = false"
      >
        This is modal content.
      </c-modal>
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
        placeholder="Select an Option"
        label="Native Select"
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
        :initial-sort="{
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
        />
      </c-table>
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
          <c-tab>Tab content 1</c-tab>
          <c-tab>Tab content 2</c-tab>
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
      <c-panel title="Primary">
        Content.
        <div v-if="switched">Dynamic content</div>
        <div>
          <c-panel-link link-to="a">Drill Down</c-panel-link>
          <c-panel-link link-to="b">A different menu</c-panel-link>
        </div>
        Some more content.
        <c-panel panel-id="a" title="Secondary">
          Secondary Content
          <div v-if="switched2">
            Secondary optional content.
          </div>
          <c-panel-link link-to="x">Drill more?</c-panel-link>
          <c-panel panel-id="x" title="Tertiary">
            Tertiary Content
          </c-panel>
        </c-panel>
        <c-panel panel-id="b" title="Another?">
          A different Secondary Panel
        </c-panel>
      </c-panel>
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
import CButton from './components/Button.vue';
import CNativeSelect from './components/NativeSelect.vue';
import CSelect from './components/Select.vue';
import CQuantityInput from './components/QuantityInput.vue';
import CTextInput from './components/TextInput.vue';
import CTextarea from './components/Textarea.vue';
import CCheckbox from './components/Checkbox.vue';
import CRadio from './components/Radio.vue';
import CSearchSelect from './components/SearchSelect.vue';
import CMultiSelect from './components/MultiSelect.vue';
import CModal from './components/Modal.vue';
import { CTable, CColumn } from './components/Table.vue';
import { CTabSwitcher, CTabLabel, CTab } from './components/TabSwitcher.vue';
import { CPanel, CPanelLink } from './components/Panel.vue';
import CMasonry from './components/Masonry.vue';
import Plus from './assets/plus.svg';


export default {
  name: 'App',
  components: {
    CButton,
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
    CTable,
    CColumn,
    CTabSwitcher,
    CTabLabel,
    CTab,
    CPanel,
    CPanelLink,
    Plus,
    CMasonry,
  },
  data() {
    return {
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
  },
  methods: {
    handleSearch(text) {
      this.searchText = text;
    },
    showAlertbox() {
      this.$alert('Message content');
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

.concrete-button {
  margin-right: 0.5rem;
}

.tab-container {
  width: 24rem;
  height: 24rem;
  border: $border-sm solid $color-gray-04;
  margin-bottom: 1.5rem;
}

</style>
