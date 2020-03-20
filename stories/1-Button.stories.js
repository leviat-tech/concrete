import Btn from '../src/components/Button';

export default {
  title: 'Btn',
  component: Btn,
};

export const Size = () => ({
  components: { Btn },
  template: `
    <div>
      <btn size="lg">Large</btn>
      <btn size="md">Medium</btn>
      <btn size="sm">Small</btn>
      <btn size="xs">Extra Small</btn>
    </div>
  `,
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
      <btn>Solid</btn>
      <btn fill="outline">Outline</btn>
      <btn fill="ghost">Ghost</btn>
      <btn :disabled="true">Disabled</btn>
    </div>
  `,
});

Fill.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=59%3A401',
    },
  }
};

export const Color = () => ({
  components: { Btn },
  template: `
    <div>
      <btn color="primary">Primary</btn>
      <btn color="danger">Danger</btn>
    </div>
  `,
})

Color.story = {
  parameters: {
    notes: ''
  }
}

export const Icon = () => ({
  components: { Btn },
  template: `
    <div>
      <btn icon="plus" />
      <btn icon="plus">Text with Icon</btn>
    </div>
  `,
});

Icon.story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EyyyqqiepniAIPLROMzyzt/Component-Library?node-id=100%3A409',
    }
  }
};
