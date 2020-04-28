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

### Props

| Name        | Type    | Default             | Description                           |
| ----------- | ------- | ------------------- | ------------------------------------- |
| value       | Array   | []           | An array of all selected values.             |
| options     | Array   | [] | An array of objects. Each object must have a "label" and "value" property. |
| placeholder | String  | "Select options" | Input placeholder                     |
| label       | String  | null                | Adds a text label to left of input.   |
| icon        | String  | "chevron-down"      | Name for the icon shown at right      |
| disabled    | Boolean | false               |                                       |

### Events

| Name         | Description                    |
| ------------ | ------------------------------ |
| input        | Emitted on every value change. |