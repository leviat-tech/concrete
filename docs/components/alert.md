# Alert

A temporary notification that can display a string of text, and will then disappear.

### Usage

The component adds a new method to the Vue instance, `$alert`, which accepts a string as an argument. This message will be temporarily shown as a notification at the top of the screen, then will disappear.

<component-container>
  <c-button @click="$alert('This is an alert message!')">Click for alertbox</c-button>
</component-container>

``` html
<c-button
  @click="$alert('This is an alert message!)"
>
  Click for alertbox
</c-button>
```