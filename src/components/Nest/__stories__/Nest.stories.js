import CNest from "../CNest.vue";

const componentTemplate = (args) => ({
  components: { CNest,  },
  setup() {
    return { args };
  },
  data() {
    return { value: true };
  },
  template:
    '<CNest v-bind="args"></CNest>',
});

export default {
  title: "Components/Low level/Nest",
  component: CNest,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};