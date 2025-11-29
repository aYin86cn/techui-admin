<script setup>
import { $c } from "@techui/colors";
import { tNum, tTimer } from "@techui/utils";
import { inject, onMounted, reactive, watch } from "vue";

const {$tc}=inject('$global');

const state = reactive({
  current: 0,
  total: 0,
  tabCfg:{appearance:"simple", faceTo:"down", hideBaseLine:true,
    options:[
      {label:"年度收入"},
      {label:"年度开支"},
    ]
  },
  chartData: [
    {
      name: "年度收入",
      legend: ['Software', 'Hardware', 'Service', 'Security', 'Advertising'],
      colors: $c.scale([$c.cyl3, $c.yel3, $c.orl3, $c.rel3],5),
      data: [625, 352, 123, 83, 129]
    },
    {
      name: "年度开支",
      legend: ['Manpower', 'Business', 'Logistics', 'Travel', 'Bonuses', 'Supplies'],
      colors: $c.scale([$c.inl5, $c.bll3, $c.aql5, $c.yel3],6),
      data: [15, 72, 43, 13, 20, 30]
    }
  ],
  chartOption: {},
  ready:false,
});

const props = defineProps({
  tabActive: [Boolean, Number, String]
});

const tabClick = (index) => {
  state.current = index;
  processData();
};

const processData = async () => {
  const { current, chartData } = state;
  const { legend, colors, data } = chartData[current];
  let processedData = [];
  let total = 0;

  legend.forEach((item, i) => {
    processedData.push({
      value: data[i],
      name: legend[i],
      itemStyle: {
        color: colors[i]
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
        color: $c.bll5,
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
      formatter: (name,value) => {
        const data = state.chartData[state.current].data;
        const legend = state.chartData[state.current].legend;
        let target=data.find((item,index)=>legend[index]==name);
        return "{a|" + name + "}" + " " + "{b|" + (target||'') + "}";
      },
      textStyle: {
        rich: {
          a: {
            fontSize: 14,
            padding: 10
          },
          b: {
            fontSize: 16,
            color:$tc('primary.base')
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

watch(
  () => props.tabActive,
  (val) => {
    const tempData = tNum.rdma({
      min: 1,
      max: 999,
      length: 5,
      group: 2
    });
    state.chartData[0].data = tempData[0];
    state.chartData[1].data = tempData[1];
    processData();
  }
);

onMounted(() => {
  processOption();
});
</script>

<template>
  <div class="echart-pie03-wrap">
    <TuiEcharts 
      :ready="state.ready"
      :chartOption="state.chartOption"
    >
      <div class="unit">单位：万元</div> 
      <TuiTabs class="portlet-tabs" @change="tabClick" v-model="state.current" v-bind="state.tabCfg"/>
      <div class="total-digital">
        <span class="desc">{{ state.chartData[state.current].name }}</span>
        <TuiDigitalRolling class="counter" appearanceLayer="none" :gap="0" :value="state.total" :interval="1000" :dislocation="false"></TuiDigitalRolling>
      </div>
    </TuiEcharts>
  </div>
</template>

<style lang="less">
.echart-pie03-wrap { height: 100%;
  .portlet-tabs { position: absolute; top: 0; right: 0; padding: 0 10px; z-index: 10; }
  .total-digital { pointer-events: none; overflow: hidden; text-align: center; width: 140px; height: 100px; .poa; top: 40%; left: 13%;
    .fc(var(--font-normal));
    .desc { display: block; .fc(var(--primary-base)); font-size: 20px; margin: 0; }
    .counter {  }
  }
  .unit { .poa; right: 10px; bottom: 10px; }
}
</style>