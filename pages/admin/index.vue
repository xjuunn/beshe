<template>
  <div>
    <canvas ref="chartDom" id="main" width="600" height="400"></canvas>
    <button class="btn btn-primary" @click="test">Test</button>
    <!-- <div class="toast" :style="`margin-bottom: ${15 + 46 + 10 + 46 + 10}px`">
      <div class="alert alert-warning alert-horizontal">test</div>
    </div>
    <div class="toast" :style="`margin-bottom: ${15 + 46 + 10}px`">
      <div class="alert alert-error alert-horizontal">test</div>
    </div>
    <div class="toast">
      <div class="alert alert-warning alert-horizontal">test</div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
let chartDom = ref(null);
onMounted(() => {
  initChart()
})

function initChart() {
  let myChart = echarts.init(chartDom.value!);
  let option: EChartsOption;
  const data: number[] = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  option = {


    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 3
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          color: '#fff'
        }
      }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };
  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          type: 'bar',
          data
        }
      ]
    });
  }
  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);
  option && myChart.setOption(option);
}

function test() {
  createToast('测试一下',{
    type:'warning',
    icon:'grommet-icons--test'
  })
}


</script>
<style lang="css" scoped>
.test {
  transform: translateX(100px);
  transform: rotate(30deg);
}
</style>