# Textarea

Textarea input.

### Usage

<component-container>
  <c-textarea label="Textarea" :rows="6" />
</component-container>

``` html
<c-textarea
  label="Textarea"
  :rows="6"
  v-model="textProperty"
/>
```

Like the [text input](/components/text-input.md) component, this component:
* May be used either with `v-model` or with independent `:value` and `@input` attributes.
* Emits `@input` on blur/keydown.enter, and `@change-value` on every text input event.

### Props

| Name        | Type    | Default         | Description                               |
| ----------- | --------| --------------- | ----------------------------------------- |
| value       | String  | ''              | The value of the input.                   |
| placeholder | String  | 'Enter a value' | Input placeholder                         |
| label       | String  | null            | Adds a text label to left of input.       |
| rows        | Number  | 10              | The number of rows in the textarea.       |
| disabled    | Boolean | false           |                                           |
| read-only   | Boolean | false           | Used when input is for text display only. |


### Events

| Name       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| input      | Emitted on 'blur' or 'keydown.enter'. The payload is the new value. |
| change-value | Emitted on every text input event. The payload is the new value.  |