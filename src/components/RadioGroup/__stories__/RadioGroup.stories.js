import CRadioGroup from "../RadioGroup.vue";

const componentTemplate = (args) => ({
  components: { CRadioGroup },
  setup() {
    return { args };
  },
  data() {
    return {
      value: null,
    };
  },
  template:
    '<CRadioGroup id="RadioGroup" v-bind="args" v-model="value"></CRadioGroup>',
});

export default {
  title: "Components/Input/RadioGroup",
  component: CRadioGroup,

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
        "info",
        "magic",
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

    columns: {
      control: "number",
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  height: "200px",

  args: {
    id: "RadioGroup",
    options: ["Pugh", "Barney", "McGrew", "Cuthbert", "Diddle", "Gruff"],
    onChange: null,
    colour: "sky",
    formatter: (l) => l.toUpperCase(),
  },
};
