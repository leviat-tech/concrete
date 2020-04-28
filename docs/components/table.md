# Table

A component that accepts structured data, and then displays it in table format. It allows the columns to be defined as slots. The table is sortable by columns.

### Usage

<component-container>
  <table-demo
    :data="[
      { name: 'Wendy', quantity: 3, animal: 'cat' },
      { name: 'Roger', quantity: 2, animal: 'pigeon' },
      { name: 'Angie', quantity: 4, animal: 'mink' },
    ]"
    :columns="[
      { prop: 'name', label: 'Name' },
      { prop: 'quantity', label: 'Quantity' },
      { prop: 'animal', label: 'Animal' },
    ]"
  />
</component-container>

``` html
<c-table
  :data="[
    { name: 'Wendy', quantity: 3, animal: 'cat' },
    { name: 'Roger', quantity: 2, animal: 'pigeon' },
    { name: 'Angie', quantity: 4, animal: 'mink' },
  ]"
>
  <c-column
    prop="name"
    label="Name"
  />
  <c-column
    prop="quantity"
    label="Quantity"
  />
  <c-column
    prop="animal"
    label="Animal"
  />
</c-table>
```

If the `external-sort` prop is set to true, the component itself will not sort the data. Instead, it will emit a `@sort` event, with the payload being the column and sort direction. This is useful if the sorting is intended to be done server-side (if, e.g., the dataset is very large, or if it is being paged server-side).

### Props

`<c-table>`:

| Name          | Type    | Default             | Description                 |
| ------------- | --------| ------------------- | --------------------------------- |
| data          | Array   | [] | The data, formatted as an array of objects. |
| empty-text    | String  | "No data available" | Text to be displayed when no data is passed to the table. |
| initial-sort  | Object  | { direction: "asc", prop: null } | The initial sort state of the table. |
| sortable      | Boolean | true | Toggle whether the table can sort. |
| external-sort | Boolean | false | Toggle whether sorting will happen external to the table. |

`<c-column>`:

| Name          | Type    | Default             | Description                 |
| ------------- | --------| ------------------- | --------------------------------- |
| label         | String  | '' | The display label of the column |
| prop          | String  | null | The property to pick out of the data object |
| sortProp      | String  | null | If present, allows the column to be sorted by a different property than the displayed `prop`. Useful in cases like dates, where the human-readable date format will not sort correctly. |
| sortable | Boolean | true | A flag that allows sorting to be turned off/on per-column |

### Events

`<c-table>`:

| Name       | Description                    |
| ---------- | ------------------------------ |
| click  | Emitted when a table cell is clicked. Payload is an object representing the row and cell data. |
| sort | Emitted when a table header is clicked (if the `external-sort` prop is true). Payload contains sort column and direction |
