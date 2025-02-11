import { CViewportContainer, CViewport, CViewportTools } from "..";

const componentTemplate = (args) => ({
  components: { CViewport, CViewportContainer, CViewportTools },
  setup() {
    return { args };
  },
  data() {
    return {
      extents: {
        type: Object,
        default: () => ({
          xmin: 0,
          ymin: 0,
          xmax: 400,
          ymax: 400,
        }),
      },
      currentTool: "select",
      value: { x: 50, y: 50 },
      viewport: "default",
    };
  },
  methods: {},
  template: `<CViewportContainer :options="['test3', 'test4']">
    <CViewport viewportId="test" modelValue="test">
      <div class="bg-magic-800 w-12 h-12 text-sky-lightest">Test</div>
    </CViewport>
    <CViewport viewportId="test2" modelValue="test2">
      <div class="bg-sky w-12 h-12 text-magic-950">Test</div>
    </CViewport>
  </CViewportContainer>`,
});

export default {
  title: "Components/High level/Viewport",
  component: CViewport,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
