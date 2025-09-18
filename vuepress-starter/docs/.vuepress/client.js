import { defineClientConfig } from 'vuepress/client'
import OrderButton from './components/OrderButton.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('OrderButton', OrderButton)
  },
})
