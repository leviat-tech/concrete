import { CTable, CColumn } from '../components/Table.vue';
import { CTabSwitcher, CTabLabel, CTab } from '../components/TabSwitcher.vue';
import { CPanelSlider, CPanel, CPanelLink } from '../components/PanelSlider.vue';
import CMasonry from '../components/Masonry.vue';


export default {
  title: 'Layout',
  components: {
    CTable,
    CColumn,
    CTabSwitcher,
    CTabLabel,
    CTab,
    CPanelSlider,
    CPanel,
    CPanelLink,
  },
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

export const PanelSlider = () => ({
  components: { CPanelSlider, CPanel, CPanelLink },
  template: `
    <div class="tab-div">
      <c-panel-slider title="Primary">
        Content.
        <div>
          <c-panel-link link-to="a">Drill Down</c-panel-link>
          <c-panel-link link-to="b">A different menu</c-panel-link>
        </div>
        Some more content.
        <c-panel panel-id="a" title="Secondary">
          Secondary Content
          <c-panel-link link-to="x">Drill more?</c-panel-link>
          <c-panel panel-id="x" title="Tertiary">
            Tertiary Content
            <c-panel-link link-to="q">Last one</c-panel-link>
            <c-panel panel-id="q" title="Last one">
              Some final content
            </c-panel>
          </c-panel>
        </c-panel>
        <c-panel panel-id="b" title="Another?">
          A different Secondary Panel
        </c-panel>
      </c-panel-slider>
    </div>
  `,
});

export const Masonry = () => ({
  components: { CMasonry },
  template: `
    <div class="input-row">
      <c-masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 1}" gutter="1.5rem">
        <div class="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div class="card">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div class="card">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
        <div class="card">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </c-masonry>
    </div>
  `,
});
