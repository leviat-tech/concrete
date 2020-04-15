module.exports = {
  stories: ['../src/**/*.stories.(js|jsx|ts|tsx|mdx)'],
  addons: [
    // '@storybook/addon-actions',
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     babelOptions: {
    //       presets: [
    //         [
    //           '@vue/cli-plugin-babel/preset',
    //           {
    //             jsx: false,
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // },
    // '@storybook/addon-knobs',
    // '@storybook/addon-links',
    '@storybook/addon-storysource',
    'storybook-addon-designs',
    '@storybook/addon-notes/register-panel',
  ],
};
