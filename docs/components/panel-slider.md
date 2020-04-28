# Panel Slider

A component that allows nested menuing, organized as slots.

### Usage

Four components are provided to construct the sliding panel:
* `<c-panel-slider>`: The main container element
* `<c-panel-link>`: The "link" component that allows drilling down to a nested menu
* `<c-panel>`: The contents of the panel that correspond to a given `<c-panel-link>`.
* `<c-panel-section>`: An optional component for dividing groups of content into sections.

<component-container>
  <slider-demo />
</component-container>

``` html
<c-panel-slider title="Primary">
  <c-panel-section>
    Lorem ipsum dolor sit amet, consectetur...
    <c-panel-link link-to="a">Drill Down</c-panel-link>
    <c-panel-link link-to="b">A different menu</c-panel-link>
  </c-panel-section>
  <c-panel-section>
    Ut enim ad minim veniam, quis nostrud...
  </c-panel-section>
  <c-panel panel-id="a" title="Secondary">
    Excepteur sint occaecat cupidatat non proident.
    <c-panel-link link-to="x">Drill more?</c-panel-link>
    <c-panel panel-id="x" title="Tertiary">
      Sunt in culpa qui officia deserunt mollit...
      <c-panel-link link-to="q">Last one</c-panel-link>
      <c-panel panel-id="q" title="Last one">
        Sed ut perspiciatis unde omnis iste natus...
      </c-panel>
    </c-panel>
  </c-panel>
  <c-panel panel-id="b" title="Another?">
    A different Secondary Panel
  </c-panel>
</c-panel-slider>
```

The tab panel will fill the dimensions of its containing element; it depends on having a container element that will define those dimensions. It also does not apply borders to its outer edges--this would also be done by the component's container.

### Props

`<c-panel-slider>`:

| Name   | Type    | Default             | Description                 |
| ------ | --------| ------------------- | --------------------------- |
| title  | String  | "" | The title of the root panel component.       |

`<c-panel-link>`:

| Name     | Type    | Default  | Description                         |
| -------- | --------| -------- | ----------------------------------- |
| link-to  | String  | required | The id of the panel to be linked to |

`<c-panel`>:

| Name     | Type    | Default  | Description                    |
| -------- | --------| -------- | ------------------------------ |
| panel-id | String  | required | The id of the panel            |
| title    | String  | ""       | The display title of the panel |
