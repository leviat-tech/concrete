import CNumericInput from "../NumericInput.vue";
import { formElementProps } from '../../../storybook/argTypes';

const componentTemplate = (args) => ({
  components: { CNumericInput },
  setup() {
    return { args };
  },
  template: '<CNumericInput v-bind="args" id="numeric-input" />',
});

export default {
  title: "Components/Input/NumericInput",
  component: CNumericInput,

  argTypes: {
    ...formElementProps,

    onEnter: {
      table: {
        disable: true,
      },
    },

    onBlur: {
      table: {
        disable: true,
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    size: "md",
    color: "default",
    onEnter: undefined,
    onBlur: undefined,
    disabled: false,
    readOnly: false,
    transparent: false,
    placeholder: "",
  },
};
