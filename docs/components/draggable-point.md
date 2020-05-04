# Draggable Point

A utility for inserting draggable points into drawings.

### Usage

``` html
<c-draggable-point
  :point="{ x: 5, y: 10 }"
  :scale="1"
  @dragging="setPoint(index, $event)"
  @drag-end="dragEnd(index, $event)"
/>
```