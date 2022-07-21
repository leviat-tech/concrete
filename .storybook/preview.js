import { withSource } from './withSource'
import '../src/index.css';
import Concrete from '../src';

import { app } from '@storybook/vue3';
app.use(Concrete, {
  size: 'lg',
  inputHandler: (id, value) => alert(`Input with id '${id}' was changed to ${value}`),
});

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
      order: ['Concrete', 'Components', 'Foundations'],
    },
  },
}

export const decorators = [
  withSource,
]
