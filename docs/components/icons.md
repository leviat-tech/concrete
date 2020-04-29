# Icons

A small collection of icons. Many of these are repurposed from FontAwesome's icons, which are provided under their [Creative Commons](https://fontawesome.com/license) license. In those cases, the class attributes of the icons have been modified to work with the Concrete system.

### Usage

Icons accept the following attributes:
* `type`: the id of the icon
* `size`: the size of the icon. If not present, the icon will inherit the current font size.

Icons will also emit 'click' events when clicked.

<icon-grid />

``` html
<c-icon type="check" size="xl" />
```