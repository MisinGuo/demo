# PayPal支付集成指南

## 概述
本项目已集成PayPal支付功能，支持在线茶叶购买的支付处理。

## 设置步骤

### 1. 获取PayPal Client ID
1. 访问 [PayPal开发者控制台](https://developer.paypal.com/)
2. 登录或注册PayPal开发者账户
3. 创建新的应用程序
4. 获取沙盒环境和生产环境的Client ID

### 2. 配置PayPal设置
编辑文件：`docs/.vuepress/config.js`

找到PayPal配置部分，替换为您的实际Client ID：

```javascript
// PayPal配置 - 请替换为您的实际Client ID
const PAYPAL_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID' // 替换为真实的Client ID
const PAYPAL_CURRENCY = 'USD'
```

**注意**：
- 沙盒环境：使用沙盒Client ID进行测试
- 生产环境：替换为生产环境Client ID部署上线

### 3. 测试PayPal支付
1. 启动开发服务器：`pnpm run docs:dev`
2. 访问商品页面
3. 点击"立即下单"按钮
4. 选择"PayPal支付"
5. 填写完整的收货信息
6. PayPal支付按钮会自动显示
7. 使用PayPal沙盒测试账户完成支付

### 4. PayPal沙盒测试账户
在PayPal开发者控制台的"Sandbox"部分可以创建测试买家账户：
- 测试邮箱：buyer@example.com  
- 密码：通常为自动生成

## 功能特性

### ✅ 已实现的功能
- [x] PayPal JavaScript SDK集成
- [x] 动态PayPal支付按钮渲染
- [x] 实时支付状态处理
- [x] 支付成功/失败回调
- [x] 订单信息记录
- [x] 货币转换（CNY到USD）
- [x] 响应式UI设计
- [x] 环境配置管理（沙盒/生产）

### 🔧 技术特点
- Vue 3组件化开发
- 表单验证和状态管理
- 异步支付处理
- 错误处理机制
- 美观的用户界面

## 支付流程

1. **用户操作**：填写订单信息并选择PayPal支付
2. **表单验证**：确保所有必填信息完整
3. **PayPal按钮**：动态显示PayPal官方支付按钮
4. **支付处理**：用户通过PayPal完成支付
5. **结果处理**：显示支付成功页面并记录订单

## 货币处理
- 显示价格：人民币（CNY）
- 支付价格：美元（USD）
- 汇率转换：可在配置文件中调整
- 建议：生产环境使用实时汇率API

## 安全考虑
- Client ID只包含前端标识，不涉及敏感信息
- 实际支付由PayPal服务器处理
- 订单验证应在后端服务器进行
- 生产环境必须使用HTTPS

## 故障排除

### PayPal按钮不显示
- 检查Client ID是否正确配置
- 确认网络连接正常
- 查看浏览器控制台错误信息

### 支付失败
- 确认使用有效的PayPal测试账户
- 检查订单金额是否符合要求（最低$0.01）
- 查看PayPal沙盒账户余额

### 配置错误
- 检查`config.js`文件中的PayPal配置
- 确认Client ID格式正确
- 验证SDK URL能正常访问

## 升级到生产环境
1. 在`config.js`中替换为生产环境Client ID
2. 测试完整支付流程
3. 确保使用HTTPS部署
4. 实施后端订单验证

## 支持与帮助
- PayPal官方文档：https://developer.paypal.com/docs/
- PayPal JavaScript SDK：https://developer.paypal.com/sdk/js/
- 技术支持：PayPal开发者社区


Display App Name
demo

Client ID
AcdGptqLz8w-fUUwT7ysnRP4INkUjfu3Ne4i03B_bKOVeNBpctZO7yoccDX0wBqGlzWqjljUmLngiWeo

Secret key 1
EOF3uDnGjeLbedabO_rsjOieR44IRXwF73TDZUIUZsOzadWgsRRP36voIIxv4Woks8MgBTKEuExbMP20


+ Add Second Key
Sandbox account info
View details
Sandbox URL
https://sandbox.paypal.com

Sandbox Region
C2
Email
sb-qxp3f46344414@business.example.com

Password
v0R4a%S<


