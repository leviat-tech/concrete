import CHeading from "../CHeading.vue";

const componentTemplate = (args) => ({
  components: { CHeading,  },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template:
    '<CHeading v-bind="args"></CHeading>',
});

export default {
  title: "Components/Low level/Heading",
  component: CHeading,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {
    title: "Heading",
  },
};