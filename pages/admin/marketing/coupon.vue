<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">优惠券管理</h1>
        <p class="opacity-60 mt-1">管理商城优惠券</p>
      </div>
      <button class="btn btn-primary" @click="openCouponModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        创建优惠券
      </button>
    </div>

    <!-- 搜索栏 -->
    <div class="card bg-base-100 shadow-sm mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">优惠券名称</span>
            </label>
            <input type="text" v-model="search.name" class="input input-bordered" placeholder="请输入优惠券名称">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">优惠券类型</span>
            </label>
            <select v-model="search.type" class="select select-bordered">
              <option value="">全部</option>
              <option value="fixed">固定金额</option>
              <option value="percentage">折扣比例</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">状态</span>
            </label>
            <select v-model="search.status" class="select select-bordered">
              <option value="">全部</option>
              <option value="active">进行中</option>
              <option value="pending">未开始</option>
              <option value="expired">已结束</option>
              <option value="disabled">已禁用</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">&nbsp;</span>
            </label>
            <button class="btn btn-primary" @click="searchCoupons">搜索</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>优惠券信息</th>
                <th>使用条件</th>
                <th>有效期</th>
                <th>发放/使用</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coupon in coupons" :key="coupon.id">
                <td>
                  <div class="flex flex-col gap-1">
                    <div class="font-bold">{{ coupon.name }}</div>
                    <div class="text-sm">
                      {{ coupon.type === 'fixed' ? `￥${coupon.value}` : `${coupon.value}折` }}
                    </div>
                    <div class="text-xs opacity-50">{{ coupon.code }}</div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col gap-1">
                    <div>满{{ coupon.minAmount }}元可用</div>
                    <div class="text-xs opacity-50">
                      {{ coupon.useLimit ? `每人限领${coupon.useLimit}张` : '不限领取' }}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col gap-1">
                    <div>{{ formatDate(coupon.startTime) }}</div>
                    <div>{{ formatDate(coupon.endTime) }}</div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col gap-1">
                    <div>已发放: {{ coupon.issuedCount }}</div>
                    <div>已使用: {{ coupon.usedCount }}</div>
                  </div>
                </td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': coupon.status === 'active',
                    'badge-warning': coupon.status === 'pending',
                    'badge-error': coupon.status === 'expired',
                    'badge-ghost': coupon.status === 'disabled'
                  }">
                    {{ 
                      coupon.status === 'active' ? '进行中' :
                      coupon.status === 'pending' ? '未开始' :
                      coupon.status === 'expired' ? '已结束' :
                      '已禁用'
                    }}
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="editCoupon(coupon)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      class="btn btn-sm btn-ghost" 
                      :class="coupon.status === 'disabled' ? 'text-success' : 'text-error'"
                      @click="toggleCouponStatus(coupon)"
                    >
                      <svg v-if="coupon.status === 'disabled'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 创建/编辑优惠券弹窗 -->
    <dialog id="coupon_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">{{ isEdit ? '编辑优惠券' : '创建优惠券' }}</h3>
        <form @submit.prevent="submitCouponForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">优惠券名称</span>
            </label>
            <input type="text" v-model="form.name" class="input input-bordered" required>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">优惠券类型</span>
            </label>
            <select v-model="form.type" class="select select-bordered" required>
              <option value="fixed">固定金额</option>
              <option value="percentage">折扣比例</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">{{ form.type === 'fixed' ? '优惠金额' : '折扣比例' }}</span>
            </label>
            <div class="join">
              <input 
                type="number" 
                v-model="form.value" 
                class="input input-bordered join-item" 
                required
                :min="form.type === 'fixed' ? 0 : 1"
                :max="form.type === 'fixed' ? undefined : 99"
                :step="form.type === 'fixed' ? 0.01 : 1"
              >
              <span class="btn join-item no-animation" disabled>
                {{ form.type === 'fixed' ? '元' : '折' }}
              </span>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">使用门槛</span>
            </label>
            <div class="join">
              <span class="btn join-item no-animation" disabled>满</span>
              <input type="number" v-model="form.minAmount" class="input input-bordered join-item" required min="0" step="0.01">
              <span class="btn join-item no-animation" disabled>元可用</span>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">每人限领</span>
            </label>
            <div class="join">
              <input type="number" v-model="form.useLimit" class="input input-bordered join-item" min="0">
              <span class="btn join-item no-animation" disabled>张 (0表示不限制)</span>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">有效期</span>
            </label>
            <div class="grid grid-cols-2 gap-2">
              <input type="datetime-local" v-model="form.startTime" class="input input-bordered" required>
              <input type="datetime-local" v-model="form.endTime" class="input input-bordered" required>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">优惠券说明</span>
            </label>
            <textarea v-model="form.description" class="textarea textarea-bordered" rows="3"></textarea>
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="closeCouponModal">取消</button>
            <button type="submit" class="btn btn-primary">确定</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 搜索条件
const search = ref({
  name: '',
  type: '',
  status: ''
})

// 优惠券列表
const coupons = ref([
  {
    id: 1,
    name: '新人专享券',
    code: 'NEW_USER_2023',
    type: 'fixed',
    value: 10,
    minAmount: 100,
    useLimit: 1,
    startTime: new Date('2025-01-01'),
    endTime: new Date('2025-12-31'),
    issuedCount: 1000,
    usedCount: 500,
    status: 'active'
  },
  {
    id: 2,
    name: '618狂欢券',
    code: 'MID_YEAR_2023',
    type: 'percentage',
    value: 88,
    minAmount: 200,
    useLimit: 0,
    startTime: new Date('2025-06-01'),
    endTime: new Date('2025-06-18'),
    issuedCount: 5000,
    usedCount: 2000,
    status: 'pending'
  }
])

// 表单数据
const form = ref({
  name: '',
  type: 'fixed',
  value: 0,
  minAmount: 0,
  useLimit: 0,
  startTime: '',
  endTime: '',
  description: ''
})

// 是否编辑模式
const isEdit = ref(false)

// 搜索优惠券
const searchCoupons = async () => {
  try {
    // TODO: 调用搜索 API
    // const data = await couponStore.searchCoupons(search.value)
    // coupons.value = data
  } catch (error) {
    ElMessage.error('搜索失败')
  }
}

// 打开优惠券弹窗
const openCouponModal = () => {
  isEdit.value = false
  form.value = {
    name: '',
    type: 'fixed',
    value: 0,
    minAmount: 0,
    useLimit: 0,
    startTime: '',
    endTime: '',
    description: ''
  }
  const modal = document.getElementById('coupon_modal') as HTMLDialogElement
  modal?.showModal()
}

// 编辑优惠券
const editCoupon = (coupon: any) => {
  isEdit.value = true
  form.value = {
    name: coupon.name,
    type: coupon.type,
    value: coupon.value,
    minAmount: coupon.minAmount,
    useLimit: coupon.useLimit,
    startTime: formatDateForInput(coupon.startTime),
    endTime: formatDateForInput(coupon.endTime),
    description: coupon.description || ''
  }
  const modal = document.getElementById('coupon_modal') as HTMLDialogElement
  modal?.showModal()
}

// 切换优惠券状态
const toggleCouponStatus = async (coupon: any) => {
  try {
    const newStatus = coupon.status === 'disabled' ? 'active' : 'disabled'
    // TODO: 调用状态切换 API
    // await couponStore.updateCouponStatus(coupon.id, newStatus)
    
    // 更新本地状态
    coupon.status = newStatus
    ElMessage.success('操作成功')
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 关闭优惠券弹窗
const closeCouponModal = () => {
  const modal = document.getElementById('coupon_modal') as HTMLDialogElement
  modal?.close()
}

// 提交优惠券表单
const submitCouponForm = async () => {
  try {
    if (isEdit.value) {
      // TODO: 调用编辑 API
      // await couponStore.updateCoupon(form.value)
    } else {
      // TODO: 调用创建 API
      // await couponStore.createCoupon(form.value)
    }
    
    closeCouponModal()
    ElMessage.success(isEdit.value ? '编辑成功' : '创建成功')
    // 刷新列表
    searchCoupons()
  } catch (error) {
    ElMessage.error(isEdit.value ? '编辑失败' : '创建失败')
  }
}

// 格式化日期显示
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 格式化日期为input所需格式
const formatDateForInput = (date: Date) => {
  return date.toISOString().slice(0, 16)
}

// 初始化
onMounted(() => {
  searchCoupons()
})
</script>
