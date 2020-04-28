<template>
  <div class="container">
    <c-panel-slider title="Primary">
      <c-panel-section>
        Panels can consist of content and links to nested menus.
        <div>
          <c-panel-link link-to="a">Secondary menu</c-panel-link>
          <c-panel-link link-to="b">A different menu</c-panel-link>
        </div>
      </c-panel-section>
      <c-panel-section>
        By default, sections are divided by a gray border.
      </c-panel-section>
      <c-panel panel-id="a" title="Secondary">
        The panel title and "back" link update when a link is clicked.
        <c-panel-link link-to="x">Next menu</c-panel-link>
        <c-panel panel-id="x" title="Tertiary">
          The menus can be of arbitrary depth.
          <c-panel-link link-to="q">Last one</c-panel-link>
          <c-panel panel-id="q" title="Last one">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </c-panel>
        </c-panel>
      </c-panel>
      <c-panel panel-id="b" title="Another Panel">
        A different Secondary Panel
      </c-panel>
    </c-panel-slider>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../src/assets/styles/variables.scss';

.container {
  margin: 0 auto;
  width: 25rem;
  height: 25rem;
  border: $border-sm solid $color-gray-04;
}

</style>