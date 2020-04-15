import { ConcreteTable, ConcreteColumn } from '../components/ConcreteTable.vue';


export default {
  title: 'Layout',
  components: { ConcreteTable, ConcreteColumn },
};

export const Table = () => ({
  components: { ConcreteTable, ConcreteColumn },
  computed: {
    tableData() {
      return [
        { name: 'Wendy', quantity: 3, animal: 'cat' },
        { name: 'Roger', quantity: 2, animal: 'pigeon' },
        { name: 'Angie', quantity: 4, animal: 'mink' },
      ];
    },
  },
  template: `
    <div>
      <concrete-table
        :data="tableData"
        :initial-sort="{
          direction: 'asc',
          prop: 'name',
        }"
      >
        <concrete-column
          prop="name"
          label="Name"
        />
        <concrete-column
          prop="quantity"
          label="Quantity"
        />
        <concrete-column
          prop="animal"
          label="Animal"
        />
      </concrete-table>
    </div>
  `,
});
