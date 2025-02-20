<template>
  <div class="w-full chartcontainer flex flex-col items-center justify-center">
    <div ref="chart1" class="w-[400px] h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import * as Category from '../../api/categories';
import * as Sale from '../../api/sales'
interface ClassifyItem {
  name: string;
  num: number;
}
let categoryMap: Ref<Map<number, string>> = ref(new Map())
let year = ref(new Date().getFullYear());
let month = ref(new Date().getMonth())
function setDate(yearStep: number, monthSetp: number) {
  let day = dayjs().add(yearStep, 'year').add(monthSetp, 'month');
  year.value = day.get('year');
  month.value = day.get('month');
}
let max = 0;
const listData = ref<ClassifyItem[]>([]);

const chart1 = ref<HTMLElement | null>(null);

onMounted(() => {
  setDate(0, 0);
  initCategory();
});

async function initCategory() {
  let { data } = await Category.getList()
  for (let index = 0; index < data.data.length; index++) {
    const item = data.data[index];
    categoryMap.value.set(item.id, item.name);
  }
  initData();
}
async function initData() {
  let { data } = await Sale.history(50, 1);
  let { data: data1 } = await Sale.history(50, (data.data.pages - 1) <= 0 ? 1 : (data.data.pages - 1));
  let tempMap: Map<number, number> = new Map();
  for (let index = 0; index < data1.data.records.length; index++) {
    const item = data1.data.records[index] as Sale.HistoryDTO;
    if (!tempMap.get(item.product.category)) tempMap.set(item.product.category, 0);
    tempMap.set(item.product.category, Number(tempMap.get(item.product.category)) + 1)
  }
  tempMap.forEach((value, key) => {
    if (value > max) max = value;
    listData.value.push({
      name: categoryMap.value.get(key) ?? '无分类',
      num: value,
    })
  })
  const myChart = echarts.init(chart1.value);
  updateChart(myChart);
}

function updateChart(myChart: echarts.ECharts) {
  const option = {
    title: {
      text: '商品分类购买占比',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#666',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      show: false,
      min: 0,
      max: max,
      inRange: {
        colorLightness: [0, 0.6],
      },
    },
    series: [
      {
        name: '购买占比',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: listData.value.map(item => ({
          value: item.num,
          name: item.name,
        })).sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          color: '#666',
        },
        labelLine: {
          lineStyle: {
            color: '#666',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx: number) {
          return Math.random() * 200;
        },
      },
    ],
  };

  myChart.setOption(option);
}
</script>

<style scoped>
.chartcontainer {
  height: 400px;
}
</style>