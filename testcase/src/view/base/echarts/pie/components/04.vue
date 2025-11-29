<script setup>
import { $c } from "@techui/colors";
import { tTimer } from "@techui/utils";
import { onMounted, reactive } from "vue";

const state = reactive({
  counter:[
    {label:"饼图A占比",value:42.6},
    {label:"饼图B占比",value:52.4},
  ],
  descValue:38,
  descPct:47.5,
  chartData: {
    title: ["总计23", "总计18"],
    legend: [
      ['A类', 'B类', 'C类'],
      ['D类', 'E类']
    ],
    colors: [
      [$c.aqm5, $c.cym5, $c.cbm5],
      [$c.rem4, $c.orm4]
    ],
    center: [
      ['30%', '50%'],
      ['70%', '50%'],
    ],
    data: [
      [1831, 993, 731],
      [172, 181],
    ],
  },
  chartOption: {},
  ready:false,
});

const processData =async () => {
  const { legend, colors, data, center } = state.chartData;
  let processedData = [], processLegend = [];
  
  data.forEach((item, i) => {
    let tempData = [];
    data[i].forEach((sub, j) => {
      tempData.push({
        value: data[i][j],
        name: state.chartData.legend[i][j],
        itemStyle: {
          color: colors[i][j]
        }
      });
    });
    
    processedData.push({
      name: 'dataType',
      type: 'pie',
      radius: ['25%', '45%'],
      center: center[i],
      avoidLabelOverlap: false,
      padAngle: 5,
      label: {
        show: false,
        position: 'outside',
      },
      itemStyle: {
        borderRadius: 5,
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '20',
          color: $c.gyd5,
        }
      },
      labelLine: {
        show: false
      },
      data: tempData
    });
  });

  legend.forEach((leg, i) => {
    processLegend.push({
      orient: 'vertical',
      show: true,
      left: i == 0 ? '0%' : null,
      right: i == 1 ? '0%' : null,
      y: 'center',
      itemWidth: 15,
      // width: "100px",
      data: leg,
      textStyle: {
        fontSize: 14,
      },

    });
  });

  state.chartOption.series = processedData;
  state.chartOption.legend = processLegend;
  state.chartOption.title[0].text = state.chartData.title[0];
  state.chartOption.title[1].text = state.chartData.title[1];
  await tTimer.w(1000);
  state.ready=true;
};

const processOption = () => {
  state.chartOption = {
    title: [
      {
        text: "",
        left: '29%',
        top: '44%',
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          lineHeight: 24
        },
        textAlign: "center"
      },
      {
        text: "",
        left: '69%',
        top: '44%',
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          lineHeight: 24
        },
        textAlign: "center"
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {},
    series: []
  };
  processData();
};

const onChartReady = (chart) => {
  chart.resize();
};

onMounted(() => {
  processOption();
});
</script>

<template>
  <div class="echart-pie04-wrap">
    
    <TuiEcharts 
      :ready="state.ready"
      :chartOption="state.chartOption" 
      @chartReady="onChartReady"
    > 
      <div class="desc">关于饼图的描述，总计<b>{{state.descValue}}</b>个，全国占比<b>{{state.descPct}}</b>%</div>
      <div class="counter-wrap">
        <div class="item" v-for="item in state.counter">
          <div class="value">{{ item.value }} <span class="unit">%</span></div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </TuiEcharts>
  </div>
</template>

<style lang="less">
.echart-pie04-wrap { .por; height:100%;
  .desc{.poa; left:0; right:0; text-align: center; top:20px; font-size: 16px;
    b{margin:0 5px; font-size: 18px;}
  }
  .counter-wrap{.poa; bottom:0; left:0; right:0; .flex; gap:20px;margin:0 40px;
    .item{flex:1; text-align: center;
      .value{font-size: 18px; font-weight: bold; margin:0 0 5px 0; .fc(var(--font-base));}
    }
  }
}
</style>