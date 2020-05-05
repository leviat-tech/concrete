# 2D SVG Viewport

A set of composable functions for building a 2D SVG viewport.

### Usage

<svg-2d-demo />

```html
<div class="concrete-svg-viewport-container concrete">
  <svg
    ref="svg"
    class="concrete-svg concrete"
    :viewBox="fit.viewBox"
  >
    <polygon :points="state.polygon" />
    <c-draggable-point
      v-for="(point, index) in state.points"
      :key="index"
      :point="point"
      :scale="fit.scale"
      @dragging="setPoint(index, $event)"
      @drag-end="dragEnd(index, $event)"
    />
  </svg>
</div>
```
```js
import { ref, reactive, computed } from '@vue/composition-api';
import {
  svg2dViewportProps,
  useSvg2d,
  useSvg2dFit,
} from '@crhio/concrete';


export default {
  name: 'PlanDemo',
  props: {
    ...svg2dViewportProps,
    initialPoints: { type: Array, default: () => [] },
  },
  setup(props, context) {
    const svg = ref(null);
    const { dwg } = useSvg2d(svg, props, context);
    const { fit } = useSvg2dFit(svg, dwg, context);

    const state = reactive({
      points: props.initialPoints,
      polygon: computed(() => state.points.map(({ x, y }) => `${x},${y}`).join(' ')),
    });

    function setPoint(index, pt) {
      state.points.splice(index, 1, pt);
    }

    function dragEnd(index, pt) {
      state.points.splice(index, 1, pt);
      fit.animateFit();
    }

    return {
      svg, dwg, fit, state, setPoint, dragEnd,
    };
  },
};
```