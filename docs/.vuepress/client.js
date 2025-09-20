import { defineClientConfig } from 'vuepress/client'
import OrderButton from './components/OrderButton.vue'
import ProductList from './components/ProductList.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('OrderButton', OrderButton)
    app.component('ProductList', ProductList)
  },
})
