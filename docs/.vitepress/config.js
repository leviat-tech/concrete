export default {
  lang: 'en-US',
  title: 'Concrete Docs',
  description: 'VitePress powered docs for the Concrete UI Library.',
  lastUpdated: true,

  themeConfig: {
    repo: 'leviat-tech/concrete',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Storybook', link: 'https://concrete.crh.io/storybook' },
    ],

    sidebar: {
      '/': getSidebar()
    }
  }
}

function getSidebar() {
  return [
    {
      text: 'General',
      children: [
        { text: 'Introduction', link: '/' },
        { text: 'Colors', link: '/general/colors' },
      ]
    },
    {
      text: 'Components',
      children: [
        { text: 'Button', link: '/components/button' },
      ]
    },
    {
      text: 'Examples',
      children: [
        { text: 'Form', link: '/examples/form' },
      ]
    }
  ]
}