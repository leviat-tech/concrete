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

### Size and theme variants

<component-container>
  <c-checkbox label="Size: xs" size="xs" />
  <c-checkbox label="Size: sm" size="sm" />
  <c-checkbox label="Size: base" size="base" />
  <c-checkbox label="Size: lg" size="lg" />
</component-container>

<component-container theme="dark">
  <c-checkbox label="Theme: dark" theme="dark" />
</component-container>

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| label       | String  | null            | Adds a text label to left of input.       |
| size        | String  | 'base'              | xs/sm/base/lg                         |
| theme       | String  | 'light'             | light|dark                            |
| disabled    | Boolean | false           |                                           |

### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on value change. The payload is the new value. |
| change-value | Identical to 'input' event.  |