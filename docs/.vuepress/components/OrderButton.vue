<template>
  <div>
    <button 
      class="order-btn" 
      @click="openOrderModal"
      :data-product="product"
      :data-price="price"
    >
      立即下单
    </button>
    
    <!-- 订单弹窗 -->
    <div v-if="showOrderModal" class="modal" @click.self="closeOrderModal">
      <div class="modal-content">
        <span class="close" @click="closeOrderModal">&times;</span>
        <h2>确认订单</h2>

        <div class="product-info">
          <h3>商品信息</h3>
          <p><strong>商品名称：</strong>{{ product }}</p>
          <p><strong>价格：</strong>¥{{ price }}</p>
        </div>

        <form @submit.prevent="submitOrder" class="order-form">
          <h3>收货信息</h3>
          <div class="form-group">
            <label for="customer-name">姓名：</label>
            <input 
              type="text" 
              v-model="orderData.name" 
              required
              placeholder="请输入您的姓名"
            >
          </div>

          <div class="form-group">
            <label for="customer-phone">电话：</label>
            <input 
              type="tel" 
              v-model="orderData.phone" 
              required
              placeholder="请输入手机号码"
            >
          </div>

          <div class="form-group">
            <label for="customer-address">详细地址：</label>
            <textarea 
              v-model="orderData.address" 
              rows="3" 
              required
              placeholder="请输入详细地址"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="customer-email">邮箱：</label>
            <input 
              type="email" 
              v-model="orderData.email" 
              required
              placeholder="请输入邮箱地址"
            >
          </div>

          <div class="form-group">
            <label for="payment-method">支付方式：</label>
            <select v-model="orderData.paymentMethod" required>
              <option value="">请选择支付方式</option>
              <option value="paypal">PayPal 支付</option>
              <!-- <option value="alipay">支付宝支付</option>
              <option value="wechat">微信支付</option> -->
              <option value="later">稍后支付</option>
            </select>
          </div>

          <!-- PayPal支付按钮容器 -->
          <div v-if="orderData.paymentMethod === 'paypal' && formValid" class="paypal-button-container">
            <div id="paypal-button-container" class="paypal-buttons"></div>
            <p class="paypal-note">请点击上方PayPal按钮完成支付</p>
          </div>

          <div class="form-actions" v-if="orderData.paymentMethod !== 'paypal' || !formValid">
            <button type="button" @click="closeOrderModal" class="btn-cancel">取消</button>
            <button type="submit" class="btn-confirm" :disabled="paymentProcessing">
              {{ paymentProcessing ? '处理中...' : '确认订单' }}
            </button>
          </div>

          <div v-if="orderData.paymentMethod === 'paypal' && formValid" class="form-actions">
            <button type="button" @click="closeOrderModal" class="btn-cancel">取消</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 支付结果弹窗 -->
    <div v-if="showPaymentResult" class="modal" @click.self="closePaymentResult">
      <div class="modal-content">
        <span class="close" @click="closePaymentResult">&times;</span>
        <div class="payment-result">
          <h3>{{ paymentResultData.success ? '支付成功！' : '订单已创建！' }}</h3>
          <p>感谢您的购买！</p>
          <p>订单号：{{ paymentResultData.orderNumber }}</p>
          <p v-if="paymentResultData.transactionId">交易ID：{{ paymentResultData.transactionId }}</p>
          <p v-if="!paymentResultData.success">我们将在24小时内联系您确认支付方式。</p>
          <p><em>此为模拟支付，未产生实际扣款。</em></p>
          <button @click="closePaymentResult" class="btn-confirm">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderButton',
  props: {
    product: {
      type: String,
      required: true
    },
    price: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      showOrderModal: false,
      showPaymentResult: false,
      paymentProcessing: false,
      orderData: {
        name: '',
        phone: '',
        address: '',
        email: '',
        paymentMethod: ''
      },
      paymentResultData: {
        success: false,
        orderNumber: '',
        transactionId: '',
        paymentDetails: null
      }
    }
  },
  computed: {
    formValid() {
      return this.orderData.name && 
             this.orderData.phone && 
             this.orderData.address && 
             this.orderData.email && 
             this.orderData.paymentMethod;
    }
  },
  watch: {
    'orderData.paymentMethod'(newValue) {
      if (newValue === 'paypal' && this.formValid) {
        this.$nextTick(() => {
          this.initPayPalButtons();
        });
      }
    },
    formValid(isValid) {
      if (isValid && this.orderData.paymentMethod === 'paypal') {
        this.$nextTick(() => {
          this.initPayPalButtons();
        });
      }
    }
  },
  methods: {
    openOrderModal() {
      console.log('Opening order modal for:', this.product);
      this.showOrderModal = true;
    },
    closeOrderModal() {
      this.showOrderModal = false;
      this.resetOrderData();
    },
    closePaymentResult() {
      this.showPaymentResult = false;
      this.resetOrderData();
    },
    resetOrderData() {
      this.orderData = {
        name: '',
        phone: '',
        address: '',
        email: '',
        paymentMethod: ''
      };
    },
    submitOrder() {
      console.log('Submitting order:', this.orderData);
      
      // 生成订单号
      const orderNumber = 'ORD-' + Date.now();
      
      // 根据支付方式处理
      if (this.orderData.paymentMethod === 'later') {
        // 稍后支付
        this.paymentResultData = {
          success: false,
          orderNumber: orderNumber,
          transactionId: ''
        };
      } else if (this.orderData.paymentMethod === 'paypal') {
        // PayPal支付 - 这里可以集成真实的PayPal SDK
        this.processPayPalPayment(orderNumber);
        return;
      } else {
        // 其他支付方式的模拟处理
        const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 15).toUpperCase();
        this.paymentResultData = {
          success: true,
          orderNumber: orderNumber,
          transactionId: transactionId
        };
      }

      // 关闭订单弹窗，显示支付结果
      this.showOrderModal = false;
      this.showPaymentResult = true;

      // 这里可以发送数据到服务器
      this.logOrder(orderNumber);
    },
    initPayPalButtons() {
      // 检查PayPal SDK是否已加载
      if (!window.paypal) {
        console.error('PayPal SDK未加载，请检查配置');
        return;
      }

      // 清除现有的PayPal按钮
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
        
        // 初始化PayPal按钮
        window.paypal.Buttons({
          // 设置交易
          createOrder: (data, actions) => {
            const usdPrice = this.convertToUSD(this.price);
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: usdPrice.toString()
                },
                description: `${this.product} - 中国名茶`
              }]
            });
          },
          
          // 支付完成处理
          onApprove: async (data, actions) => {
            try {
              this.paymentProcessing = true;
              const order = await actions.order.capture();
              
              const orderNumber = 'ORD-' + Date.now();
              
              this.paymentResultData = {
                success: true,
                orderNumber: orderNumber,
                transactionId: order.id,
                paymentDetails: order
              };
              
              this.showOrderModal = false;
              this.showPaymentResult = true;
              
              // 记录订单
              this.logOrder(orderNumber);
              
            } catch (error) {
              console.error('PayPal支付处理失败:', error);
              this.handlePaymentError('支付处理失败，请重试');
            } finally {
              this.paymentProcessing = false;
            }
          },
          
          // 支付取消处理
          onCancel: (data) => {
            console.log('用户取消了PayPal支付');
            this.handlePaymentError('支付已取消');
          },
          
          // 支付错误处理
          onError: (err) => {
            console.error('PayPal支付错误:', err);
            this.handlePaymentError('支付过程中发生错误，请重试');
          }
        }).render('#paypal-button-container');
      }
    },

    processPayPalPayment(orderNumber) {
      // 这个方法现在通过initPayPalButtons中的按钮处理
      // 保留用于兼容性
      console.log('PayPal支付处理:', orderNumber);
    },

    convertToUSD(cnyPrice) {
      // 简单的货币转换（实际项目中应使用实时汇率API）
      const exchangeRate = 0.14; // 1 CNY ≈ 0.14 USD（示例汇率）
      return Math.max(0.01, parseFloat((parseFloat(cnyPrice) * exchangeRate).toFixed(2)));
    },

    handlePaymentError(message) {
      alert(`支付错误：${message}`);
      this.paymentProcessing = false;
    },
    logOrder(orderNumber) {
      // 记录订单信息
      const orderInfo = {
        orderNumber: orderNumber,
        product: this.product,
        price: this.price,
        customer: this.orderData,
        timestamp: new Date().toISOString()
      };
      
      console.log('Order created:', orderInfo);
      
      // 这里可以发送到服务器
      // fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderInfo)
      // });
    }
  }
}
</script>

<style scoped>
/* 订单按钮样式 */
.order-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin: 10px 0;
}

.order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

/* 弹窗样式 */
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 0;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: modalSlideIn 0.3s ease;
  position: relative;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover {
  color: #000;
}

.product-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.order-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-cancel, .btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-confirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.payment-result {
  text-align: center;
  padding: 20px;
  background: #d4edda;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
}

.payment-result h3 {
  color: #155724;
  margin-bottom: 15px;
}

.payment-result p {
  margin: 10px 0;
  color: #155724;
}

/* PayPal按钮容器样式 */
.paypal-button-container {
  margin: 20px 0;
  padding: 20px;
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.paypal-buttons {
  min-height: 50px;
}

.paypal-note {
  text-align: center;
  margin: 10px 0 0 0;
  color: #666;
  font-size: 14px;
}

/* 处理中状态按钮 */
.btn-confirm:disabled {
  background: #6c757d !important;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
</style>
