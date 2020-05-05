# Native Select

A wrapper for the browser's native `<select>`, styled to match the other Concrete components.

### Usage

<component-container>
  <c-native-select
    label="Native Select"
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
<c-native-select
  label="Native Select"
  :options="[
    { label: 'hello', value: 1 },
    { label: 'darkness', value: 2 },
    { label: 'my', value: 3 },
    { label: 'old', value: 4 },
    { label: 'friend', value: 5 },
  ]"
  v-model="selectValue"
/>
```

### Size and theme variants

<component-container>
  <native-select-demo label="Size: xs" size="xs" />
  <native-select-demo label="Size: sm" size="sm" />
  <native-select-demo label="Size: base" size="base" />
  <native-select-demo label="Size: lg" size="lg" />
</component-container>

<component-container theme="dark">
  <native-select-demo label="Theme: dark" theme="dark" />
</component-container>

### Props
| Name        | Type    | Default             | Description                           |
| ----------- | --------| ------------------- | ------------------------------------- |
| value       | String  | ''                  | The value of the input.               |
| options     | Array   | [] | An array of objects. Each object must have a 'label' and 'value' property. |
| placeholder | String  | 'Please select one' | Input placeholder                     |
| label       | String  | null                | Adds a text label to left of input.   |
| size        | String  | 'base'              | xs/sm/base/lg                         |
| theme       | String  | 'light'             | light|dark                            |
| icon        | String  | 'chevron-down'      | Name for the icon shown at right      |
| disabled    | Boolean | false               |                                       |

### Events
| Name         | Description                    |
| ------------ | ------------------------------ |
| input        | Emitted on every value change. |
| change-value | An alias for 'input'.          |