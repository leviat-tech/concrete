# Text Input

Basic text input.

### Usage

<component-container>
  <c-text-input label="Text Input" />
</component-container>

``` html
<c-text-input
  placeholder="Enter a Value"
  label="Text Input"
  v-model="textProperty"
/>
```

The component may be used with `v-model`, as shown above; alternatively, you may bind the `:value` property and handle an `@input` (or `@update`, which is synonomous) event.

When using `:value` and `@input` independently, the value in the parent component will not be mutated; it is incumbent on the parent component to update the value, if that is the desired behavior. The input will watch for any changes in `:value`, and will upddate the component's local value in the event that it does change.

The component _does not_ emit `@input` on every "input" event from the underlying native text field. Rather, it emits the `@input` on "blur" or "keydown.enter". This is by design: in many cases, changes in this text field are tied to server-side requests. In those cases, it would be undesirable for the request to happen on every keystroke. If it is desired to receive updates on every keystroke (e.g., if client-side validation should be happening as the user types), the `@change-value` event can be used.

### Size and Theme variants

<component-container>
  <c-text-input
    label="Size: xs"
    size="xs"
  />
  <c-text-input
    label="Size: sm"
    size="sm"
  />
  <c-text-input
    label="Size: base"
    size="base"
  />
  <c-text-input
    label="Size: lg"
    size="lg"
  />
</component-container>

<component-container theme="dark">
  <c-text-input
    label="Theme: dark"
    theme="dark"
  />
</component-container>

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| placeholder | String  | 'Enter a value' | Input placeholder                         |
| label       | String  | null            | Adds a text label to left of input.       |
| size        | String  | 'base'          | xs/sm/base/lg                             |
| theme       | String  | 'light'         | light/dark                                |
| disabled    | Boolean | false           |                                           |
| read-only   | Boolean | false           | Used when input is for text display only. |


### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on 'blur' or 'keydown.enter'. The payload is the new value |
| change-value | Emitted on every text input event.                               |