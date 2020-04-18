import { CTable, CColumn } from '../components/Table.vue';
import { CTabSwitcher, CTabLabel, CTab } from '../components/TabSwitcher.vue';


export default {
  title: 'Layout',
  components: { CTable, CColumn, CTabSwitcher, CTabLabel, CTab },
};

export const Table = () => ({
  components: { CTable, CColumn },
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
      <c-table
        :data="tableData"
        :initial-sort="{
          direction: 'asc',
          prop: 'name',
        }"
      >
        <c-column
          prop="name"
          label="Name"
        />
        <c-column
          prop="quantity"
          label="Quantity"
        />
        <c-column
          prop="animal"
          label="Animal"
        />
      </c-table>
    </div>
  `,
});

export const TabSwitcher = () => ({
  components: { CTabSwitcher, CTabLabel, CTab },
  template: `
    <div class="tab-div">
      <c-tab-switcher>
        <template v-slot:labels>
          <c-tab-label>Tab Label 1</c-tab-label>
          <c-tab-label>Tab Label 2</c-tab-label>
        </template>
        <template v-slot:content>
          <c-tab>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</c-tab>
          <c-tab>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</c-tab>
        </template>
      </c-tab-switcher>
    </div>
  `,
});
