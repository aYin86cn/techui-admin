<script setup>
import componentRegister from "@view/navigation/register";
import { getCurrentInstance, onMounted, reactive } from "vue";
const {proxy:{$tState,$tService,isActAdminFeatures}}=getCurrentInstance();
const {$ADMIN}=$tService

const state=reactive({
  routerNavConfig:{
    options:[
      {label:"工作台",path:"/"},
      {label:"组件Nav",path:"/componentNav"},
      {label:"组件Tab",path:"/componentTab"},
      {label:"T3D",path:"/t3DPanel"},
      {label:"CEMT-Home",path:"/sysCEMT/home"},
      {label:"CEMT-Safe",path:"/sysCEMT/safe"},
      {label:"CEMT-Equipment",path:"/sysCEMT/equipment"},
      {label:"CEMT-Product",path:"/sysCEMT/product"},
      {label:"CEMT-ProductV2",path:"/sysCEMT/productv2"},
      {label:"CEMT-ProductV3",path:"/sysCEMT/productv3"},
      {label:"CEMT-ProductV4",path:"/sysCEMT/productv4"},
      {label:"CEMT-Meeting",path:"/sysCEMT/meeting"},
      {label:"TechUIColor",path:"/techUIColorsV1"},
      {label:"ElementPlus",path:"/elBase"},
    ],
    triggerPosition:"right",
    triggerStyle:"react",
    triggerAni:true,
    buttonWidth:200,
    modal:true,
  },
  
})



onMounted(() => {
  const extension=[
    {label:"extendItem",type:"switch",tipContent:"通过Extension给控制面板追加全局的Toggle",value:true,title:"追加的Toggle"},
    {label:"extendArray",type:"radio",tipContent:"通过Extension给控制面板追加全局Radio",value:"item3",title:"追加的Radio",children:[
      {label:"item1",value:"item1"},
      {label:"item2",value:"item2"},
      {label:"item3",value:"item3"},
    ]},
  ]
  $tState.controlPanel.extension=extension//拓展控制面板
  // $tState.controlPanel.exclusion=["t3D"]//排除控制面板
  // $tState.controlPanel.width=300
  if(isActAdminFeatures){
    //注入默认的Tabs标签
    $ADMIN.value.tabs.push({label:"dashboard",title:"Dashboard",path:"/dashboard",icon:"tui-icon ti-home",locked:true})
    //注册的所有组件供路由初始化使用
    $ADMIN.value.componentRegister=componentRegister;
  }

})

</script>

<template>
  <TuiProvider>
    <router-view></router-view>
    <TuiRouterNav v-bind="state.routerNavConfig"/>
  </TuiProvider>
</template>

<style lang="less">
</style>



