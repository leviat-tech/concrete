import { action } from '@storybook/addon-actions';

import TextField from '../src/components/TextField';

export default {
  title: 'TextField',
  component: TextField,
};

export const Solid = () => ({
  components: { TextField },
  template: `
    <div>
      <text-field value="solid" />
      <text-field :style="{ marginTop: '8px' } "value="disabled" :disabled="true" />
    </div>
  `,
  methods: { action: action('clicked') },
});

Solid.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A283',
    }
  }
};

export const Outline = () => ({
  components: { TextField },
  template: `
    <div>
      <text-field value="outline" fill="outline" />
      <text-field :style="{ marginTop: '8px' }" value="disabled" fill="outline" :disabled="true" />
    </div>
  `,
  methods: { action: action('clicked') },
});

Outline.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A1',
    }
  }
};

export const Icon = () => ({
  components: { TextField },
  template: `
    <div>
      <text-field value="w/icon" icon="search" />
      <text-field :style="{ marginTop: '8px' }" icon="search" value="disabled w/icon" :disabled="true" />
    </div>
  `,
  methods: { action: action('clicked') },
});

Icon.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=22%3A137',
    }
  }
};