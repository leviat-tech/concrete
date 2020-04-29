# Select

A custom select component, allowing images in the selector and items, as well as categorization/sorting of the options.

### Usage

<component-container>
  <c-select
    label="Select"
    show-image
    :options="[
      { section: 'Screws', image: '/images/socket-head-screw.png', label: 'Socket Head Screw', value: 1 },
      { section: 'Screws', image: '/images/flat-head-screw.png', label: 'Flat Head Screw', value: 2 },
      { section: 'Screws', image: '/images/hex-head-screw.png', label: 'Hex Head Screw', value: 3 },
      { section: 'Screws', image: '/images/round-head-screw.png', label: 'Round Head Screw', value: 4 }
    ]"
  />
</component-container>

``` html
<c-select
  label="Select"
  show-image
  :options="[
    { section: 'Screws', image: '/images/socket-head-screw.png', label: 'Socket Head Screw', value: 1 },
    { section: 'Screws', image: '/images/flat-head-screw.png', label: 'Flat Head Screw', value: 2 },
    { section: 'Screws', image: '/images/hex-head-screw.png', label: 'Hex Head Screw', value: 3 },
    { section: 'Screws', image: '/images/round-head-screw.png', label: 'Round Head Screw', value: 4 }
  ]"
  v-model="selectValue"
/>
```

### Props

| Name        | Type    | Default             | Description                           |
| ----------- | --------| ------------------- | ------------------------------------- |
| value       | String, Number | ''           | The value of the input.               |
| options     | Array   | [] | An array of objects. Each object must have a 'label' and 'value' property. When using images, the 'image' property should be present (a url of the image). When using sections, the 'section' property should be present. |
| placeholder | String  | 'Please select one' | Input placeholder                     |
| label       | String  | null                | Adds a text label to left of input.   |
| show-image  | Boolean | false | Toggle to display images next to the option label. |
| show-sections | Boolean | false | Toggle to display the "section" property of an option above that group of options |
| sort-sections | Boolean | false | Toggle to sort the options by section name | 
| icon        | String  | 'chevron-down'      | Name for the icon shown at right      |
| disabled    | Boolean | false               |                                       |

### Events

| Name         | Description                    |
| ------------ | ------------------------------ |
| input        | Emitted on every value change. |
| change-value | An alias for 'input'.          |