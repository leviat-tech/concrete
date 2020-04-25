import CButton from '../components/Button.vue';
import Plus from '../assets/icons/plus.svg';


export default {
  title: 'Button',
  component: CButton,
};

export const Size = () => ({
  components: { CButton },
  template: `
    <div>
      <c-button size="lg">Large</c-button>
      <c-button size="md">Medium</c-button>
      <c-button size="sm">Small</c-button>
      <c-button size="xs">Extra Small</c-button>
    </div>
  `,
});

Size.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A394',
    },
  },
};

export const Fill = () => ({
  components: { CButton },
  template: `
    <div>
      <c-button>Solid</c-button>
      <c-button fill="outline">Outline</c-button>
      <c-button fill="ghost">Ghost</c-button>
      <c-button :disabled="true">Disabled</c-button>
    </div>
  `,
});

Fill.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A401',
    },
  },
};

export const Color = () => ({
  components: { CButton },
  template: `
    <div>
      <c-button color="primary">Primary</c-button>
      <c-button color="danger">Danger</c-button>
    </div>
  `,
});

Color.story = {
  parameters: {
    notes: '',
  },
};

export const Icon = () => ({
  components: { CButton, Plus },
  template: `
    <div>
      <c-button>
        <plus />
      </c-button>
      <c-button icon="plus"><plus /> Text with Icon</c-button>
    </div>
  `,
});

Icon.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=100%3A409',
    },
  },
};

export const Progress = () => ({
  components: { CButton },
  data() {
    return {
      progress: 0,
      timeoutId: null,
    };
  },
  methods: {
    start() {
      this.progress = 20;
      this.timeoutId = setTimeout(() => {
        this.progress = 100;
      }, 4000);
    },
    cancel() {
      this.progress = 0;
      clearTimeout(this.timeoutId);
    },
  },
  template: `
    <div>
      <c-button
        :play="true"
        :fake="true"
        :progress="progress"
        @click="start"
        @cancel="cancel"
      >
        Click for Progress
      </c-button>
    </div>
  `,
});
