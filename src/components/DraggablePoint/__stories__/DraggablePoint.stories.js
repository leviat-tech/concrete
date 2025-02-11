import CDraggablePoint from "../DraggablePoint.vue";

const componentTemplate = (args) => ({
  components: { CDraggablePoint },
  setup() {
    return { args };
  },
  data() {
    return {
      point: { x: 50, y: 50 },
    };
  },
  methods: {},
  template: `<svg class="bg-base-200" viewBox="0 0 100 100" width="200" height="200">
  <CDraggablePoint
    :point="point"
    @dragging="(pt) => point = pt"
    @drag-end="(pt) => point = pt"
    v-bind="args"
  />
</svg>`,
});

export default {
  title: "Components/High level/DraggablePoint",
  component: CDraggablePoint,

  argTypes: {
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
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
