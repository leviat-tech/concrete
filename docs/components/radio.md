# Radio

Radio input.

### Usage

<component-container>
  <c-radio
    label="Radio input"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
</component-container>

``` html
<c-radio
  label="Radio input"
  v-model="radioProperty"
  :options="[
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]"
/>
```

### Size and theme variants

<component-container>
  <c-radio label="Size: xs" size="xs"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
  <c-radio label="Size: sm" size="sm"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
  <c-radio label="Size: base" size="base"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
  <c-radio label="Size: lg" size="lg"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
</component-container>

<component-container theme="dark">
  <c-radio
    label="Theme: dark"
    theme="dark"
    :options="[
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ]"
  />
</component-container>

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| options     | Array   | [] | An array of objects. Each object must have a 'label' and 'value' property. |
| label       | String  | null            | Adds a text label to left of input.       |
| size        | String  | 'base'              | xs/sm/base/lg                         |
| theme       | String  | 'light'             | light|dark                            |
| disabled    | Boolean | false           |                                           |

### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on value change. The payload is the new value. |
| change-value | Identical to 'input' event.  |