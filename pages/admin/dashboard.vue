<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">仪表盘</h1>
        <p class="opacity-60 mt-1">数据概览</p>
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

    <!-- 数据卡片 -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div v-for="i in 4" :key="i" class="stats shadow animate-pulse">
        <div class="stat">
          <div class="h-4 bg-base-300 rounded w-20 mb-4"></div>
          <div class="h-8 bg-base-300 rounded w-32"></div>
          <div class="h-4 bg-base-300 rounded w-24 mt-4"></div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-error mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ error }}</span>
      <button class="btn btn-sm" @click="fetchData">重试</button>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          <div class="h-[300px] relative" ref="salesTrendChart"></div>
        </div>
      </div>

      <!-- 订单状态分布 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">订单状态分布</h2>
          <div class="h-[300px] relative" ref="orderStatusChart"></div>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 最近订单 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">最近订单</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>金额</th>
                  <th>状态</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td>{{ order.orderNumber }}</td>
                  <td>¥{{ formatNumber(order.amount) }}</td>
                  <td>
                    <div class="badge" :class="{
                      'badge-success': order.status === 'completed',
                      'badge-warning': order.status === 'pending',
                      'badge-error': order.status === 'cancelled'
                    }">
                      {{ 
                        order.status === 'completed' ? '已完成' :
                        order.status === 'pending' ? '待处理' :
                        order.status === 'cancelled' ? '已取消' : ''
                      }}
                    </div>
                  </td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, ref, watch, onUnmounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 时间范围
const timeRange = ref('today')
const dateRange = ref<[string, string] | null>(null)

// 统计数据
const stats = ref({
  sales: 123456,
  salesGrowth: 12.5,
  orders: 256,
  ordersGrowth: 8.3,
  averageOrder: 482.25,
  averageOrderGrowth: 4.2,
  conversionRate: 3.6,
  conversionRateGrowth: 0.5
})

// 销售趋势数据
const salesTrendData = ref([
  { date: '2025-01-01', value: 1000 },
  { date: '2025-01-02', value: 1500 },
  { date: '2025-01-03', value: 1200 },
  { date: '2025-01-04', value: 1800 },
  { date: '2025-01-05', value: 2000 },
  { date: '2025-01-06', value: 1600 },
  { date: '2025-01-07', value: 2200 }
])

// 订单状态数据
const orderStatusData = ref([
  { status: '已完成', value: 60 },
  { status: '待处理', value: 30 },
  { status: '已取消', value: 10 }
])

// 最近订单
const recentOrders = ref([
  {
    id: 1,
    orderNumber: 'ORD20250115001',
    amount: 1299,
    status: 'completed',
    createdAt: new Date()
  },
  {
    id: 2,
    orderNumber: 'ORD20250115002',
    amount: 899,
    status: 'pending',
    createdAt: new Date()
  }
])

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
  {
    id: 2,
    name: '商品2',
    image: '/images/default-product.png',
    sales: 80,
    revenue: 8000,
    percentage: 24
  }
])

// 图表引用
const salesTrendChart = ref<HTMLElement | null>(null)
const orderStatusChart = ref<HTMLElement | null>(null)

// 加载状态
const loading = ref(false)
const error = ref('')

// 格式化数字
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

// 格式化日期
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 渲染销售趋势图
const renderSalesTrendChart = () => {
  if (!salesTrendChart.value) return

  // 清除现有图表
  d3.select(salesTrendChart.value).selectAll('*').remove()

  // 设置尺寸和边距
  const margin = { top: 20, right: 20, bottom: 30, left: 60 }
  const width = salesTrendChart.value.clientWidth - margin.left - margin.right
  const height = salesTrendChart.value.clientHeight - margin.top - margin.bottom

  // 创建 SVG
  const svg = d3.select(salesTrendChart.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // 创建比例尺
  const x = d3.scaleTime()
    .domain(d3.extent(salesTrendData.value, d => new Date(d.date)) as [Date, Date])
    .range([0, width])

  const y = d3.scaleLinear()
    .domain([0, d3.max(salesTrendData.value, d => d.value) as number])
    .range([height, 0])

  // 创建线条生成器
  const line = d3.line<any>()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX)

  // 添加 X 轴
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  // 添加 Y 轴
  svg.append('g')
    .call(d3.axisLeft(y))

  // 添加网格线
  svg.append('g')
    .attr('class', 'grid')
    .attr('opacity', 0.1)
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat(() => '')
    )

  // 绘制线条
  svg.append('path')
    .datum(salesTrendData.value)
    .attr('fill', 'none')
    .attr('stroke', '#3b82f6')
    .attr('stroke-width', 2)
    .attr('d', line)

  // 添加数据点
  svg.selectAll('.dot')
    .data(salesTrendData.value)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.value))
    .attr('r', 4)
    .attr('fill', '#3b82f6')
}

// 渲染订单状态图
const renderOrderStatusChart = () => {
  if (!orderStatusChart.value) return

  // 清除现有图表
  d3.select(orderStatusChart.value).selectAll('*').remove()

  // 设置尺寸
  const width = orderStatusChart.value.clientWidth
  const height = orderStatusChart.value.clientHeight
  const radius = Math.min(width, height) / 2

  // 创建 SVG
  const svg = d3.select(orderStatusChart.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  // 设置颜色
  const color = d3.scaleOrdinal<string>()
    .domain(orderStatusData.value.map(d => d.status))
    .range(['#10b981', '#f59e0b', '#ef4444'])

  // 创建饼图生成器
  const pie = d3.pie<any>()
    .value(d => d.value)
    .sort(null)

  const arc = d3.arc<any>()
    .innerRadius(radius * 0.6) // 设置为环形图
    .outerRadius(radius * 0.8)

  const outerArc = d3.arc<any>()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

  // 绘制扇形
  const arcs = svg.selectAll('.arc')
    .data(pie(orderStatusData.value))
    .enter()
    .append('g')
    .attr('class', 'arc')

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.status))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')

  // 添加标签线
  arcs.append('polyline')
    .attr('points', function(d: any) {
      const pos = outerArc.centroid(d)
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
      return [arc.centroid(d), outerArc.centroid(d), pos]
    })
    .style('fill', 'none')
    .style('stroke', d => color(d.data.status))
    .style('stroke-width', '1px')

  // 添加标签文本
  arcs.append('text')
    .attr('transform', function(d: any) {
      const pos = outerArc.centroid(d)
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
      return `translate(${pos})`
    })
    .style('text-anchor', d => midAngle(d) < Math.PI ? 'start' : 'end')
    .text(d => `${d.data.status} (${d.data.value}%)`)
    .style('fill', d => color(d.data.status))
    .style('font-size', '12px')
}

// 计算角度中点
const midAngle = (d: any) => {
  return d.startAngle + (d.endAngle - d.startAngle) / 2
}

// 获取数据
const fetchData = async () => {
  loading.value = true
  error.value = ''
  try {
    const query = new URLSearchParams()
    if (timeRange.value === 'custom' && dateRange.value) {
      query.set('start', dateRange.value[0])
      query.set('end', dateRange.value[1])
    } else {
      query.set('range', timeRange.value)
    }
    
    const response = await useFetch(`/api/orders/stats?${query.toString()}`)
    if (response.error.value) {
      throw new Error(response.error.value?.message || '获取数据失败')
    }
    
    stats.value = response.data.value
    nextTick(() => {
      renderSalesTrendChart()
      renderOrderStatusChart()
    })
  } catch (e) {
    error.value = e.message || '获取数据失败'
  } finally {
    loading.value = false
  }
}

// 监听窗口大小变化
const handleResize = () => {
  renderSalesTrendChart()
  renderOrderStatusChart()
}

// 初始化
onMounted(() => {
  fetchData()
  window.addEventListener('resize', handleResize)
})

// 清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 监听时间范围变化
watch(timeRange, () => {
  if (timeRange.value !== 'custom') {
    dateRange.value = null
  }
  fetchData()
})
</script>
