import transformSnippet from './transformSnippet';
import '../src/index.css';
import Concrete from '../src';

import { setup } from '@storybook/vue3';

setup(app => {
  app.use(Concrete);
});

export const parameters = {
  viewMode: 'docs',
  // actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
    source: {
      transform: transformSnippet
    },
    canvas: {
      sourceState: 'shown'
    }
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
  template: '<div style="margin: 0.5em;"><story /></div>'
});

export const decorators = [
  // transformSnippet,
  marginDecorator,
]

export default {
  tags: ['autodocs']
}
