<template>
  <div class="container">
    <c-tab-switcher>
      <template v-slot:labels>
        <c-tab-label>Tab Label 1</c-tab-label>
        <c-tab-label>Tab Label 2</c-tab-label>
      </template>
      <template v-slot:content>
        <c-tab class="tab-interior">
          <p>Tab content 1.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </c-tab>
        <c-tab class="tab-interior">
          <p>Tab content 2</p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p>
            Neque
            porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
            et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
            quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
            qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
            qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
        </c-tab>
      </template>
    </c-tab-switcher>
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

.tab-interior {
  padding: 1rem;
  text-align: left;

  p {
    line-height: 1.3;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
}
</style>