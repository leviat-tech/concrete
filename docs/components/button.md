# Button

Simple button component. 

### Size Variants 

<component-container>
  <c-button size="lg">Large</c-button>
  <c-button size="md">Medium</c-button>
  <c-button size="sm">Small</c-button>
  <c-button size="xs">Extra Small</c-button>
</component-container>

``` html
<c-button size="lg">Large</c-button>
<c-button size="md">Medium</c-button>
<c-button size="sm">Small</c-button>
<c-button size="xs">Extra Small</c-button>
```

### Fill variants

<component-container>
  <c-button>Solid</c-button>
  <c-button fill="outline">Outline</c-button>
  <c-button fill="ghost">Ghost</c-button>
  <c-button disabled>Disabled</c-button>
</component-container>

``` html
<c-button>Solid</c-button>
<c-button fill="outline">Outline</c-button>
<c-button fill="ghost">Ghost</c-button>
<c-button disabled>Disabled</c-button>
```

### Color variants

<component-container>
  <c-button color="primary">Primary</c-button>
  <c-button color="danger">Danger</c-button>
</component-container>

``` html
<c-button color="primary">Primary</c-button>
<c-button color="danger">Danger</c-button>
```

### Icons
Icons (or any other content) can incorporated as well. In this case,
we are using the [`<c-icon>`](/components/icons.md) component.
<component-container>
  <c-button><c-icon type="plus" size="lg" /></c-button>
  <c-button><c-icon type="plus" /> Text with Icon</c-button>
</component-container>

``` html
<c-button><c-icon type="plus" size="lg" /></c-button>
<c-button><c-icon type="plus" /> Text with Icon</c-button>
```

### Progress
If a number between 0-100 is passed to the `progress` prop, the button will indicate the partial progress. The button will be disabled until progress is set to 0 or 100. Key props:
* `canceleable`: when true, a cancel button will be present while progress is incomplete which will emit a 'cancel' event. 
* `fake`: when true, will cause the progress bar to gradually fill (even when the progress value has not changed). This allows for a graphical representation of progress, even if true progress data is not available.

<component-container>
  <progress-button />
</component-container>

``` html
<c-button
  :play="true"
  :fake="true"
  :progress="progress"
  @click="start"
  @cancel="cancel"
>
  Click for Progress
</c-button>
```

### Props

| Name       | Type    | Default | Options               |
| ---------- | --------| ------- | --------------------- |
| size       | String  | sm      | lg, md, sm, xs        |
| color      | String  | primary | primary, danger       |
| fill       | String  | solid   | solid, outline, ghost |
| progress   | Number  | null    | 0 - 100               |
| play       | Boolean | false   | true/false            |
| cancelable | Boolean | true    | true/false            |
| disabled   | Boolean | false   | true/false            |

### Events

| Name       | Description                  |
| ---------- | ---------------------------- |
| click      | Emitted on button click      |
| cancel     | Emitted on click of "cancel" |
