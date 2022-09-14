import { withSource } from './withSource';
import { useArgs } from '@storybook/client-api';
import '../src/index.css';
import Concrete from '../src';

import { app } from '@storybook/vue3';
app.use(Concrete);

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },
  layout: 'centered',
  options: {
    storySort: {
      order: [
        'Concrete',
        ['Getting Started', 'Examples'],
        'Components',
        ['High level', 'Low level', 'Input'],
        'Foundations',
      ],
    },
  },
};

const marginDecorator = (story) => ({
  components: { story },
  template: '<div style="margin: 0.5em;"><story /></div>',
});

export const decorators = [
  withSource,
  marginDecorator,
  (story, context) => {
    const [_, updateArgs] = useArgs();
    return story({ ...context, updateArgs });
  },
];
