import CButtonGroup from "../ButtonGroup.vue";

const componentTemplate = (args) => ({
  components: { CButtonGroup },
  setup() {
    return { args };
  },
  data() {
    return {
      value: null,
    };
  },
  template:
    '<CButtonGroup id="ButtonGroup" v-bind="args" v-model="value"></CButtonGroup>',
});

export default {
  title: "Components/Input/ButtonGroup",
  component: CButtonGroup,

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
    id: "ButtonGroup",
    options: ["Pugh", "Barney", "McGrew", "Cuthbert", "Diddle", "Gruff"],
    onChange: null,
    colour: "sky",
    formatter: (l) => l.toUpperCase(),
  },
};
