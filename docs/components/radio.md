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

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| options     | Array   | [] | An array of objects. Each object must have a 'label' and 'value' property. |
| label       | String  | null            | Adds a text label to left of input.       |
| disabled    | Boolean | false           |                                           |

### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on value change. The payload is the new value. |
| change-value | Identical to 'input' event.  |