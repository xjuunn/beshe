<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">系统设置</h1>
        <p class="opacity-60 mt-1">管理系统配置</p>
      </div>
    </div>

    <!-- 设置卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 基本设置 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">基本设置</h2>
          <form @submit.prevent="saveBasicSettings">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">网站名称</span>
              </label>
              <input type="text" v-model="basicSettings.siteName" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">网站描述</span>
              </label>
              <textarea v-model="basicSettings.description" class="textarea textarea-bordered" rows="3"></textarea>
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">联系电话</span>
              </label>
              <input type="tel" v-model="basicSettings.phone" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">联系邮箱</span>
              </label>
              <input type="email" v-model="basicSettings.email" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">地址</span>
              </label>
              <input type="text" v-model="basicSettings.address" class="input input-bordered" />
            </div>
            <button type="submit" class="btn btn-primary w-full">保存设置</button>
          </form>
        </div>
      </div>

      <!-- 支付设置 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">支付设置</h2>
          <form @submit.prevent="savePaymentSettings">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">支付方式</span>
              </label>
              <div class="space-y-2">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="paymentSettings.enableWechat" class="checkbox" />
                  <span class="label-text">微信支付</span>
                </label>
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="paymentSettings.enableAlipay" class="checkbox" />
                  <span class="label-text">支付宝</span>
                </label>
              </div>
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">微信支付商户号</span>
              </label>
              <input type="text" v-model="paymentSettings.wechatMerchantId" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">微信支付密钥</span>
              </label>
              <input type="password" v-model="paymentSettings.wechatApiKey" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">支付宝商户号</span>
              </label>
              <input type="text" v-model="paymentSettings.alipayMerchantId" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">支付宝密钥</span>
              </label>
              <input type="password" v-model="paymentSettings.alipayApiKey" class="input input-bordered" />
            </div>
            <button type="submit" class="btn btn-primary w-full">保存设置</button>
          </form>
        </div>
      </div>

      <!-- 邮件设置 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">邮件设置</h2>
          <form @submit.prevent="saveEmailSettings">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">SMTP 服务器</span>
              </label>
              <input type="text" v-model="emailSettings.smtpHost" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">SMTP 端口</span>
              </label>
              <input type="number" v-model="emailSettings.smtpPort" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">邮箱账号</span>
              </label>
              <input type="email" v-model="emailSettings.smtpUsername" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">邮箱密码</span>
              </label>
              <input type="password" v-model="emailSettings.smtpPassword" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">发件人名称</span>
              </label>
              <input type="text" v-model="emailSettings.senderName" class="input input-bordered" />
            </div>
            <div class="form-control mb-4">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" v-model="emailSettings.enableSsl" class="checkbox" />
                <span class="label-text">启用 SSL</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary w-full">保存设置</button>
          </form>
        </div>
      </div>
    </div>

    <!-- 其他设置 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <!-- 图片设置 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">图片设置</h2>
          <form @submit.prevent="saveImageSettings">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">存储方式</span>
              </label>
              <select v-model="imageSettings.storageType" class="select select-bordered w-full">
                <option value="local">本地存储</option>
                <option value="oss">阿里云 OSS</option>
                <option value="cos">腾讯云 COS</option>
              </select>
            </div>
            <div v-if="imageSettings.storageType === 'oss'">
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">OSS Access Key</span>
                </label>
                <input type="text" v-model="imageSettings.ossAccessKey" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">OSS Secret Key</span>
                </label>
                <input type="password" v-model="imageSettings.ossSecretKey" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">OSS Bucket</span>
                </label>
                <input type="text" v-model="imageSettings.ossBucket" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">OSS 区域</span>
                </label>
                <input type="text" v-model="imageSettings.ossRegion" class="input input-bordered" />
              </div>
            </div>
            <div v-if="imageSettings.storageType === 'cos'">
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">COS Secret ID</span>
                </label>
                <input type="text" v-model="imageSettings.cosSecretId" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">COS Secret Key</span>
                </label>
                <input type="password" v-model="imageSettings.cosSecretKey" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">COS Bucket</span>
                </label>
                <input type="text" v-model="imageSettings.cosBucket" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">COS 区域</span>
                </label>
                <input type="text" v-model="imageSettings.cosRegion" class="input input-bordered" />
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full">保存设置</button>
          </form>
        </div>
      </div>

      <!-- 通知设置 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">通知设置</h2>
          <form @submit.prevent="saveNotificationSettings">
            <div class="form-control mb-4">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" v-model="notificationSettings.enableEmail" class="checkbox" />
                <span class="label-text">启用邮件通知</span>
              </label>
            </div>
            <div class="form-control mb-4">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" v-model="notificationSettings.enableSms" class="checkbox" />
                <span class="label-text">启用短信通知</span>
              </label>
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">新订单通知</span>
              </label>
              <div class="space-y-2">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="notificationSettings.notifyNewOrder" class="checkbox" />
                  <span class="label-text">收到新订单时通知</span>
                </label>
                <input 
                  type="text" 
                  v-model="notificationSettings.newOrderReceivers" 
                  class="input input-bordered w-full" 
                  placeholder="通知接收邮箱，多个用逗号分隔"
                />
              </div>
            </div>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">库存预警</span>
              </label>
              <div class="space-y-2">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="notificationSettings.notifyLowStock" class="checkbox" />
                  <span class="label-text">库存不足时通知</span>
                </label>
                <input 
                  type="number" 
                  v-model="notificationSettings.lowStockThreshold" 
                  class="input input-bordered w-full" 
                  placeholder="库存预警阈值"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full">保存设置</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// 基本设置
const basicSettings = ref({
  siteName: '',
  description: '',
  phone: '',
  email: '',
  address: ''
})

// 支付设置
const paymentSettings = ref({
  enableWechat: false,
  enableAlipay: false,
  wechatMerchantId: '',
  wechatApiKey: '',
  alipayMerchantId: '',
  alipayApiKey: ''
})

// 邮件设置
const emailSettings = ref({
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: '',
  senderName: '',
  enableSsl: true
})

// 图片设置
const imageSettings = ref({
  storageType: 'local',
  ossAccessKey: '',
  ossSecretKey: '',
  ossBucket: '',
  ossRegion: '',
  cosSecretId: '',
  cosSecretKey: '',
  cosBucket: '',
  cosRegion: ''
})

// 通知设置
const notificationSettings = ref({
  enableEmail: false,
  enableSms: false,
  notifyNewOrder: false,
  newOrderReceivers: '',
  notifyLowStock: false,
  lowStockThreshold: 10
})

// 保存基本设置
const saveBasicSettings = async () => {
  try {
    // await settingsStore.saveBasicSettings(basicSettings.value)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 保存支付设置
const savePaymentSettings = async () => {
  try {
    // await settingsStore.savePaymentSettings(paymentSettings.value)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 保存邮件设置
const saveEmailSettings = async () => {
  try {
    // await settingsStore.saveEmailSettings(emailSettings.value)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 保存图片设置
const saveImageSettings = async () => {
  try {
    // await settingsStore.saveImageSettings(imageSettings.value)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 保存通知设置
const saveNotificationSettings = async () => {
  try {
    // await settingsStore.saveNotificationSettings(notificationSettings.value)
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 初始化
onMounted(async () => {
  try {
    // const settings = await settingsStore.getSettings()
    // basicSettings.value = settings.basic
    // paymentSettings.value = settings.payment
    // emailSettings.value = settings.email
    // imageSettings.value = settings.image
    // notificationSettings.value = settings.notification
  } catch (error) {
    ElMessage.error('获取设置失败')
  }
})
</script>