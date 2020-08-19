import CButton from '../../src/components/Button.vue';
import CModal from '../../src/components/Modal.vue';

export default {
  title: 'Modal',
  component: CModal,
};

export const Size = () => ({
  data() {
    return {
      displayedModalSize: null,
    }
  },
  computed: {
    text() {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    sizeLabels() {
      return { lg: 'Large', md: 'Medium' }
    },
  },
  components: { CButton, CModal },
  template: `
    <div>
      <c-modal
        v-if="displayedModalSize"
        :size="displayedModalSize"
        :title="sizeLabels[displayedModalSize] + ' Modal!'"
        @close="displayedModalSize = null"
      >
        {{ text }}
      </c-modal>
      <c-button
        size="lg"
        @click="displayedModalSize = 'lg'"
      >
        Display Large Modal
      </c-button>
      <c-button
        size="md"
        @click="displayedModalSize = 'md'"
      >
        Display Medium Modal
      </c-button>
    </div>
  `,
});
