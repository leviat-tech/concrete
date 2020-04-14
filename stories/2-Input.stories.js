import ConcreteSelect from '../src/components/ConcreteSelect.vue';
import ConcreteQuantityInput from '../src/components/ConcreteQuantityInput.vue';
import ConcreteTextInput from '../src/components/ConcreteTextInput.vue';
import ConcreteTextarea from '../src/components/ConcreteTextarea.vue';
import ConcreteCheckbox from '../src/components/ConcreteCheckbox.vue';
import ConcreteSearchSelect from '../src/components/ConcreteSearchSelect.vue';


export default {
  title: 'Input',
  components: {
    ConcreteTextInput,
    ConcreteTextarea,
    ConcreteQuantityInput,
    ConcreteSelect,
    ConcreteSearchSelect,
    ConcreteCheckbox,
  },
};

export const Active = () => ({
  components: {
    ConcreteTextInput,
    ConcreteTextarea,
    ConcreteQuantityInput,
    ConcreteSelect,
    ConcreteSearchSelect,
    ConcreteCheckbox,
  },
  data() {
    return {
      textValue: null,
      textareaValue: null,
      quantityValue: 0,
      selectValue: 1,
      searchText: '',
      searchSelectValue: null,
      booleanValue: false,
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
  template: `
    <div>
      <div class="input-row">
        <concrete-text-input
          placeholder="Enter a Value"
          label="Text Input"
          v-model="textValue"
        />
      </div>
      <div class="input-row">
        <concrete-textarea
          placeholder="Enter a Value"
          label="Textarea"
          v-model="textareaValue"
        />
      </div>
      <div class="input-row">
        <concrete-quantity-input
          placeholder="Enter a Value"
          label="Quantity Input"
          :precision="1"
          v-model="quantityValue"
          units="m"
          :maximum="5"
          :minimum="0"
        />
      </div>
      <div class="input-row">
        <concrete-select
          placeholder="Select an Option"
          label="Select"
          :options="options"
          v-model="selectValue"
        />
      </div>
      <div class="input-row">
        <concrete-search-select
          placeholder="Select an Option"
          label="Search Select"
          :options="filteredOptions"
          v-model="searchSelectValue"
          @search="handleSearch"
        />
      </div>
      <div class="input-row">
        <concrete-checkbox
          label="Checkbox"
          v-model="booleanValue"
        />
      </div>
    </div>
  `,
});
