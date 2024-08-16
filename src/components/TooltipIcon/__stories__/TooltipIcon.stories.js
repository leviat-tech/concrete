import CTooltipIcon from "../TooltipIcon.vue";

const componentTemplate = (args) => ({
  components: { CTooltipIcon },
  setup() {
    return { args };
  },
  data() {
    return {
      toopltip: "Example of a tooltip",
    };
  },
  template: '<CTooltipIcon v-bind="args" v-tooltip="tooltip"></CTooltipIcon>',
});

export default {
  title: "Components/Low Level/Tooltip Icon",
  component: CTooltipIcon,

  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl", "2xl", "3xl"],

      control: {
        type: "select",
      },
    },
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",

  args: {
    size: "md",
  },
};
