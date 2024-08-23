import CTextArea from "../TextArea.vue";
import { formElementProps } from '../../../storybook/argTypes';

const componentTemplate = (args) => ({
  components: { CTextArea },
  setup() {
    return { args };
  },
  data: () => ({ value: "" }),
  template: '<CTextArea v-bind="args" id="text-area" v-model="value"/>',
});

export default {
  title: "Components/Input/TextArea",
  component: CTextArea,

  argTypes: {
    ...formElementProps,

    rows: {
      control: "range",
    },

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
    rows: 6,
    color: "default",
    disabled: false,
    readOnly: false,
    transparent: false,
    placeholder: "",
    onEnter: undefined,
    onBlur: undefined,
  },
};
