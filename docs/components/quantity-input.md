# Quantity Input

An input intended for numerical values.

### Usage

<component-container>
  <c-quantity-input
    label="Quantity Input"
    :precision="1"
    :value="0"
    units="m"
    :maximum="5"
    :minimum="0"
  />
</component-container>

``` html
<c-quantity-input
  label="Quantity Input"
  :precision="1"
  v-model="quantityValue"
  units="m"
  :maximum="5"
  :minimum="0"
/>
```

Like the [text input](/components/text-input.md) component, this component:
* May be used either with `v-model` or with independent `:value` and `@input` attributes.
* Emits `@input` on blur/keydown.enter, and `@change-value` on every text input event.

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | null            | The value of the input.                   |
| placeholder | String  | 'Enter a value' | Input placeholder                         |
| label       | String  | null            | Adds a text label to left of input.       |
| precision   | Number  | 1               | Used to control the incrementer. Also, some browsers warn if values are input that don't conform with the indicated precision. |
| units       | String  | null            | Displayed to the right of the input       |
| maximum     | Number  | null            | If present, will clamp any value that is greater than this value |
| minimum     | Number  | null            | If present, will clamp any value that is less than this value |
| disabled    | Boolean | false           |                                           |


### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on 'blur' or 'keydown.enter'. The payload is the new value |
| change-value | Emitted on every text input event.                               |