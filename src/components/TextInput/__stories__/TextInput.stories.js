import CTextInput from "../TextInput.vue";

const componentTemplate = (args) => ({
  components: { CTextInput },
  setup() {
    return { args };
  },
  data: () => ({ value: "" }),
  template: '<CTextInput v-bind="args" id="text-input" v-model="value"/>',
});

export default {
  title: "Components/Input/TextInput",
  component: CTextInput,

  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],

      control: {
        type: "select",
      },

      table: {
        type: {
          summary: "string",
        },
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

      table: {
        type: {
          summary: "string",
        },
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

    prefix: {
      control: false,

      table: {
        type: {
          summary: "slot",
        },
      },
    },

    suffix: {
      control: false,

      table: {
        type: {
          summary: "slot",
        },
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
    disabled: false,
    readOnly: false,
    transparent: false,
    placeholder: "",
    onEnter: undefined,
    onBlur: undefined,
  },
};
