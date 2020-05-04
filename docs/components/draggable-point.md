# Draggable Point

A utility for inserting draggable points into drawings.

### Usage

<component-container>
  <draggable-point-demo />
</component-container>

``` html
<svg
  class="svg"
  viewBox="0 0 100 100"
>
  <c-draggable-point
    :point="point"
    :scale="0.5"
    @dragging="setPoint"
    @drag-end="setPoint"
  />
</svg>
```
``` js
export default {
  data() {
    return {
      point: { x: 50, y: 50 },
    };
  },
  methods: {
    setPoint(pt) {
      this.point = pt;
    }
  }
}
```