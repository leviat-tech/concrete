import CAutocomplete from "../AutoComplete.vue";
import { formElementProps } from '../../../storybook/argTypes';

const componentTemplate = (args) => ({
  components: { CAutocomplete },
  setup() {
    return { args };
  },
  data() {
    return {
      value: null,
    };
  },
  template: '<CAutocomplete v-bind="args" v-model="value"></CAutocomplete>',
});

export default {
  title: "Components/Input/AutoComplete",
  component: CAutocomplete,

  argTypes: {
    ...formElementProps,
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  height: "300px",

  args: {
    options: ["Pugh", "Barney", "McGrew", "Cuthbert", "Diddle", "Gruff"],
    onChange: null,
  },
};

export const Formatter = {
  render: componentTemplate.bind({}),
  name: "Formatter",
  height: "300px",

  args: {
    options: [
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "32",
      "33",
      "36",
      "45",
      "55",
    ],
    onChange: null,
    formatter: (l) => (l ? l + String.fromCharCode(32, 99, 109) : null),
  },
};
