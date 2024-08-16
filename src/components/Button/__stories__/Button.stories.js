import CButton from "../Button.vue";

const componentTemplate = (args) => ({
  components: { CButton },
  setup() {
    return { args };
  },
  template: '<CButton v-bind="args">{{args.content}}</CButton>',
});

export default {
  title: "Components/Input/Button",
  component: CButton,

  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],

      control: {
        type: "select",
      },
    },

    color: {
      options: ["indigo", "sky", "steel", "success", "warning", "danger"],

      control: {
        type: "select",
      },
    },

    fill: {
      options: ["solid", "outline", "ghost"],

      control: {
        type: "select",
      },
    },

    disabled: {
      control: "boolean",
    },

    active: {
      control: "boolean",
    },

    customPadding: {
      control: "boolean",
    },

    spinner: {
      control: "object",
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    content: "Button",
    size: "md",
    color: "indigo",
    fill: "solid",
    disabled: false,
    active: false,
    customPadding: false,
  },
};
