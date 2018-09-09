const path = require('path')

module.exports = {
  lastUpdated: 'Last Updated',

  title: '1ZLAB MicroIDE',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }]
  ],
  // sidebar
  sidebar: 'auto',
  // locale
  locales: {
    '/': {
      lang: 'en-US',
      title: '1ZLAB MicroIDE'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '1ZLAB MicroIDE'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English'
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
      }
    }
  }
}
