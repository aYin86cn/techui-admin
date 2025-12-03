<script setup>
import { tInterval, tNum, tTimer } from "@techui/utils";
import { inject, onMounted, onUnmounted, reactive } from "vue";

const {$tc}=inject('$global');

const state = reactive({
  total: 0,
  chartData: {
    name: "费用总量",
    legend: ['Software', 'Hardware', 'Service', 'Security', 'Advertising'],
    // colors: [$c.bll5, $c.inl3, $c.yel3, $c.orl3, $c.rel3],
    data: [625, 352, 123, 83, 129]
  },
  chartOption: {},
  ready:false,
});


const processData = async () => {
  const { chartData } = state;
  const { legend, colors, data } = chartData;
  let processedData = [];
  let total = 0;

  legend.forEach((item, i) => {
    processedData.push({
      value: data[i],
      name: legend[i],
      itemStyle: {
        // color: colors[i]
      }
    });
    total += data[i];
  });

  state.total = total;
  state.chartOption.series[0].data = processedData;
  state.chartOption.legend.data = legend;
  await tTimer.w(1000);
  state.ready=true;
};

const processOption = () => {
  state.chartOption = {
    title: {
      show: false,
      text: "总量\n1231",
      x: 'center',
      top: '45%',
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 30
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      show: true,
      itemWidth: 14,
      itemGap: 5,
      right: '10',
      y: 'center',
      data: [],
      formatter: (name) => {
        const data = state.chartData.data;
        const legend = state.chartData.legend;
        let target=data.find((item,index)=>legend[index]==name);
        return "{a|" + name + "}" + " " + "{b|" + target + "}";
      },
      textStyle: {
        rich: {
          a: {
            fontSize: 14,
            padding: 10
          },
          b: {
            fontSize: 16,
            color: $tc('primary.base')
          }
        }
      }
    },
    series: [
      {
        name: '数据类别',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 3,
        label: {
          show: false,
          position: 'outside',
        },
        itemStyle: {
          borderRadius: 8,
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '20',
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  };
  processData();
};

onMounted(() => {
  tInterval.s('echartPieX341',() => {
    state.chartData.data=tNum.rdma({ 
      min:0, 
      max:999, 
      length:5, 
      group:1
    })[0]
    state.total=0;
    state.chartData.data.forEach(item=>{
      state.total+=item
    })
    processData()
    
  }, 10000);
  processOption()
})
onUnmounted(()=>{
  tInterval.c('echartPieX341')
})
</script>

<template>
  <div class="echart-pie02-wrap">
    <TuiEcharts 
      :ready="state.ready"
      :chartOption="state.chartOption"
    >
      <div class="unit">单位：万元</div> 
      <div class="total-digital">
        <span class="desc">{{ state.chartData.name }}</span>
        <TuiDigitalRolling class="counter" size="small" :value="state.total" :interval="1000" :dislocation="false"></TuiDigitalRolling>
      </div>
    </TuiEcharts>
  </div>
</template>

<style lang="less">
.echart-pie02-wrap { height: 100%;
  .portlet-tabs { position: absolute; top: 0; right: 0; padding: 0 10px; z-index: 10; }
  .total-digital { pointer-events: none; overflow: hidden; text-align: center; width: 140px; height: 100px; .poa; top: 40%; left: 13%;
    .desc { display: block; .fc(var(--primary-base)); font-size: 20px; margin: 0; }
    .counter { }
  }
  .unit { .poa; right: 10px; bottom: 10px; }
}
</style>