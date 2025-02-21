<template>
  <div ref="chart" class="w-full h-96"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import * as Sale from '../../api/sales';
import * as Product from '../../api/products';

interface BestSale {
  id: number;
  name: string;
  model: string;
  info: string;
  price: number;
  category: number;
  cover: string;
  inventory: number;
  createTime: string;
  updateTime: string;
  totalSold: number;
}

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;
const listdata = ref<BestSale[]>([]);
const updateFrequency = 500;

const colors = [
  '#6ab0de', '#f6c85f', '#8dd35f', '#ff8f78', '#a178df',
  '#4ab9cc', '#f9a65a', '#9ccb86', '#d87a80', '#7b77c4'
];

onMounted(() => {
  initList();
  if (chart.value) {
    myChart = echarts.init(chart.value);
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (myChart) {
    window.removeEventListener('resize', handleResize);
    myChart.dispose();
  }
});

function handleResize() {
  if (myChart) {
    myChart.resize();
  }
}

async function initList() {
  const { data } = await Sale.best10();
  listdata.value = data.data;
  updateChart();
}

function updateChart() {
  if (!myChart) return;

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: any) => {
        const data = params[0].data;
        return `
          <div class="text-sm">
            <div class="flex items-center">
              <img src="${Product.getProductCover(data.cover)}" class="w-10 h-10 rounded-md mr-2" />
              <div>
                <div>商品名称: ${data.name.length > 10 ? data.name.slice(0, 10) + '...' : data.name}</div>
                <div>销量: ${data.totalSold}</div>
              </div>
            </div>
          </div>
        `;
      },
    },
    grid: {
      top: 20,
      bottom: 30,
      left: 150,
      right: 40,
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: (n: number) => Math.round(n) + '',
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: (value: string) => value,
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
        itemStyle: {
          color: (param: any) => colors[param.dataIndex % colors.length],
        },
        encode: {
          x: 'totalSold',
          y: 'name',
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace',
          color: '#333',
        },
      },
    ],
    dataset: {
      source: listdata.value.map(item => ({
        name: item.name,
        totalSold: item.totalSold,
        cover: item.cover, // 添加 cover 字段
      })),
    },
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  };

  myChart.setOption(option);

  // 监听鼠标悬浮事件
  myChart.on('mouseover', (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'bar') {
      const data = params.data;
      handleHover(data);
    }
  });

  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex >= listdata.value.length - 1) {
      clearInterval(interval);
      return;
    }
    currentIndex++;
    const source = listdata.value.slice(0, currentIndex + 1).map(item => ({
      name: item.name,
      totalSold: item.totalSold,
      cover: item.cover,
    }));
    option.dataset.source = source;
    myChart?.setOption(option);
  }, updateFrequency);
}

function handleHover(data: any) {
  
}
</script>

<style scoped>
@media (max-width: 768px) {
  .w-full {
    width: 100%;
  }

  .h-96 {
    height: 300px;
  }
}
</style>