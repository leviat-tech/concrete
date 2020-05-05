# Multi-select

A select component that allows multiple options to be selected at once.

### Usage

<component-container>
  <c-multi-select
    label="Multi Select"
    :options="[
      { label: 'hello', value: 1 },
      { label: 'darkness', value: 2 },
      { label: 'my', value: 3 },
      { label: 'old', value: 4 },
      { label: 'friend', value: 5 }
    ]"
  />
</component-container>

``` html
<c-multi-select
  v-model="selectedValues"
  label="Multi Select"
  :options="[
    { label: 'hello', value: 1 },
    { label: 'darkness', value: 2 },
    { label: 'my', value: 3 },
    { label: 'old', value: 4 },
    { label: 'friend', value: 5 }
  ]"
/>
```

### Size and theme variants

<component-container>
  <multi-select-demo label="Size: xs" size="xs" />
  <multi-select-demo label="Size: sm" size="sm" />
  <multi-select-demo label="Size: base" size="base" />
  <multi-select-demo label="Size: lg" size="lg" />
</component-container>

<component-container theme="dark">
  <multi-select-demo label="Theme: dark" theme="dark" />
</component-container>

### Props

| Name        | Type    | Default             | Description                           |
| ----------- | ------- | ------------------- | ------------------------------------- |
| value       | Array   | []           | An array of all selected values.             |
| options     | Array   | [] | An array of objects. Each object must have a "label" and "value" property. |
| placeholder | String  | "Select options" | Input placeholder                     |
| label       | String  | null                | Adds a text label to left of input.   |
| icon        | String  | "chevron-down"      | Name for the icon shown at right      |
| size        | String  | 'base'              | xs/sm/base/lg                         |
| theme       | String  | 'light'             | light/dark                            |
| disabled    | Boolean | false               |                                       |

### Events

| Name         | Description                    |
| ------------ | ------------------------------ |
| input        | Emitted on every value change. |