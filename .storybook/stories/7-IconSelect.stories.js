import CIconSelect from '../../src/components/IconSelect.vue';
import CRadio from '../../src/components/Radio.vue';
import CTextInput from '../../src/components/TextInput.vue';
import CCheckbox from '../../src/components/Checkbox.vue';


export default {
  title: 'IconSelect',
  component: CIconSelect,
};

export const Horizontal = () => ({
  data() {
    return {
      type: 'expression',
    };
  },
  computed: {
    options() {
      return [
        { icon: 'subscript', value: 'expression' },
        { icon: 'radio', value: 'boolean' },
      ]
    },
  },
  components: { CIconSelect, CCheckbox, CRadio, CTextInput },
  template: `
    <div>
      <c-icon-select
        :value="type"
        :options="options"
        label="label"
        @change-value="type = $event"
      />
      <c-checkbox v-if="type === 'boolean'" />
      <c-text-input
        v-else
        placeholder="i'm an expression!"
        style="width:15rem;"
      />
    </div>
  `,
});