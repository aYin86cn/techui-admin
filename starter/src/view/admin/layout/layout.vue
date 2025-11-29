<script setup>
import { tTimer } from "@techui/utils";
import { inject, onMounted, provide, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import assist from "./assist.vue";

const {$t3dConfig,$gClickCounter,$gEscCounter,$gResizeCounter,$aResizeCounter,$gBackground}= inject('$global');

watch(()=>[$gClickCounter.value,$gEscCounter.value,$gResizeCounter.value,$aResizeCounter.value],([click,esc,gResize,aResize])=>{
  console.log(`ClickCounter:${click},EscCounter:${esc},GlobalResizeCounter${gResize},AdaptiveResizeCounter${aResize}`);
})

watch(()=>$t3dConfig.value.inited,(val)=>{
  console.log("$t3dConfig.value.inited",val);
})

const state=reactive({
  loading:true,
  adaptiveType:"extension",// fixed flexible stretch extension
  adaptiveCfg:{
    shadow:true,
    monitorRatio:true,
    // width:2580,
    // height:1700,
    // tipAutoShow:false,
  },
  adaptiveAdvCfg:{
    showPenetration:true,
  },
  
  crossLine:false,
  adptToggle:true,
  radioCfg:{ appearance:"button",  defaultIcon:false, direction:"v",},
  adaptiveTypeOpt:[
    {label:"延伸",value:'extension'},
    {label:"弹性",value:'flexible'},
    {label:"固定",value:'fixed'},
    {label:"拉伸",value:'stretch'},
  ],
})

const route = useRoute();
const router = useRouter();
const viewBackground=ref(false)

const pathHasViewBG=[
  '/backgroundDemo',
  '/adaptiveDemo',
  '/t3DPanel',
  '/scifiPanel',
  '/scifiHeader',
  '/scifiButton',
  '/scifiDeco',
  '/scifiGeometry',
  '/scifiPanelTitle',
  '/echartsMapDataToggle'
];

watch(()=>route.path,(path)=>{//重置背景
  if(pathHasViewBG.includes(path)){
    viewBackground.value=true
  }else{
    viewBackground.value=false
  }
},{immediate:true})


provide('adaptiveCfg',{
  adptBase:state.adaptiveCfg,
  adptAdva:state.adaptiveAdvCfg,
})

const adptToggleHide=()=>{
  state.adptToggle=false
}
const corssLineHide=()=>{
  state.crossLine=false
}

onMounted(() => {
  tTimer.s("loading",()=>{
    state.loading=false
  },2000)

})
</script>
<template>
  <TuiAdaptive v-bind="state.adaptiveCfg" v-model:adaptiveType="state.adaptiveType" v-model:loading="state.loading">
    <!--layout中的框架，除了assist和logo之外，基本没有修改需求，所以做了封装-->
    <TuiAdminLayout  :viewBackground="viewBackground">
      <template #logo>
        <div class="tui-logo-wrap">
          <TuiSystemLogo textAppearance="white" :logoSize="40"/>
        </div>
      </template>
      <template #assist>
        <assist></assist>
      </template>
    </TuiAdminLayout>
    <div class="tui-adpt-toggle" v-if="state.adptToggle&&route.path!='/loginDemo'">
      <TuiRadio v-bind="state.radioCfg" v-model="state.adaptiveType" :options="state.adaptiveTypeOpt"></TuiRadio>
      <div class="tui-close" @click="adptToggleHide">
        <i class="tui-icon ti-times"></i>
      </div>
    </div>
    <div class="tui-cross-line" v-if="state.crossLine">
      <div class="tui-close" @click="corssLineHide">
        <i class="tui-icon ti-times"></i>
      </div>
    </div>
  </TuiAdaptive>
</template>
<style lang="less">

.tui-adpt-toggle{.poa;top:50%; right:20px; .fixc("y"); z-index: 10; .flex(10px); flex-direction: column; align-items: center;
  .tui-close{width:18px; height:18px; .bgc(@rel5); .centerFlex; .bdra(50%); cursor: pointer; opacity: .5; .ani;
    .tui-icon{ .fc(@wh); font-size:10px; line-height: 1;}
    &:hover{opacity: 1;}
  }
}
.tui-cross-line{.pof; inset:0; z-index: 9000; pointer-events: none;;
  &:before,
  &:after{.poa; content:""; .bgc(@cyl5);}

  &:before{left:50%; .fixc("x"); top:0; bottom:0; width:1px;}
  &:after{top:50%; .fixc("y"); left:0; right:0; height:1px;}

  .tui-close{ pointer-events: all; .poa; .centerAbsolute; z-index: 99; width:18px; height:18px; .centerFlex; .bdra(50%); cursor: pointer; .ani;
    .tui-icon{ .fc(@cyl5); font-size: 20px;}
    &:hover{opacity: 1;}
  }
  
}
.tui-logo-wrap{.bgc(var(--shadow-weakest,fade(@bk,10%)));}
</style>
