import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Btn from '../src/components/Button';

export default {
  title: 'Btn',
  component: Btn,
};

export const Size = () => ({
  components: { Btn },
  template: `
    <div class="flex items-center my-2">
      <btn class="mx-2" @click="action" size="lg">Large</btn>
      <btn class="mx-2" @click="action" size="md">Medium</btn>
      <btn class="mx-2" @click="action" size="sm">Small</btn>
      <btn class="mx-2" @click="action" size="xs">Extra Small</btn>
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
  template: '<btn @click="action">Button</btn>',
  methods: { action: linkTo('clicked') },
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
  template: '<btn icon="plus" @click="action">Text with Icon</btn>',
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
