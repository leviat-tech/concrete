import Dropdown from '../src/components/Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

export const Searchable = () => ({
  components: { Dropdown },
  data() {
    return {
      selected: 1,
      search: ''
    };
  },
  computed: {
    options() {
      return [
        { label: 'hello', value: 1 },
        { label: 'darkness', value: 2 },
        { label: 'my', value: 3 },
        { label: 'old', value: 4 },
        { label: 'friend', value: 5 }
      ];
    },
    filteredOptions() {
      return this.options.filter(o => o.label.includes(this.search));
    }
  },
  methods: {
    handleSelect(option) {
      this.selected = option.value;
      this.search = '';
    },
    handleSearch(text) {
      this.search = text;
    }
  },
  template: `
    <div>
      <dropdown
        placeholder="select an option"
        :options="filteredOptions"
        @select="handleSelect"
        @search="handleSearch"
      />
    </div>
  `,
});