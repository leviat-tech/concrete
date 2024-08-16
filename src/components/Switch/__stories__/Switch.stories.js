import CSwitch from "../Switch.vue";

const componentTemplate = (args) => ({
  components: { CSwitch },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template: '<CSwitch v-bind="args" v-model="value"></CSwitch>',
});

export default {
  title: "Components/Input/Switch",
  component: CSwitch,

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

    displayIcons: {
      control: "boolean",
    },

    srLabel: {
      control: "text",
    },

    onChange: {
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
    color: "indigo",
    displayIcons: false,
    srLabel: "Switch",
  },
};
