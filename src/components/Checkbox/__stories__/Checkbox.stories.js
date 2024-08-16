import CCheckbox from "../Checkbox.vue";

const componentTemplate = (args) => ({
  components: { CCheckbox },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template: '<CCheckbox v-bind="args" v-model="value"></CCheckbox>',
});

export default {
  title: "Components/Input/Checkbox",
  component: CCheckbox,

  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],

      control: {
        type: "select",
      },
    },

    srLabel: {
      control: "text",
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    id: "checktest",
    size: "md",
    srLabel: "Checkbox",
    onChange: undefined,
    disabled: false,
  },
};
