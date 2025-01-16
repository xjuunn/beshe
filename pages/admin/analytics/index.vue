<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">数据分析</h1>
        <p class="opacity-60 mt-1">销售数据分析与统计</p>
      </div>
      <div class="join">
        <select class="select select-bordered join-item" @change="null">
          <option value="today">今日</option>
          <option value="yesterday">昨日</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
          <option value="year">本年</option>
          <option value="custom">自定义</option>
        </select>
        <DatePicker type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" @change="null"
          class="w-[300px]" />
      </div>
    </div>

    <!-- 销售概览 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stats bg-primary text-primary-content shadow">
        <div class="stat">
          <div class="stat-title">销售额</div>
          <div class="stat-value">¥test</div>
          <div class="stat-desc">↗︎ test % 较上期</div>
        </div>
      </div>
      <div class="stats bg-secondary text-secondary-content shadow">
        <div class="stat">
          <div class="stat-title">订单数</div>
          <div class="stat-value">test</div>
          <div class="stat-desc">↗︎ test% 较上期</div>
        </div>
      </div>
      <div class="stats bg-accent text-accent-content shadow">
        <div class="stat">
          <div class="stat-title">客单价</div>
          <div class="stat-value">¥test</div>
          <div class="stat-desc">↗︎ test% 较上期</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">转化率</div>
          <div class="stat-value">test%</div>
          <div class="stat-desc">↗︎ test% 较上期</div>
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
              <Line :data="'test'" :options="'test'" />
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
              <Pie :data="'test'" :options="'test'" />
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
                <tr v-for="item in 20" :key="item">
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="item + ''" :alt="item + ''" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ item }}</div>
                        <div class="text-sm opacity-50">ID: {{ item }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ item }}</td>
                  <td>¥{{ item }}</td>
                  <td>{{ item }}%</td>
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
                <tr v-for="item in 20" :key="item">
                  <td>{{ item }}</td>
                  <td>{{ item }}</td>
                  <td>¥{{ item }}</td>
                  <td>{{ item }}%</td>
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
definePageMeta({
  layout: 'admin'
})

</script>
