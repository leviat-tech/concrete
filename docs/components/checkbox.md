# Checkbox

Checkbox input.

### Usage

<component-container>
  <c-checkbox label="Checkbox" />
</component-container>

``` html
<c-checkbox
  label="Checkbox"
  v-model="booleanProperty"
/>
```

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| label       | String  | null            | Adds a text label to left of input.       |
| disabled    | Boolean | false           |                                           |

### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on value change. The payload is the new value. |
| change-value | Identical to 'input' event.  |