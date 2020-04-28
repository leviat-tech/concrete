const path = require('path');

const sidebars = {
  components: [
    {
      title: 'Introduction',
      path: '/',
    },
    {
      title: 'Getting Started',
      path: '/installation',
    },
    {
      title: 'Simple Components',
      collapsable: false,
      children: [
        '/components/button',
        '/components/icons',
        '/components/text-input',
        '/components/quantity-input',
        '/components/select',
        '/components/search-select',
        '/components/multi-select',
        '/components/native-select',
        '/components/textarea',
        '/components/checkbox',
        '/components/radio',
      ]
    },
    {
      title: 'Notification',
      collapsable: false,
      children: [
        '/components/modal',
        '/components/alert',
      ]
    },
    {
      title: 'Layout',
      collapsable: false,
      children: [
        '/components/table',
        '/components/tabs',
        '/components/panel-slider',
        '/components/toolbar',
        '/components/masonry',
      ]
    },
  ],

}

module.exports = {
  title: 'Concrete Design System',
  description: 'A Vue UI toolkit for technical interfaces.',
  smoothScroll: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
      },
    },
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },

  base: '/',

  themeConfig: {
    repo: 'obe-de/concrete',
    docsDir: 'docs',
    sidebarDepth: 2,

    nav: [
      {
        text: 'Storybook',
        link: 'https://concrete.crh.io/storybook/'
      },
    ],

    sidebar: {
      '/components/': sidebars.components,
      '/': sidebars.components,
    }
  }
}
