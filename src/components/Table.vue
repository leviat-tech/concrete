<template>
  <div class="concrete-table-container concrete">
    <slot />
    <table class="concrete-table concrete">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :class="column.$vnode.data.staticClass"
        >
      </colgroup>
      <tr class="concrete-table-header-row concrete">
        <th
          v-for="column in columns"
          :key="column.label"
          :class="{ clickable: sortable }"
          @click="sortable && column.label && clickLabel(column)"
        >
          {{ column.label.toUpperCase() }}
          <component
            :is="sortIcon"
            v-if="sortable && sortDirection && (column.sortProp || column.prop) === sortProp"
            class="icon"
          />
        </th>
      </tr>
      <tr
        v-for="(datum, idx1) in sortedData"
        :key="idx1"
        class="concrete-table-row row"
      >
        <td
          v-for="(column, idx2) in columns"
          :key="'prop' + idx2"
          @click="$emit('click', datum)"
        >
          <table-cell
            v-if="column.$scopedSlots.default"
            :template="column.$scopedSlots.default(datum)"
          />
          <span v-else>
            {{ get(datum, column.prop) }}
          </span>
        </td>
      </tr>
    </table>
    <div
      v-if="data.length === 0"
      class="concrete-table-blank-row"
    >
      {{ emptyText }}
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import ArrowDown from '../assets/long-arrow-down.svg';
import ArrowUp from '../assets/long-arrow-up.svg';


const TableCell = {
  functional: true,
  name: 'TableCell',
  props: {
    template: { type: Array, default: () => [] },
  },
  render(createElement, { props: { template } }) {
    return createElement('span', {}, template);
  },
};

const CColumn = {
  render() {
    return (
      <div>
        <slot />
      </div>
    );
  },
  props: {
    label: { type: String, default: '' },
    prop: { type: String, default: null },
    sortProp: { type: String, default: null },
    sortable: { type: Boolean, default: true },
  },
};

const CTable = {
  name: 'ConcreteTable',
  components: {
    TableCell,
  },
  props: {
    data: { type: Array, required: true },
    emptyText: { type: String, default: 'No data available' },
    initialSort: { type: Object, default: () => ({ direction: 'asc', prop: null }) },
    sortable: { type: Boolean, default: true },
    externalSort: { type: Boolean, default: false },
  },
  data() {
    return {
      columns: [],
      sortDirection: this.initialSort.direction,
      sortProp: this.initialSort.prop,
    };
  },
  computed: {
    sortIcon() {
      return this.sortDirection === 'asc'
        ? ArrowUp
        : ArrowDown;
    },
    sortedData() {
      if (!this.sortProp || !this.sortDirection || this.externalSort) return this.data;
      return this.data.slice().sort((a, b) => {
        const aValue = get(a, this.sortProp);
        const bValue = get(b, this.sortProp);
        const aSort = this.sortDirection === 'asc' ? -1 : 1;
        if (aValue < bValue) return aSort;
        if (aValue > bValue) return -1 * aSort;
        return 0;
      });
    },
  },
  mounted() {
    this.columns = this.$slots.default
      .filter((c) => c.componentInstance)
      .map((c) => c.componentInstance);
  },
  methods: {
    get,
    clickLabel(column) {
      const sortProp = column.sortProp || column.prop;
      if (this.externalSort) {
        this.$emit('sort', { prop: sortProp, direction: this.sortDirection });
      } else {
        if (sortProp === this.sortProp) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        }
        if (column.sortable) {
          this.sortProp = sortProp;
        }
      }
    },
  },
};

export default CTable;

export { CTable, CColumn };

</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.concrete-table-container {
  width: 100%;
}

.concrete-table {
  width: 100%;
  margin-bottom: 1rem;
  table-layout: auto;
  border-collapse: collapse;
}

.concrete-table-header-row {
  border-bottom-width: $border-sm;
  border-color: $color-gray-04;

  th {
    letter-spacing: 0.025em;
    text-align: left;
    font-size: $text-xs;
    font-weight: normal;
    color: $color-gray-06;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    &.clickable {
      cursor: pointer;
    }

    .icon {
      position: absolute;
      margin-left: 0.25rem;
      margin-top: 0.125rem;
    }
  }
}

.concrete-table-row {
  border-bottom-width: $border-sm;
  border-color: $color-gray-04;
  font-size: $text-sm;

  &.clickable {
    cursor: pointer;
  }

  &:hover {
    background-color: $color-gray-01;
  }

  td {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    .clickable {
      cursor: pointer;
    }
  }
}

.concrete-table-blank-row {
  width: 100%;
  border-bottom-width: $border-sm;
  border-color: $color-gray-04;
  height: 2.5rem;
  text-align: center;
  color: $color-gray-06;
}

.svg-inline {
  font-size: $text-xs;
  overflow: visible;
  display: inline-block;
  height: 1em;
  vertical-align: -0.125em;
}
</style>
