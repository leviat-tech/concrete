# Tabs

A component that provides a container for tabbed panels. Uses slots to provide maximum flexibility for the shape of the tab headers and content.

### Usage

Three components are provided to construct tabbed panels:
* `<c-tab-switcher>`: The main container element
* `<c-tab-label>`: A label for the tab button. Must be contained within the named `labels` slot.
* `<c-tab>`: A container element for the contents of the panel. Must be contained within the named `content` slot.
The `<c-tab-label>` and `<c-tab>` elements should be the the only elements that are contained within these named slots. It is required that they be in the same order and of the same quantity in order for the component to work properly.

<component-container>
  <tab-demo />
</component-container>

``` html
<c-tab-switcher>
  <template v-slot:labels>
    <c-tab-label>Tab Label 1</c-tab-label>
    <c-tab-label>Tab Label 2</c-tab-label>
  </template>
  <template v-slot:content>
    <c-tab class="tab-interior">
      <p>Tab content 1.</p>
      <p>
        Lorem ipsum dolor sit amet...
      </p>
    </c-tab>
    <c-tab class="tab-interior">
      <p>Tab content 2</p>
      <p>
        Sed ut perspiciatis unde omnis...
      </p>
    </c-tab>
  </template>
</c-tab-switcher>
```

The tab panel will fill the dimensions of its containing element; it depends on having a container element that will define those dimensions. It also does not apply borders to its outer edges--this would also be done by the component's container.

Additionally, we are using the "tab-interior" class in this example to apply padding to the tab content--the default behavior is for there to be no padding within the content component.

### Props

| Name          | Type    | Default             | Description                 |
| ------------- | --------| ------------------- | --------------------------- |
| tab-position  | String  | "top" | The tabs can be located either at the "top" or "bottom" of the panel. |