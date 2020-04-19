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
      <c-select
        v-model="selectValue"
        placeholder="Select an Option"
        label="Select"
        :options="options"
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
import {
  CTabSwitcher,
  CTabLabel,
  CTab,
} from './components/TabSwitcher.vue';
import CMasonry from './components/Masonry.vue';
import Plus from './assets/plus.svg';


export default {
  name: 'App',
  components: {
    CButton,
    CTextInput,
    CTextarea,
    CQuantityInput,
    CSelect,
    CSearchSelect,
    CMultiSelect,
    CCheckbox,
    CRadio,
    CModal,
    CTable,
    CColumn,
    CTabSwitcher,
    CTabLabel,
    CTab,
    Plus,
    CMasonry,
  },
  data() {
    return {
      textValue: null,
      textareaValue: null,
      quantityValue: 0,
      selectValue: 1,
      searchText: '',
      searchSelectValue: null,
      multiselectValues: [],
      booleanValue: false,
      radioValue: null,
      showModal: false,
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
