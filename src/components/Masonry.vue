<script>

// Vue-masonry-css: https://github.com/paulcollett/vue-masonry-css

const props = {
  tag: { type: String, default: 'div' },
  cols: { type: [Number, Object, String], default: 2 },
  gutter: { type: [Number, Object, String], default: 0 },
  columnTag: { type: String, default: 'div' },
  columnClass: { type: [String, Array, Object], default: () => [] },
  columnAttr: { type: Object, default: () => ({}) },
};

// Get the resulting value from col and gutter props
// based on the window width
const breakpointValue = (mixed, windowWidth) => {
  const valueAsNum = parseInt(mixed, 10);

  if (valueAsNum > -1) {
    return mixed;
  }

  if (typeof mixed !== 'object') {
    return 0;
  }

  let matchedBp = Infinity;
  let matchedVal = mixed.default || 0;

  Object.entries(mixed).forEach(([k, value]) => {
    const bp = parseInt(k, 10);
    const bpVal = parseInt(value, 10);

    if (!Number.isNaN(bp) && !Number.isNaN(bpVal)) {
      if (windowWidth <= bp && bp < matchedBp) {
        matchedBp = bp;
        matchedVal = bpVal;
      }
    }
  });

  return matchedVal;
};

export default {
  name: 'CMasonry',
  props,

  data() {
    return {
      displayColumns: 2,
      displayGutter: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.reCalculate();
    });

    // Bind resize handler to page
    if (window) {
      window.addEventListener('resize', this.reCalculate);
    }
  },

  updated() {
    this.$nextTick(() => {
      this.reCalculate();
    });
  },

  beforeDestroy() {
    if (window) {
      window.removeEventListener('resize', this.reCalculate);
    }
  },

  methods: {
    // Recalculate how many columns to display based on window width
    // and the value of the passed `:cols=` prop
    reCalculate() {
      const previousWindowWidth = this.windowWidth;

      this.windowWidth = (window ? window.innerWidth : null) || Infinity;

      // Window resize events get triggered on page height
      // change which when loading the page can result in multiple
      // needless calculations. We prevent this here.
      if (previousWindowWidth === this.windowWidth) {
        return;
      }

      this.reCalculateCols();
      this.reCalculateGutter();
    },

    reCalculateGutter() {
      this.displayGutter = breakpointValue(this.gutter, this.windowWidth);
    },

    reCalculateCols() {
      let newColumns = breakpointValue(this.cols, this.windowWidth);

      // Make sure we can return a valid value
      newColumns = Math.max(1, Number(newColumns) || 0);

      this.displayColumns = newColumns;
    },

    getChildItemsInCols() {
      const columns = [];
      let childItems = this.$scopedSlots.default() || [];

      // This component does not work with a child <transition-group /> ..yet,
      // so for now we think it may be helpful to ignore until we can find a way for support
      if (childItems.length === 1 && childItems[0].componentOptions && childItems[0].componentOptions.tag === 'transition-group') {
        childItems = childItems[0].componentOptions.children;
      }

      // Loop through child elements
      for (let i = 0, visibleItemI = 0; i < childItems.length; i += 1, visibleItemI += 1) {
        // skip Vue elements without tags, which includes
        // whitespace elements and also plain text
        if (!childItems[i].tag) {
          visibleItemI -= 1;

          continue; //eslint-disable-line
        }

        // Get the column index the child item will end up in
        const columnIndex = visibleItemI % this.displayColumns;

        if (!columns[columnIndex]) {
          columns[columnIndex] = [];
        }

        columns[columnIndex].push(childItems[i]);
      }

      return columns;
    },
  },

  render(createElement) {
    const childColumns = this.getChildItemsInCols();
    const isGutterSizeUnitless = parseInt(this.displayGutter, 10) === this.displayGutter * 1;
    const gutterSize = isGutterSizeUnitless ? `${this.displayGutter}rem` : this.displayGutter;

    const columnStyle = {
      boxSizing: 'border-box',
      backgroundClip: 'padding-box',
      width: `${100 / this.displayColumns}%`,
      border: '0 solid transparent',
      borderLeftWidth: gutterSize,
    };

    // Create column element and inject the children
    const columns = childColumns.map((children, index) => createElement(this.columnTag, {
      key: `${index}-${childColumns.length}`,
      style: columnStyle,
      class: [this.columnClass, 'concrete-masonry-column', 'concrete'],
      attrs: this.columnAttr,
    }, children));

    const containerStyle = {
      marginLeft: `-${gutterSize}`,
    };

    // Return wrapper with columns
    return createElement(
      this.tag, // tag name
      {
        style: containerStyle,
        class: ['concrete-masonry-container', 'concrete'],
      },
      columns, // column vue elements
    );
  },
};
</script>

<style lang="scss" scoped>
.concrete-masonry-container {
  display: flex;
  width: 100%;
}

.concrete-masonry-column {
  border: 0 solid transparent;
}

</style>
