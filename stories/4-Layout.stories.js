import { ConcreteTable, ConcreteColumn } from '../src/components/ConcreteTable.vue';


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
      Hello
    </div>
  `,
});
