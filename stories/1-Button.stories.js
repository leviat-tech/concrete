import ConcreteButton from '../src/components/ConcreteButton.vue';
import Plus from '../src/assets/plus.svg';


export default {
  title: 'Button',
  component: ConcreteButton,
};

export const Size = () => ({
  components: { ConcreteButton },
  template: `
    <div>
      <concrete-button size="lg">Large</concrete-button>
      <concrete-button size="md">Medium</concrete-button>
      <concrete-button size="sm">Small</concrete-button>
      <concrete-button size="xs">Extra Small</concrete-button>
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
  components: { ConcreteButton },
  template: `
    <div>
      <concrete-button>Solid</concrete-button>
      <concrete-button fill="outline">Outline</concrete-button>
      <concrete-button fill="ghost">Ghost</concrete-button>
      <concrete-button :disabled="true">Disabled</concrete-button>
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
  components: { ConcreteButton },
  template: `
    <div>
      <concrete-button color="primary">Primary</concrete-button>
      <concrete-button color="danger">Danger</concrete-button>
    </div>
  `,
});

Color.story = {
  parameters: {
    notes: '',
  },
};

export const Icon = () => ({
  components: { ConcreteButton, Plus },
  template: `
    <div>
      <concrete-button>
        <plus />
      </concrete-button>
      <concrete-button icon="plus"><plus /> Text with Icon</concrete-button>
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
  components: { ConcreteButton },
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
      <concrete-button
        :play="true"
        :fake="true"
        :progress="progress"
        @click="start"
        @cancel="cancel"
      >
        Click for Progress
      </concrete-button>
    </div>
  `,
});
