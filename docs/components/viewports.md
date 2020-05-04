# Viewports

A container for sketch viewports

### Usage

<component-container>
  <viewport-demo />
</component-container>

``` html
<c-viewport>
  <c-svg-2d-viewport
    key="rectangle"
    viewport-id="rectangle"
    name="Rectangle"
    :fit-margin="3"
  >
    <rect width="300" height="100" />
  </c-svg-2d-viewport>
  <c-svg-2d-viewport
    key="circle"
    viewport-id="circle"
    name="Circle"
    :fit-margin="3"
  >
    <circle r="100" draggable />
  </c-svg-2d-viewport>
</c-viewport>
```