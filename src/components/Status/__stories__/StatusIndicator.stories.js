import StatusIndicator from "../StatusIndicator.vue";
import StatusMessage from "../StatusMessage.vue";

const IndicatorTemplate = (args) => ({
  components: { StatusIndicator },
  setup() {
    return { args };
  },
  template: `<StatusIndicator v-bind="args" />`,
});

export default {
  title: "Components/High level/Status/StatusIndicator",
  component: StatusIndicator,
  argTypes: {
    status: {
      options: [null, "error", "warning", "success", "info"],
      control: { type: "select" },
    },
  }
};

export const Overview = {
  render: IndicatorTemplate.bind({}),
  name: "Overview",
};
