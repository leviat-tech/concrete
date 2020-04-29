# Toolbar

An component for building toolbars.

### Usage

<component-container>
  <toolbar-demo />
</component-container>

``` html
<c-toolbar default-tool="select">
  <c-tool-group>
    <c-tool name="Undo" tool-id="undo" icon="undo" />
    <c-tool name="Redo" tool-id="redo" icon="redo" />
  </c-tool-group>
  <c-tool-group>
    <c-tool name="Select" tool-id="select" icon="pointer-outline" />
    <c-tool name="Pan" tool-id="pan" icon="hand" />
    <c-tool name="Pen" tool-id="pen" icon="pen" />
  </c-tool-group>
  <c-tool-group>
    <c-tool name="Run" tool-id="play" icon="play" />
    <c-tool name="Pause" tool-id="pause" icon="pause" />
  </c-tool-group>
</c-toolbar>
```

### Props

`<c-toolbar>`:

| Name   | Type    | Default             | Description                 |
| ------ | --------| ------------------- | --------------------------- |
| value  | String  | null | The id of the currently selected tool |
| show-tool-names | Boolean | false | Display the tool names below the tool icon. When this is false, a tooltip will appear indicating the tool name on hover. |

`<c-tool>`:

| Name    | Type    | Default             | Description                 |
| ------- | --------| ------------------- | --------------------------- |
| tool-id | String  | required            | id of the tool |
| name    | String  | "" | Display name of the tool. |
| icon    | string  | null | If provided, will select the icon from the [icon list](/components/icons.md). If not provided, an image of the tool should be provided in the slot content. |