<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">数据分析</h1>
        <p class="opacity-60 mt-1">销售数据分析与统计</p>
      </div>
      <div class="join">
        <select v-model="timeRange" class="select select-bordered join-item" @change="fetchData">
          <option value="today">今日</option>
          <option value="yesterday">昨日</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
          <option value="year">本年</option>
          <option value="custom">自定义</option>
        </select>
        <DatePicker 
          v-if="timeRange === 'custom'"
          v-model="dateRange" 
          type="daterange" 
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="fetchData"
          class="w-[300px]"
        />
      </div>
    </div>

    <!-- 销售概览 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stats bg-primary text-primary-content shadow">
        <div class="stat">
          <div class="stat-title">销售额</div>
          <div class="stat-value">¥{{ formatNumber(stats.sales) }}</div>
          <div class="stat-desc">↗︎ {{ stats.salesGrowth }}% 较上期</div>
        </div>
      </div>
      <div class="stats bg-secondary text-secondary-content shadow">
        <div class="stat">
          <div class="stat-title">订单数</div>
          <div class="stat-value">{{ formatNumber(stats.orders) }}</div>
          <div class="stat-desc">↗︎ {{ stats.ordersGrowth }}% 较上期</div>
        </div>
      </div>
      <div class="stats bg-accent text-accent-content shadow">
        <div class="stat">
          <div class="stat-title">客单价</div>
          <div class="stat-value">¥{{ stats.averageOrder }}</div>
          <div class="stat-desc">↗︎ {{ stats.averageOrderGrowth }}% 较上期</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">转化率</div>
          <div class="stat-value">{{ stats.conversionRate }}%</div>
          <div class="stat-desc">↗︎ {{ stats.conversionRateGrowth }}% 较上期</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- 销售趋势 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">销售趋势</h2>
          <div class="h-[300px]">
            <ClientOnly>
              <Line 
                :data="salesTrendData" 
                :options="chartOptions"
              />
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- 支付方式分布 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">支付方式分布</h2>
          <div class="h-[300px]">
            <ClientOnly>
              <Pie 
                :data="paymentMethodData" 
                :options="chartOptions"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 热销商品 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">热销商品</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>销量</th>
                  <th>销售额</th>
                  <th>占比</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in topProducts" :key="product.id">
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="product.image" :alt="product.name" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ product.name }}</div>
                        <div class="text-sm opacity-50">ID: {{ product.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ product.sales }}</td>
                  <td>¥{{ formatNumber(product.revenue) }}</td>
                  <td>{{ product.percentage }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 销售地区 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">销售地区</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>地区</th>
                  <th>订单数</th>
                  <th>销售额</th>
                  <th>占比</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="region in salesByRegion" :key="region.name">
                  <td>{{ region.name }}</td>
                  <td>{{ region.orders }}</td>
                  <td>¥{{ formatNumber(region.sales) }}</td>
                  <td>{{ region.percentage }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

// 注册 ChartJS 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

definePageMeta({
  layout: 'admin'
})

// 时间范围
const timeRange = ref('today')
const dateRange = ref<[string, string] | null>(null)

// 统计数据
const stats = ref({
  sales: 0,
  salesGrowth: 0,
  orders: 0,
  ordersGrowth: 0,
  averageOrder: 0,
  averageOrderGrowth: 0,
  conversionRate: 0,
  conversionRateGrowth: 0
})

// 销售趋势数据
const salesTrendData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '销售额',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
})

// 支付方式数据
const paymentMethodData = ref({
  labels: ['微信支付', '支付宝', '银行卡'],
  datasets: [
    {
      data: [300, 200, 100],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ]
    }
  ]
})

// 图表配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

// 热销商品
const topProducts = ref([
  {
    id: 1,
    name: '商品1',
    image: '/images/default-product.png',
    sales: 100,
    revenue: 10000,
    percentage: 30
  },
  // ... 更多商品数据
])

// 销售地区
const salesByRegion = ref([
  {
    name: '北京',
    orders: 100,
    sales: 10000,
    percentage: 30
  },
  // ... 更多地区数据
])

// 格式化数字
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

// 获取数据
const fetchData = async () => {
  try {
    // TODO: 从后端获取数据
    // const data = await analyticsStore.fetchData({
    //   timeRange: timeRange.value,
    //   startDate: dateRange.value?.[0],
    //   endDate: dateRange.value?.[1]
    // })
    // stats.value = data.stats
    // salesTrendData.value = data.salesTrend
    // paymentMethodData.value = data.paymentMethod
    // topProducts.value = data.topProducts
    // salesByRegion.value = data.salesByRegion
  } catch (error) {
    ElMessage.error('获取数据失败')
  }
}

// 初始化
onMounted(() => {
  fetchData()
})

// 监听时间范围变化
watch(timeRange, () => {
  if (timeRange.value !== 'custom') {
    dateRange.value = null
  }
  fetchData()
})
</script>
