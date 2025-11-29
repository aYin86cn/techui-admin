<script setup>
import { $c } from "@techui/colors";
import { tInterval } from "@techui/utils";

import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
const config=reactive({

  // colors:[$c.cyl5,$c.aql5],
  borderWidth:2,
  borderGap:3,
  barDash:[3,2],
  borderRadius:5,
  aniDelay:2000,
  barDirection:"h",
  labelPostion:"bottom",
  gradientType:"linear",
  resizeObserver:'global',
  // 
  // shape:"circle"
})




const state=reactive({
  colAct:'col3',
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  directionOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  labelDirOpt:[
    {label:"上",value:"top"},
    {label:"左",value:"left"},
    {label:"下",value:"bottom"},
    {label:"右",value:"right"},
  ],
  colOpt:[
    {label:"2列",value:"col2"},
    {label:"3列",value:"col3"},
    {label:"4列",value:"col4"},
  ],
  gradTypeOpt:[
    {label:"线性",value:"linear"},
    {label:"径向",value:"radial"},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
  instArryTH:[//thresholds
    {title:"阈值 常规百分比",
      config:{label:"实例标题A"}
    },
    {title:"阈值 Value 独立SubValue 精度2",
      config:{label:"实例标题D",maxValue:300,unit:"万吨",displayValue:"allReverse",indeptSubValue:true,precision:2}
    },
  ],

  instArry:[
    {title:"基础 20% 传参自定义颜色(数组)",
      config:{label:"实例标题A",value:20,colors:[$c.cyl5,$c.vil5]}
    },
    {title:"基础 60% 传参自定义颜色(单色)",
      config:{label:"实例标题B",value:60,colors:$c.cyl5}
    },
    {title:"基础 98% CSSVar自定义颜色",colMark:"varColor",
      config:{label:"实例标题E",value:98}
    },
    
    {title:"计算百分比带单位 显示SubValue",
      config:{label:"实例标题D",value:300,maxValue:200,unit:"万吨",displayValue:"all",barDash:[10,1]}
    },
    {title:"计算百分比带单位 显示SubValue Reverse",
      config:{label:"实例标题D",value:300,maxValue:200,unit:"万吨",displayValue:"allReverse",barDash:[20,2]}
    },
    {title:"计算百分比带单位 默认 渐变动画",
      config:{label:"实例标题D",value:300,maxValue:200,unit:"万吨",barDash:[0],gradientAni:true}
    },

    {title:"计算百分比 无单位 状态危急",
      config:{label:"实例标题C",value:120,maxValue:180,displayValue:"all",barDash:[2],status:'danger'}
    },
    
    {title:"圆形 Value垂直",colMark:"circle",
      config:{
        label:"实例标题C",
        value:110,
        valueSize:48,
        width:130,
        maxValue:150,
        unit:"万元",
        barDirection:"v",
        valueDirection:"v",
        shape:"circle",
        displayValue:"all",
      }
    },
    {title:"Bar垂直 Value垂直",colMark:"dirv",
      config:{
        label:"实例标题C",
        value:100,
        barDirection:"v",
        valueDirection:"v",
        width:100,
        // height:120
        // displayValue:"all",
      }
    },
    {title:"0%",
      config:{
        label:"实例标题A",
        value:0,
        width:200, 
        // barDirection:"v",
      }
    },
    {title:"圆形 Value垂直 波浪填充",colMark:"circle",
      config:{
        label:"实例标题C",
        value:110,
        valueSize:48,
        width:130,
        maxValue:150,
        unit:"万元",
        barDirection:"v",
        valueDirection:"v",
        shape:"circle",
        displayValue:"all",
        barDash:[0],
        fillContent:'wave'
      }
    },
    {title:"Bar垂直 Value垂直 波浪填充",colMark:"dirv",
      config:{
        label:"实例标题C",
        value:100,
        barDirection:"v",
        valueDirection:"v",
        width:100,
        fillContent:'wave',
        // waveGap:5,
        // waveHeight:4,
        // waveSegments:30
        // height:120
        // displayValue:"all",
      }
    },
    {title:"波浪填充 0%",
      config:{
        label:"实例标题A",
        value:0,
        width:200, 
        fillContent:'wave',
        // waveGap:5,
        // waveHeight:4,
        // waveSegments:30
      }
    },
    // {title:"水位图 100%",
    //   config:{
    //     label:"实例标题A",
    //     value:100,
    //     width:200, 
    //     fillContent:'wave',
    //     waveGap:20,
    //     waveHeight:8,
    //     waveSegments:20
    //   }
    // },
  ],
  

  groupDataV:[
    {label:"元素A",value:32},
    {label:"元素B",value:35},
    {label:"元素C",value:53},
    {label:"元素D",value:67},
    {label:"元素E",value:79},
    {label:"元素F",value:83},
    {label:"元素G较长的标题测试",value:96},
  ],
  groupDataH:[
    {label:"元素A",value:18},
    {label:"元素B",value:60},
    {label:"元素C",value:130},
    {label:"元素D",value:250},
    {label:"元素E较长的标题测试",value:300},
  ],

  
})

const ppgAConfig=computed(()=>{
  return {
    direction:"h",
    gap:1,
    progressPoolConfig:{
      width:40,
      colors:[$c.pul5,$c.cyl5],
      aniDelay:5000,
      fillContent:'wave',
      waveSegments:10,
      waveHeight:5,
      gradientAni:true,
      duration:1000,
      waveDuration:15000,
      gradientDuration:5000,
      gradientType:config.gradientType,
    }
  }
})
const ppgBConfig=computed(()=>{
  return {
    direction:"v",
    labelWidth:100,
    queueInit:false,
    progressPoolConfig:{
      thresholds:thresholdsVal,
      aniDelay:5000,
      maxValue:300,
      unit:"万吨",
      displayValue:"all",
      indeptSubValue:true,
      precision:2,
      // gradientAni:true,
    }
  }
})

const pctVal=ref(0)
const nomVal=ref(0)

const thresholdsPct={
  critical:0,
  danger:20,
  warning:39,
  normal:49,
  success:79
}
const thresholdsVal={
  critical:0,
  danger:59,
  warning:120,
  normal:180,
  success:260
}

onMounted(() => {
  tInterval.s('progressPoolX321',() => {
    pctVal.value = (pctVal.value % 100) + 10
    nomVal.value = (nomVal.value % 300) + 31.3
  }, 5000)
})

onUnmounted(()=>{
  tInterval.c('progressPoolX321')
})


</script>
<template>
  <div class="progress-pool-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">内部Bar排列方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.barDirection" :options="state.directionOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">Label位置</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.labelPostion" :options="state.labelDirOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">渐变类型</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.gradientType" :options="state.gradTypeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">自适应测试</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.colAct" :options="state.colOpt"></TuiRadio>
      </div>
      <div class="form-group group-number">
        <div class="label">边框粗细</div>
        <TuiInput type="number" :min="0" :max="10" v-model="config.borderWidth"/>
      </div>
      <div class="form-group group-number">
        <div class="label">边框间隙</div>
        <TuiInput type="number" :min="0" :max="10" v-model="config.borderGap"/>
      </div>
      <div class="form-group group-number">
        <div class="label">边框圆角</div>
        <TuiInput type="number" :min="0" :max="50" :step="5" v-model="config.borderRadius"/>
      </div>
    </div>
    <div class="demo-inner">
      
      
      <div :class="[
          'demo-box',
          `demo-box-${state.colAct}`,
          item.colMark&&`demo-box-mark-${item.colMark}`,
          
        ]" v-for="(item,index) in state.instArryTH">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" >
          <TuiProgressPool :value="index==0?pctVal:nomVal" :thresholds="index==0?thresholdsPct:thresholdsVal" v-bind="{
            ...config,
            ...item.config
          }"/>
        </div>
      </div>

      <div :class="[
          'demo-box',
          `demo-box-${state.colAct}`,
          item.colMark&&`demo-box-mark-${item.colMark}`,
          
        ]" v-for="(item,indexP) in state.instArry">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" >
          <TuiProgressPool v-bind="{
            ...config,
            ...item.config
          }"/>
        </div>
      </div>

      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">纵向组 队列初始化 渐变动画 (延时5秒播放)</div>
        <div class="demo-item" >
          <TuiProgressPoolGroup :items="state.groupDataV" :="ppgAConfig"/>
        </div>
      </div>
      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">横向组 非队列初始化 阈值 最大值 单位 独立SubValue (延时5秒播放)</div>
        <div class="demo-item" >
          <TuiProgressPoolGroup :items="state.groupDataH" v-bind="ppgBConfig"/>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="less">
.progress-pool-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ .centerFlex; width:calc(33.333% - 30px); .por; .bd(var(--common-bd)); .bdra(5px); min-height:100px; padding:70px 20px 40px 20px;
      .demo-title{.poa; left:10px; top:10px;}
      .demo-item{width: 100%; height: 100%; .centerFlex;}
      &.demo-box-mark-varColor{
        --tui-pgspol-gad_A:@pul5;
        --tui-pgspol-gad_B:@vil3;
      }
      &.demo-box-mark-dirv{padding:30px 30px 10px 30px;}
      &.demo-box-mark-circle{padding:20px;}
      &.demo-box-col2{width:calc(50% - 20px); height:250px;}
      &.demo-box-col3{width:calc(33.3333% - 28px); height:220px;}
      &.demo-box-col4{width:calc(25% - 30px); height:200px;}
      &.demo-box-group{height: 330px; padding:50px 20px 20px 20px;}
    }
  }
}
</style>
