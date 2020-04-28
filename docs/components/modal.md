# Modal

A component for displaying modal information.

### Simple Modal

<component-container>
  <modal-demo button-text="Click for Simple Modal" type="simple" />
</component-container>

``` html
<c-button @click="showModal = true">
  Click for Simple Modal
</c-button>

<c-modal
  v-if="showModal"
  @close="showModal = false"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et <span class="red-text">dolore magna
    aliqua</span>.
  </p>

  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    ut aliquip ex ea commodo consequat.
  </p>
</c-modal>
```

### Modal with Title

<component-container>
  <modal-demo button-text="Click for Modal with Title" type="title" />
</component-container>

``` html
<c-button @click="showModal = true">
  Click for Modal with Title
</c-button>

<c-modal
  v-if="showModal"
  title="Modal Title"
  @close="showModal = false"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et <span class="red-text">dolore magna
    aliqua</span>.
  </p>

  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    ut aliquip ex ea commodo consequat.
  </p>
</c-modal>
```

### Modal without "Close" Button

<component-container>
  <modal-demo button-text="Text-only Modal" type="text-only" />
</component-container>

``` html
<c-button @click="showModal = true">
  Click for Simple Modal
</c-button>

<c-modal
  v-if="showModal"
  :closeable="false"
  @close="showModal = false"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et <span class="red-text">dolore magna
    aliqua</span>.
  </p>

  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    ut aliquip ex ea commodo consequat.
  </p>
</c-modal>
```

### Props

| Name        | Type    | Default             | Description                      |
| ----------- | ------- | -------------- | ------------------------------------- |
| title       | String | null           | The modal's title                |
| closeable   | Boolean | true | Toggle the presence of the "close" button |

### Events

| Name         | Description                    |
| ------------ | ------------------------------ |
| close        | Emitted when the modal has received a "close" request |