import CTextInput from "../TextInput.vue";
import { formElementProps } from '../../../storybook/argTypes';

const componentTemplate = (args) => ({
  components: { CTextInput },
  setup() {
    return { args };
  },
  data: () => ({ value: "" }),
  template: '<CTextInput v-bind="args" v-model="value"/>',
});

export default {
  title: "Components/Input/TextInput",
  component: CTextInput,

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
    id: 'text-input',
    size: "md",
    color: "default",
    disabled: false,
    readOnly: false,
    transparent: false,
    placeholder: "",
    onEnter: undefined,
    onBlur: undefined,
  },
};
