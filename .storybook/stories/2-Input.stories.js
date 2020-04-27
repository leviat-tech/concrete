import CNativeSelect from '../../src/components/NativeSelect.vue';
import CSelect from '../../src/components/Select.vue';
import CQuantityInput from '../../src/components/QuantityInput.vue';
import CTextInput from '../../src/components/TextInput.vue';
import CTextarea from '../../src/components/Textarea.vue';
import CCheckbox from '../../src/components/Checkbox.vue';
import CRadio from '../../src/components/Radio.vue';
import CSearchSelect from '../../src/components/SearchSelect.vue';
import CMultiSelect from '../../src/components/MultiSelect.vue';


export default {
  title: 'Input',
  components: {
    CTextInput,
    CTextarea,
    CQuantityInput,
    CNativeSelect,
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
    CNativeSelect,
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
      customSelectValue: '',
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
    customSelectOptions() {
      return [
        { section: 'Screws', image: '/socket-head-screw.png', label: 'Socket Head Screw', value: 1 },
        { section: 'Screws', image: '/flat-head-screw.png', label: 'Flat Head Screw', value: 2 },
        { section: 'Screws', image: '/hex-head-screw.png', label: 'Hex Head Screw', value: 3 },
        { section: 'Screws', image: '/round-head-screw.png', label: 'Round Head Screw', value: 4 },
        { section: 'Nuts', image: '/flange-nut.png', label: 'Flange Nut', value: 5 },
        { section: 'Nuts', image: '/hex-nut.png', label: 'Hex Nut', value: 6 },
        { section: 'Nuts', image: '/lock-nut.png', label: 'Lock Nut', value: 7 },
        { section: 'Nuts', image: '/slotted-nut.png', label: 'Slotted Nut', value: 8 },
        { section: 'Washers', image: '/washer.png', label: 'Washer', value: 9 },
        { section: 'Washers', image: '/lock-washer.png', label: 'Locking Washer', value: 10 },
        { section: 'Washers', image: '/leveling-washer.png', label: 'Leveling Washer', value: 11 },
        { section: 'Washers', image: '/cushioning-washer.png', label: 'Cushioning Washer', value: 12 },
        { section: 'Washers', image: '/sealing-washer.png', label: 'Sealing Washer', value: 12 },
      ];
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
        <c-native-select
          placeholder="Select an Option"
          label="Native Select"
          :options="options"
          v-model="selectValue"
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
