import CDraggablePath from "../DraggablePath.vue";

const componentTemplate = (args) => ({
  components: { CDraggablePath },
  setup() {
    return { args };
  },
  data() {
    return {
      points: [
        { x: 10, y: 10 },
        { x: 30, y: 30 },
        { x: 10, y: 50 },
      ],
      offset: {},
    };
  },
  computed: {
    path() {
      return this.points
        .map((pt, i) => (i === 0 ? `M${pt.x} ${pt.y} ` : `L${pt.x} ${pt.y} `))
        .join();
    },
  },
  methods: {},
  template: `<svg class="bg-gray-200" viewBox="0 0 100 100" width="200" height="200">
  <CDraggablePath
    :path="path"
    @drag-start="(pt) => offset = pt"
    @dragging="(pt) => {
      const x = offset.x - pt.x;
      const y = offset.y - pt.y;
      points.forEach((point) => {
        point.x -= x;
        point.y -= y;
      });
      offset = pt;
    }"
    @drag-end="() => offset = {}"
    v-bind="args"
  />
</svg>`,
});

export default {
  title: "Components/High level/DraggablePath",
  component: CDraggablePath,

  argTypes: {
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
  },
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
