<script setup>
import { tInterval, tNum } from "@techui/utils";
import { onMounted, onUnmounted, reactive, ref } from 'vue';

const config = reactive({
  duration:600,
  gap: 4,
  size:"default",
  flipMode:"shortest",
  appearance:"default",
  bordered:false,
  dropShadow:false,
})

const reset = ref(false);

const state = reactive({
  radioCfg: { appearance: "button", defaultIcon: false },
  
  boolOpt: [
    { label: "是", value: true },
    { label: "否", value: false },
  ],
  sizeOpt: [
    { label: "特大", value: "huge" },
    { label: "大", value: "large" },
    { label: "中", value: "default" },
    { label: "小", value: "small" },
  ],
  modeOpt: [
    { label: "智能", value: "smart" },
    { label: "向下", value: "downOnly" },
    { label: "最短", value: "shortest" },
  ],
  apperOpt: [
    { label: "默认", value: "default" },
    { label: "反转", value: "reverse" },
  ],
  
  durationOpt: [
    { label: "300ms", value: 300 },
    { label: "600ms", value: 600 },
    { label: "1000ms", value: 1000 },
    { label: "10000ms", value: 10000 },
  ],
  
  gapOpt: [
    { label: "2px", value: 2 },
    { label: "4px", value: 4 },
    { label: "8px", value: 8 },
  ],

  flipArr: [
    {
      title: "随机数字(5秒更新)",
      value: 12345,
      config: {}
    },
    {
      title: "自动递增(3秒更新)",
      value: 0,
      config: {}
    },
    {
      title: "组件控制",
      value: 0,
      config: {}
    },
    {
      title: "带小数点",
      value: 123.45,
      config: {}
    },
    {
      title: "千分位格式化",
      value: 123456,
      config: { useGrouping: true }
    },
    {
      title: "后缀",
      value: 1234,
      config: { suffix: "%" }
    },
    {
      title: "前缀",
      value: 1234,
      config: { prefix: "$" }
    },
    {
      title: "前后缀",
      value: 123,
      config: { prefix: "产值", suffix: "吨" }
    },
    {
      title: "延迟3秒后触发动画",
      value: 12345,
      config: { delay: 3000 }
    },
    {
      title: "时间",
      value: "12:22:35",
      config: {}
    },
    {
      title: "快速翻牌(300ms)",
      value: 88888,
      config: { duration: 300 }
    },
    {
      title: "慢速翻牌(1200ms)",
      value: 99999,
      config: { duration: 1200 }
    },
    {
      title: "自定义样式",
      value: 12345,
      config: { customClass: "flip-custom" ,size:"custom",appearance:"custom"}
    },
  ],
})

const getResetNum = (value) => {
  const str = String(value);
  let strNum = str.replace(/\d/g, '0');
  return strNum
}

onMounted(() => {
  tInterval.s('digitalFlipx32',() => {
    state.flipArr[0].value=tNum.rdm(1000,99999)
    state.flipArr[1].value++
  }, 10000)
})

onUnmounted(() => {
  tInterval.c('digitalFlipx32');
})
</script>

<template>
  <div class="digital-flip-demo-wrap">
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
      <TuiFormItem label="翻牌速度" prop="duration">
        <TuiRadio v-bind="state.radioCfg" v-model="config.duration" :options="state.durationOpt"></TuiRadio>
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
      <TuiFormItem label="翻牌模式" prop="flipMode">
        <TuiRadio v-bind="state.radioCfg" v-model="config.flipMode" :options="state.modeOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="3号翻牌器值" prop="value">
        <TuiInput type="number" v-model="state.flipArr[2].value" style="width:120px"></TuiInput>
      </TuiFormItem>
      
    </TuiForm>
    
    <div class="demo-inner">
      <div 
        :class="[
          'demo-box',
          'demo-box-col4',
          item.colMark && `demo-box-mark-${item.colMark}`,
        ]" 
        v-for="(item, index) in state.flipArr" 
        :key="index"
      >
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item">
          <TuiDigitalFlip 
            :value="reset ? getResetNum(item.value) : item.value" 
            v-bind="{ ...config, ...item.config }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.digital-flip-demo-wrap { min-height:100%; width:100%; margin:0 auto; padding:20px 20px 100px 20px; .por;
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
      &.demo-box-col4{width:calc(25% - 30px); height:200px;}
    }
  }
  .flip-custom{

    --tui-dflip-fz: 20px;
    --tui-dflip-lh: 24px;
    --tui-dflip-w: 24px;
    --tui-dflip-h: 30px;
    
    --tui-dflip-fc: @orl1;
    --tui-dflip-fc_alt: @orl3;
    --tui-dflip-bg: @pul5;
    --tui-dflip-bg_alt: @pul6;
    --tui-dflip-bd:  @pul7;
  }
}
</style>