<script setup>
import { tObj, tTimer } from "@techui/utils";
import { getCurrentInstance, inject, onMounted, reactive } from 'vue';
const {proxy:{$tLoading,$tLoadingClose}}=getCurrentInstance();
const {initSpinner,$tState}= inject('$global');
const state=reactive({
  loadingAreaShow:true,
  loadingFullShow:false,
  loadingDesc:"组件调用 Loading",
  initCfg:{
    full:{name:"blocksA"},
    area:{name:"pointA"},
  },
  radioCfg:{ direction:"v", appearance:"button", size:"small", defaultIcon:false, },
  
  spinnerOpt:[
    {label:"barsA",value:"barsA"},
    {label:"barsB",value:"barsB"},
    {label:"barsC",value:'barsC'},
    {label:"blocksA",value:'blocksA'},
    {label:"blocksB",value:'blocksB'},
    {label:"blocksC",value:'blocksC'},
    {label:"clock",value:'clock'},
    {label:"pointA",value:'pointA'},
    {label:"pointB",value:'pointB'},
    {label:"pointC",value:'pointC'},
    {label:"pulseDotA",value:'pulseDotA'},
    {label:"pulseDotB",value:'pulseDotB'},
    {label:"pulseDotC",value:'pulseDotC'},
    {label:"pulseRingA",value:'pulseRingA'},
    {label:"pulseRingB",value:'pulseRingB'},
    {label:"pulseRingC",value:'pulseRingC'},
    {label:"ringA",value:'ringA'},
    {label:"ringB",value:'ringB'},
    {label:"ringC",value:'ringC'},
  ],
})

const toggleLoadArea=()=>{
  state.loadingAreaShow=!state.loadingAreaShow
}
const toggleLoadFull=()=>{
  state.loadingFullShow=!state.loadingFullShow
  tTimer.s("hideLoading",()=>{
    state.loadingFullShow=false
  },3000)
}
const toggleLoadFullGlobal=()=>{
  $tLoading({
    appendTo:"#app",
    visible: true,
    desc:"全局方法 Loading"
  })
  tTimer.s("hideLoadingGlobal",()=>{
    $tLoadingClose()
  },3000)
}

const areaChange=(val)=>{
  initSpinner(state.initCfg)
}

const fullChange=(val)=>{
  initSpinner(state.initCfg)
}

onMounted(() => {
  //读取tState设置并还原
  const tuiCfg=$tState.spinnerConfig
  state.initCfg=tObj.dpm(state.initCfg,tuiCfg)
})
</script>
<template>
  <div class="loading-demo-wrap">
    
    <div class="demo-inner">
      <div class="demo-box">
        <TuiRadio v-bind="state.radioCfg" @change="areaChange" v-model="state.initCfg.area.name" :options="state.spinnerOpt"></TuiRadio>
        <div class="demo-box-content">
          <div class="demo-title">区域laoding</div>
          <TuiButton class="tui-button-loadarea" @click="toggleLoadArea">切换Loading</TuiButton>
          <TuiLoadingArea :visible="state.loadingAreaShow"/>
        </div>
      </div>
      <div class="demo-box demo-box-full">
        <TuiRadio v-bind="state.radioCfg" @change="fullChange" v-model="state.initCfg.full.name" :options="state.spinnerOpt"></TuiRadio>
        <div class="demo-box-content">
          <div class="demo-title">全局laoding</div>
          <TuiButton class="tui-button" @click="toggleLoadFull">组件方式调用</TuiButton>
          <TuiButton class="tui-button" @click="toggleLoadFullGlobal">全局方法调用</TuiButton>
          <TuiLoadingFull appendTo="body" :visible="state.loadingFullShow" :desc="state.loadingDesc"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.loading-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ overflow: hidden; width:calc(50% - 20px); .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; .flex;
      .demo-box-content{ .por; flex:1;
        .tui-button-loadarea{.poa; top:10px; left:50%; .fixc("x"); }
        .demo-title{padding:10px; .poa; right:0; top:0;}
      }
      .tui-radio{margin:0 0 0 -1px; height:300px; width:100px; overflow: auto; flex-wrap: nowrap;
        .tui-radio-item{border-radius: 0!important;}
      }
    }
    .demo-box-full{
      .demo-box-content{.centerFlex;}
    }
  }
}
</style>
