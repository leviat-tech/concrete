<template>
  <c-table
    :data="data"
    :sortable="sortable"
    @click="clicky"
  >
    <c-column
      v-for="column in columns"
      :key="column.prop"
      :label="column.label"
      :prop="column.prop"
    />
  </c-table>
</template>

<script>
export default {
  name: 'TableDemo',
  props: {
    data: { type: Array },
    columns: { type: Array },
    sortable: { type: Boolean, default: true }
  },
  methods: {
    clicky(payload) {
      console.log('hi', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
// Reset default VuePress table styles

/deep/ tr {
  border-top-width: 0;
  background-color: transparent;
}

/deep/ th, /deep/ td {
  text-align: left;
  border-left-width: 0;
  border-top-width: 0;
  border-right-width: 0;
}

</style>