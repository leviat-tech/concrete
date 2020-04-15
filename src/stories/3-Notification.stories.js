import ConcreteModal from '../components/ConcreteModal.vue';
import ConcreteButton from '../components/ConcreteButton.vue';


export default {
  title: 'Notification',
  components: { ConcreteModal, ConcreteButton },
};

export const Modal = () => ({
  components: { ConcreteModal, ConcreteButton },
  data() {
    return {
      simpleModal: false,
      modalWithTitle: false,
      modalWithTextOnly: false,
    };
  },
  template: `
  <div>
    <concrete-button @click="simpleModal = true">
      Simple Modal
    </concrete-button>
    <concrete-button @click="modalWithTitle = true">
      Modal With Title
    </concrete-button>
    <concrete-button @click="modalWithTextOnly = true">
      Modal With Text Only
    </concrete-button>
    <concrete-modal
      v-if="simpleModal"
      @close="simpleModal = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </concrete-modal>
    <concrete-modal
      v-if="modalWithTitle"
      title="Modal Title"
      @close="modalWithTitle = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </concrete-modal>
    <concrete-modal
      v-if="modalWithTextOnly"
      :closeable="false"
      @close="modalWithTextOnly = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <span class="red-text">dolore magna aliqua</span>.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </concrete-modal>
  </div>
  `,
});
