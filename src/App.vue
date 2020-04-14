<template>
  <div id="app">
    <div class="input-row">
      <concrete-button>
        Hello
      </concrete-button>
      <concrete-button>
        <plus />
      </concrete-button>
      <concrete-button :play="true">
        Hello
      </concrete-button>
      <concrete-button :play="true" :progress="50">
        Hello
      </concrete-button>
      <concrete-button @click="showModal = true">
        Click for modal
      </concrete-button>
      <concrete-modal
        v-if="showModal"
        title="Modal Title"
        @close="showModal = false"
      >
        This is modal content.
      </concrete-modal>
    </div>
    <div class="input-row">
      <concrete-text-input
        v-model="textValue"
        placeholder="Enter a Value"
        label="Text Input"
      />
    </div>
    <div class="input-row">
      <concrete-quantity-input
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
      <concrete-select
        v-model="selectValue"
        placeholder="Select an Option"
        label="Select"
        :options="options"
      />
    </div>
    <div class="input-row">
      <concrete-search-select
        v-model="searchSelectValue"
        placeholder="Select an Option"
        label="Search Select"
        :options="filteredOptions"
        @search="handleSearch"
      />
    </div>
    <div class="input-row">
      <concrete-checkbox
        v-model="booleanValue"
        label="Checkbox"
      />
    </div>
  </div>
</template>

<script>
import ConcreteButton from './components/ConcreteButton.vue';
import ConcreteSelect from './components/ConcreteSelect.vue';
import ConcreteQuantityInput from './components/ConcreteQuantityInput.vue';
import ConcreteTextInput from './components/ConcreteTextInput.vue';
import ConcreteCheckbox from './components/ConcreteCheckbox.vue';
import ConcreteSearchSelect from './components/ConcreteSearchSelect.vue';
import ConcreteModal from './components/ConcreteModal.vue';
import Plus from './assets/plus.svg';


export default {
  name: 'App',
  components: {
    ConcreteButton,
    ConcreteTextInput,
    ConcreteQuantityInput,
    ConcreteSelect,
    ConcreteSearchSelect,
    ConcreteCheckbox,
    ConcreteModal,
    Plus,
  },
  data() {
    return {
      textValue: null,
      quantityValue: 0,
      selectValue: 1,
      searchText: '',
      searchSelectValue: null,
      booleanValue: false,
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
      ];
    },
    filteredOptions() {
      return this.options.filter((o) => o.label.includes(this.searchText));
    },
  },
  methods: {
    handleSearch(text) {
      this.searchText = text;
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.concrete-button {
  margin-right: 0.5rem;
}

@import './assets/styles/index.scss';

</style>
