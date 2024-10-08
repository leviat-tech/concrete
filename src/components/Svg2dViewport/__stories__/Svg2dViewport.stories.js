import CSvg2dViewport from "../Svg2dViewport.vue";
import { CViewportContainer } from "../../Viewport";

const componentTemplate = (args) => ({
  components: { CSvg2dViewport, CViewportContainer },
  setup() {
    return { args };
  },
  data() {
    return {
      extents: {
        xmin: 0,
        ymin: 0,
        xmax: 100,
        ymax: 100,
      },
      currentTool: "select",
      value: { x: 50, y: 50 },
      viewport: "default",
    };
  },
  methods: {},
  template: `
    <CViewportContainer>
      <CSvg2dViewport :extents="extents" :currentTool="currentTool" :value="value">
        <circle r="20" :cx="value.x" :cy="value.y"/>
      </CSvg2dViewport>
    </CViewportContainer>`,
});

export default {
  title: "Components/High level/Svg2dViewport",
  component: CSvg2dViewport,
};

export const Overview = {
  render: componentTemplate.bind({}),
  name: "Overview",
  args: {},
};
