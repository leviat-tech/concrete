# Masonry

A component for allowing layouts of fix-width but variable-height cards. Is a modification of the [vue-masonry-css](https://github.com/paulcollett/vue-masonry-css) component, using `rem` rather than `px` units.

### Usage

<component-container>
  <masonry-demo />
</component-container>

``` html
<c-masonry :cols="3" gutter="1.5rem">
  <div class="card">Lorem ipsum dolor sit amet...</div>
  <div class="card">Ut enim ad minim veniam...</div>
  <div class="card">Duis aute irure dolor in...</div>
  <div class="card">Excepteur sint occaecat...</div>
</c-masonry>
```