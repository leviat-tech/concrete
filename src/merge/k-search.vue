<style scoped lang="scss">
  @import '@/assets/styles/variables.scss';

  $height: 2.25rem;
  $width: $height;
  $expanded: 15rem;
  $radius: .25rem;

  .slide-enter {
    width: $width;
  }
  .slide-enter-to {
    width: $expanded;
  }
  .slide-enter-active {
    transition: width .25s;
  }

  @mixin button {
    z-index: 99;
    height: $height;
    width: $width;
    border-radius: $radius;
  }

  .k-search {
    position: relative;
    z-index: 99;
  }

  /deep/ .concrete-input {
    border-radius: $radius;
    padding: 0px 10px;
    box-shadow: none !important;
    color: $color-gray-08;
    input {
      margin-right: $width / 2; // space for close button
    }
  }

  .search-button {
    @include button;
    margin-left: $expanded - $width;
    background: white;
    cursor: pointer;
    color: $color-gray-08;
    &:hover {
      color: $primary !important;
      background: $color-gray-02;
    }
  }

  .search-input {
    position: relative;
    @include button;
    width: $expanded;
  }

  .search-close {
    @include button;
    cursor: pointer;
    color: $color-gray-08;
    &:hover {
      color: $primary !important;
    }
    background: none;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .search-results {
    position: absolute;
    right: 0px;
    top: 3rem;
    width: $expanded;
    border-radius: $radius;
    background: $color-gray-01;
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.01);

    /deep/ .highlight {
      color: $primary;
    }

    .result {
      padding: 7px 14px;
      cursor: pointer;
      &:first-child {
          border-radius: $radius $radius 0rem 0rem;
      }
      &:last-child {
          border-radius: 0rem 0rem $radius $radius;
      }
      &:hover {
        background: $color-gray-03;
      }
      &.selected {
        background: $color-gray-04;
      }
    }
  }
</style>


<template>
  <div class="k-search">

    <div class="h-box flex-limit justify-end">

      <!-- search button -->
      <div v-show="!showing" class="search-button c-box flex-limit" @click="open">
        <k-icon class="magnify" icon="far-search"/>
      </div>

      <!-- search input -->
      <div v-show="showing" class="search-input h-box flex-limit items-center justify-end">

        <!-- close button -->
        <div class="search-close c-box flex-limit"  @click="close">
          <k-icon class="times" icon="far-times"/>
        </div>

        <!-- input -->
        <transition name="slide">
          <c-text-input
            ref="search"
            v-show="showing"
            :value='value'
            @change-value="$emit('input', $event);"
            @keydown.native.up="up"
            @keydown.native.down="down"
            @keydown.native.enter="select(selected)"
            @keydown.native.escape="close"/>
        </transition>

      </div>

      <!-- search results -->
      <div v-show="showing" class="search-results">
        <div
          class="result"
          :class="{selected: result.key == selected.key}"
          v-for="result in results"
          :key="result.key"
          @click="select(result)"
          v-html="highlight(result.name)">
        </div>
      </div>
    </div>


  </div>
</template>


<script>
export default {
  name: 'k-search',
  props: ['value', 'results'], // results = [{key, value}...]
  data() {
    return {
      showing: false,
      index: 0,
    };
  },
  computed: {
    selected() {
      if (this.results.length) {
        return this.results[this.index];
      }
      return null;
    },
  },
  watch: {
    results() {
      this.index %= this.results.length;
      this.index = this.index || 0;
    },
  },
  methods: {
    open() {
      const input = this.$refs.search.$el.getElementsByTagName('input')[0];
      this.showing = true;
      this.$nextTick(() => {
        input.focus();
        input.select();
      });
    },
    close() {
      this.showing = false;
    },
    up() {
      this.index = (this.results.length + this.index - 1) % this.results.length;
    },
    down() {
      this.index = (this.index + 1) % this.results.length;
    },
    select(result) {
      if (result) {
        this.$emit('select', result);
        this.close();
      }
    },
    highlight(value) {
      return value.replace(this.value, (match) => `<span class="highlight">${match}</span>`);
    },
  },
};
</script>
