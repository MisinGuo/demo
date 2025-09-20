<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <h2>{{ product.name }} ({{ product.englishName }})</h2>
      <p>{{ product.description }}</p>
      <div class="price">¥{{ product.price }}</div>
      <OrderButton :product="product.name" :price="product.price" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import OrderButton from './OrderButton.vue';

export default {
  components: {
    OrderButton
  },
  setup() {
    const products = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('/products.json');
        products.value = await response.json();
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    });

    return {
      products
    };
  }
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #eaecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.price {
  font-size: 1.2em;
  font-weight: bold;
  color: #3eaf7c;
  margin: 10px 0;
}
</style>
