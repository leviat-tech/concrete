import CModal from '../../src/components/Modal.vue';
import CButton from '../../src/components/Button.vue';
import alert from '../../src/components/alert';


export default {
  title: 'Notification',
  components: { CModal, CButton },
};

export const Modal = () => ({
  components: { CModal, CButton },
  data() {
    return {
      simpleModal: false,
      modalWithTitle: false,
      modalWithTextOnly: false,
    };
  },
  template: `
  <div>
    <c-button @click="simpleModal = true">
      Simple Modal
    </c-button>
    <c-button @click="modalWithTitle = true">
      Modal With Title
    </c-button>
    <c-button @click="modalWithTextOnly = true">
      Modal With Text Only
    </c-button>
    <c-modal
      v-if="simpleModal"
      @close="simpleModal = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </c-modal>
    <c-modal
      v-if="modalWithTitle"
      title="Modal Title"
      @close="modalWithTitle = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </c-modal>
    <c-modal
      v-if="modalWithTextOnly"
      :closeable="false"
      @close="modalWithTextOnly = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </c-modal>
  </div>
  `,
});

export const Alertbox = () => ({
  components: { CButton },
  methods: {
    openAlert() {
      alert('This is an alert message');
    },
  },
  template: `
  <div>
    <c-button @click="openAlert">
      Click for Alert
    </c-button>
  </div>
  `,
});
