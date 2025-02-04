import CStack from "../CStack.vue";

const componentTemplate = (args) => ({
  components: { CStack,  },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template:
    '<CStack v-bind="args"></CStack>',
});

export default {
  title: "Components/Low level/Stack",
  component: CStack,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};