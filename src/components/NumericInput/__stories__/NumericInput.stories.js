import CNumericInput from "../NumericInput.vue";

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
    size: {
      options: ["lg", "md", "sm", "xs"],

      control: {
        type: "select",
      },
    },

    color: {
      options: [
        "default",
        "indigo",
        "sky",
        "steel",
        "success",
        "warning",
        "danger",
      ],

      control: {
        type: "select",
      },
    },

    disabled: {
      control: "boolean",
    },

    readOnly: {
      control: "boolean",
    },

    transparent: {
      control: "boolean",
    },

    placeholder: {
      control: "text",
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
    color: "default",
    onEnter: undefined,
    onBlur: undefined,
    disabled: false,
    readOnly: false,
    transparent: false,
    placeholder: "",
  },
};
