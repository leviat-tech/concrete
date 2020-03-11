import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Btn from '../src/components/Button';

export default {
  title: 'Btn',
  component: Btn,
};

export const Size = () => ({
  components: { Btn },
  template: '<btn @click="action">Button</btn>',
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
  template: '<btn @click="action">😀 😎 👍 💯</btn>',
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
