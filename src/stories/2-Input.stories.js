import CSelect from '../components/Select.vue';
import CQuantityInput from '../components/QuantityInput.vue';
import CTextInput from '../components/TextInput.vue';
import CTextarea from '../components/Textarea.vue';
import CCheckbox from '../components/Checkbox.vue';
import CRadio from '../components/Radio.vue';
import CSearchSelect from '../components/SearchSelect.vue';
import CMultiSelect from '../components/MultiSelect.vue';


export default {
  title: 'Input',
  components: {
    CTextInput,
    CTextarea,
    CQuantityInput,
    CSelect,
    CSearchSelect,
    CMultiSelect,
    CCheckbox,
    CRadio,
  },
};

export const Active = () => ({
  components: {
    CTextInput,
    CTextarea,
    CQuantityInput,
    CSelect,
    CSearchSelect,
    CMultiSelect,
    CCheckbox,
    CRadio,
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
      radioValue: null,
      multiselectValues: [],
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
    radioOptions() {
      return [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ];
    },
    filteredOptions() {
      return this.options.filter((o) => o.label.includes(this.searchText));
    },
  },
  template: `
    <div>
      <div class="input-row">
        <c-text-input
          placeholder="Enter a Value"
          label="Text Input"
          v-model="textValue"
        />
      </div>
      <div class="input-row">
        <c-textarea
          placeholder="Enter a Value"
          label="Textarea"
          v-model="textareaValue"
        />
      </div>
      <div class="input-row">
        <c-quantity-input
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
        <c-select
          placeholder="Select an Option"
          label="Select"
          :options="options"
          v-model="selectValue"
        />
      </div>
      <div class="input-row">
        <c-search-select
          v-model="searchSelectValue"
          placeholder="Select an Option"
          label="Search Select"
          :options="filteredOptions"
        />
      </div>
      <div class="input-row">
        <c-multi-select
          placeholder="Select Multiple Options"
          label="Multi Select"
          v-model="multiselectValues"
          :options="options"
        />
      </div>
      <div class="input-row">
        <c-checkbox
          label="Checkbox"
          v-model="booleanValue"
        />
      </div>
      <div class="input-row">
        <c-radio
          v-model="radioValue"
          :options="radioOptions"
          label="Radio"
        />
      </div>
    </div>
  `,
});
