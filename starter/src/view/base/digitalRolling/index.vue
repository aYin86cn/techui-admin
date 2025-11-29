<script setup>
import { tInterval, tNum } from "@techui/utils";
import { onMounted, onUnmounted, reactive, ref } from 'vue';
const config=reactive({
  interval:2000,
  appearanceLayer:"group",
  appearance:"default",
  size:"default",
  gap:4,
  bordered:false,
  dropShadow:false,
})

const reset=ref(false);

const state=reactive({
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  boxedAppeaOpt:[
    {label:"元素",value:"item"},
    {label:"组",value:"group"},
    {label:"无",value:"none"},
  ],
  sizeOpt: [
    { label: "特大", value: "huge" },
    { label: "大", value: "large" },
    { label: "中", value: "default" },
    { label: "小", value: "small" },
  ],
  apperOpt: [
    { label: "默认", value: "default" },
    { label: "反转", value: "reverse" },
  ],
  gapOpt: [
    { label: "无", value: 0 },
    { label: "2px", value: 2 },
    { label: "4px", value: 4 },
    { label: "8px", value: 8 },
  ],
  digitialArr:[
    {title:"常规",
      value:12345,
      config:{dislocation:false}
    },
    {title:"错位滚动(用于时钟或实时数字)",
      value:12345,
      config:{dislocation:true,interval:500}
    },
    
    {title:"后缀",
      value:12345,
      config:{dislocation:false,suffix:"%"}
    },
    {title:"前缀",
      value:673,
      config:{dislocation:false,prefix:"$"}
    },
    {title:"前后缀",
      value:368,
      config:{dislocation:false,prefix:"产值",suffix:"吨"}
    },
    
    {title:"延迟5秒后触发动画",
      value:12345,
      config:{dislocation:false,delay:5000}
    },
    {title:"间隙10px",
      value:12345,
      config:{dislocation:false,gap:10}
    },
    {
      title: "时间",
      value: "12:22:35",
      config: {}
    },
    {title:"带小数点(滚动排除标点)",
      value:"123.4",
      config:{dislocation:false,interval:3000}
    },
    {title:"千分位格式化(滚动排除标点)",
      value:1234,
      config:{dislocation:false,useGrouping:true,interval:3000}
    },
    {title:"带小数点(滚动包含标点)",
      value:"123.4",
      config:{dislocation:false,interval:3000,includeSymbols:true}
    },
    {title:"千分位格式化(滚动包含标点)",
      value:1234,
      config:{dislocation:false,useGrouping:true,interval:3000,includeSymbols:true}
    },

    {title:"自定义",
      value:12345,
      config:{dislocation:false,customClass:"tui-dr-custom",size:"custom",appearance:"custom"}
    },
  ],
  
})

const getResetNum = (value) => {
  const str = String(value);
  let strNum = str.replace(/\d/g, '0');
  return strNum
}
onMounted(()=>{
  tInterval.s('digitalRollingx31',() => {
    state.digitialArr[0].value=tNum.rdm(1000,99999)
    state.digitialArr[1].value++
  }, 10000)
})
onUnmounted(()=>{
  tInterval.c('digitalRollingx31');
})
</script>
<template>
  <div class="digital-rolling-demo-wrap">
    <TuiForm class="operat-bar" :model="config" inline labelPosition="top">
      <TuiFormItem label="置零" prop="reset">
        <TuiRadio v-bind="state.radioCfg" v-model="reset" :options="state.boolOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="边框" prop="bordered">
        <TuiRadio v-bind="state.radioCfg" v-model="config.bordered" :options="state.boolOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="阴影" prop="dropShadow">
        <TuiRadio v-bind="state.radioCfg" v-model="config.dropShadow" :options="state.boolOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="外观层" prop="appearanceLayer">
        <TuiRadio v-bind="state.radioCfg" v-model="config.appearanceLayer" :options="state.boxedAppeaOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="数字间隙" prop="gap">
        <TuiRadio v-bind="state.radioCfg" v-model="config.gap" :options="state.gapOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="外观" prop="appearance">
        <TuiRadio v-bind="state.radioCfg" v-model="config.appearance" :options="state.apperOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="大小" prop="size">
        <TuiRadio v-bind="state.radioCfg" v-model="config.size" :options="state.sizeOpt"></TuiRadio>
      </TuiFormItem>

    </TuiForm>
    <div class="demo-inner">
      
      
      <div :class="[
          'demo-box',
          `demo-box-col4`,
          item.colMark&&`demo-box-mark-${item.colMark}`,
          
        ]" v-for="(item,index) in state.digitialArr">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" >
          <TuiDigitalRolling :value="reset?getResetNum(item.value):item.value" v-bind="{...config,...item.config}"/>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="less">
.digital-rolling-demo-wrap{ min-height:100%; width:100%; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ .centerFlex; width:calc(33.333% - 30px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:100px; padding:70px 20px 40px 20px;
      .demo-title{.poa; left:10px; top:10px;}
      .demo-item{width: 100%; height: 100%; .centerFlex;}
      &.demo-box-mark-varColor{
        --tui-pgspol-gad_A:@pul5;
        --tui-pgspol-gad_B:@vil3;
      }
      &.demo-box-mark-dirv{padding:30px 30px 10px 30px;}
      &.demo-box-mark-circle{padding:20px;}
      &.demo-box-col5{width:calc(20% - 32px); height:200px;}
      &.demo-box-col4{width:calc(25% - 30px); height:200px;}
      &.demo-box-group{height: 330px; padding:50px 20px 20px 20px;}
    }
  }
  .tui-dr-custom{
    --tui-droll-fz: 20px;
    --tui-droll-lh: 24px;
    --tui-droll-w: 24px;
    --tui-droll-h: 30px;
    --tui-droll-fc: @orl1;
    --tui-droll-fc_alt: @orl3;
    --tui-droll-bg: @pul5;
    --tui-droll-bg_alt: @pul6;
    --tui-droll-bd:  @pul7;
    --tui-droll-shadow:var(--shadow-weaker);
    &.tui-appea-boxed-none{--tui-droll-fc:@pul5;}
  }
}
</style>
