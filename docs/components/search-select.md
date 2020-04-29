# Search Select

A Select that allows filtering of the options by a text input.

### Usage

<component-container>
  <c-search-select
    label="Search Select"
    :options="[
      { label: 'hello', value: 1 },
      { label: 'darkness', value: 2 },
      { label: 'my', value: 3 },
      { label: 'old', value: 4 },
      { label: 'friend', value: 5 },
    ]"
  />
</component-container>

``` html
<c-search-select
  v-model="selectedValue"
  label="Search Select"
  :options="[
    { label: 'hello', value: 1 },
    { label: 'darkness', value: 2 },
    { label: 'my', value: 3 },
    { label: 'old', value: 4 },
    { label: 'friend', value: 5 },
  ]"
/>
```

The component will filter the provided options by the search text provided in the text field. The search functionality can either be handled by this component (if the list of search items is not too long and can be known beforehand) or external to the component (as might be desired for a server-side search functionality, or if more control is desired over the behavior of the search). The `externalFilter` prop toggles this behavior.

When `externalFilter` is false (the default behavior), the component will perform a case-insensitive search of all of the "label" fields of the provided options. When `externalFilter` is true, the component will not perform any filtering of the provided options. It will instead emit a `search` event, with the payload being the search text. The search text can then be used to filter the list of options and update the `options` prop.

### Props

| Name        | Type    | Default             | Description                           |
| ----------- | ------- | ------------------- | ------------------------------------- |
| value       | String, Number | ""           | The value of the input.               |
| options     | Array   | [] | An array of objects. Each object must have a "label" and "value" property. |
| placeholder | String  | "Please select one" | Input placeholder                     |
| label       | String  | null                | Adds a text label to left of input.   |
| external-filter | Boolean | false | Toggle the external/internal filter behavior | 
| icon        | String  | "chevron-down"      | Name for the icon shown at right      |
| disabled    | Boolean | false               |                                       |

### Events

| Name         | Description                    |
| ------------ | ------------------------------ |
| input        | Emitted on every value change. |
| search       | If `external-filter` is true, emitted on search text input. |