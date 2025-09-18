import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'

// PayPal配置 - 请替换为您的实际Client ID
const PAYPAL_CLIENT_ID = 'AcdGptqLz8w-fUUwT7ysnRP4INkUjfu3Ne4i03B_bKOVeNBpctZO7yoccDX0wBqGlzWqjljUmLngiWeo'
const PAYPAL_CURRENCY = 'USD'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '中国名茶在线商城',
  description: '精选中国传统名茶，品质保证，在线下单',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: '中国茶,龙井茶,普洱茶,铁观音,金骏眉,在线购买' }],
    // PayPal JavaScript SDK
    ['script', { 
      src: `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}`,
      defer: true
    }]
  ],

  theme: defaultTheme({
    logo: '/images/tea-logo.png',
    
    navbar: [
      { text: '首页', link: '/' },
      { text: '商品展示', link: '/products' },
      { text: '关于我们', link: '/about' }
    ],
    
    sidebar: {
      '/': [
        {
          text: '商城导航',
          children: [
            '/',
            '/products',
          ]
        }
      ]
    },

    // 中文本地化
    selectLanguageName: '简体中文',
    selectLanguageText: '选择语言',
    selectLanguageAriaLabel: '选择语言',
    editLinkText: '编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  }),

  bundler: webpackBundler(),
})
