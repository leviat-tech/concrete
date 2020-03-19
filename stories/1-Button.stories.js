import { action } from '@storybook/addon-actions';

import Btn from '../src/components/Button';

export default {
  title: 'Btn',
  component: Btn,
};

export const Size = () => ({
  components: { Btn },
  template: `
    <div>
      <btn @click="action" size="lg">Large</btn>
      <btn @click="action" size="md">Medium</btn>
      <btn @click="action" size="sm">Small</btn>
      <btn @click="action" size="xs">Extra Small</btn>
    </div>
  `,
  methods: { action: action('clicked') },
});

Size.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A394',
    }
  }
};

export const Fill = () => ({
  components: { Btn },
  template: `
    <div>
      <btn @click="action">Solid</btn>
      <btn @click="action" fill="outline">Outline</btn>
      <btn @click="action" fill="ghost">Ghost</btn>
      <btn @click="action" :disabled="true">Disabled</btn>
    </div>
  `,
});

Fill.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A401',
    }
  }
};

export const Icon = () => ({
  components: { Btn },
  template: `
    <div>
      <btn icon="plus" @click="action" />
      <btn icon="plus" @click="action">Text with Icon</btn>
    </div>
  `,
  methods: { action: action('clicked') },
});

Icon.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=100%3A409',
    }
  }
};
