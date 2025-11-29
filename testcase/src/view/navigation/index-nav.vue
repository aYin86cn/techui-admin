<script setup>
import { flatToTree, tObj, tTimer } from "@techui/utils";
import { onBeforeMount, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

import { defineAsyncComponent, inject, onMounted, reactive, watch } from 'vue';
const {$tState,updateRouteQuery,$gPlatform}= inject('$global');

import menu from "./menu";
import register from "./register";

const covertMenu=()=>{
  state.navData= flatToTree(menu);
}

const components={
  ...register
}

const defAsyncComp=()=>{
  for(let a in components){
    components[a]=defineAsyncComponent(components[a])
    
  }
  // defineAsyncComponent
}

const router = useRouter();
const route = useRoute();

const state=reactive({
  compsRaw:{},
  actQuery:"1",
  actLabel:"dashboard",
  isCollapse:false,
  navData:[ ],
  loading:true,
  adaptiveType:"extension",// fixed flexible stretch extension
  adaptiveCfg:{
    shadow:true,
    monitorRatio:true,
    // tipAutoShow:false,
  },
  adaptiveAdvCfg:{
    showPenetration:true,
  },
  navConfig:{
    direction:"v",
    ellipsis:true,
    accordion:false,
    lineHeight:50,
    defaultOpened:null,
    defaultActive:null
  }
})

provide('adaptiveCfg',{
  adptBase:state.adaptiveCfg,
  adptAdva:state.adaptiveAdvCfg,
})

const toggleSiderAct=()=>{
  state.isCollapse=!state.isCollapse
}
const handleOpen = (obj) => {
  // console.log("handleOpen",obj)
}
const handleClose = (obj) => {
  // console.log("handleClose",obj);
}
const handleChange = (obj) => {
  console.log("handleChange",obj);
  state.actQuery=obj.pathStr
  state.actLabel=obj.item.label;
  // console.log("handleChange",obj);
  updateRouteQuery({
    navQuery:state.actQuery,
    navLabel:state.actLabel,
  })
}

watch(()=>route.query,(val,old)=>{
  // console.log("route.query----------------");
  // state.actQuery=val.navQuery
},{deep:true})

onBeforeMount(()=>{
  covertMenu()
})

onMounted(() => {
  // console.log("index-nav----------------");
  defAsyncComp()
  // Object.keys(components).forEach(key => {
  //   state.compsRaw[key] = markRaw(components[key]);
  // });
  // console.log("router",router);
  // console.log("route",route);
  // console.log("tObj.ieEmpty",tObj.isEmpty(route.query),route.query);
  if(tObj.isEmpty(route.query)){
    updateRouteQuery({
      navQuery:state.actQuery,
      navLabel:state.actLabel
    })
  }else{
    state.actQuery=route.query.navQuery
    state.actLabel=route.query.navLabel
  }
  const navArr=state.actQuery.split("-");
  state.navConfig.defaultActive=navArr;
  state.navConfig.defaultOpened=navArr.slice(0,-1);
  
  tTimer.s("loading",()=>{
    state.loading=false
  },2000)
})

</script>
<template>
  <TuiAdaptive v-bind="state.adaptiveCfg" v-model:adaptiveType="state.adaptiveType" v-model:loading="state.loading">
    <div :class="[
      'comps-demo-nav-wrap',
      `comps-cur-${state.actQuery}`,
    ]">
      <div class="tui-cda-sider" :class="state.isCollapse?'is-collapse':'is-expand'" >
        <div class="tui-logo-wrap">
          <TuiSystemLogo textAppearance="white" :collapse="state.isCollapse" :logoSize="40"/>
        </div>
        <TuiNav class="tui-cda-nav" :data="state.navData"
          v-bind="state.navConfig"
          :collapse="state.isCollapse"
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
        />
        <div class="tui-cda-assist"  @click="toggleSiderAct">
          <i class="tui-icon ti-arrow-from-right"></i>
        </div>
      </div>
      <div class="tui-cda-cont">
        <TuiToggleControlPanel class="controlPanel-btn" appearance="iconButton"/>
        <component :is="components[state.actLabel]"></component>
      </div>
    </div>
  </TuiAdaptive>
</template>
<style lang="less">
.comps-demo-nav-wrap{.poa; inset:0; display: flex; pointer-events: all;
  &:not( .comps-cur-2B-2B2,.comps-cur-2A-2A1){
    .bgc(var(--common-bg_layer));
    .tui-cda-cont{.bgc(var(--common-bg_layer));}
  }
  .tui-cda-sider{.por; .flex; flex-direction: column;
    .bxsi(20%,@bk,5px,-5px);
    .tui-logo-wrap{.centerFlex; .bgc(var(--shadow-weaker)); padding:5px 0; 
      .tui-logo{--tui-logo-fz:18px;}
    }
    .bdr(var(--common-bd)); 
    background-image: linear-gradient(45deg,var(--sider-bg-grad_pri),var(--sider-bg-grad_sec) 50%,var(--sider-bg-grad_thi));
    &.is-collapse{width: 60px; padding:0 0 60px 0;
      .tui-cda-assist{
        .tui-icon{transform: rotate(180deg);}
      }
    }
    &.is-expand{width: 220px;}
    .tui-cda-assist{cursor: pointer; height: 40px; width: 40px; .bgc(var(--shadow-base)); .bdra(5px); .poa; right:10px; bottom:10px; .centerFlex; z-index: 10;
      .tui-icon{ .ani(.2s); .fc(fade(@wh,60%)); font-size:16px;}
    }
  }
  
  .tui-cda-nav{  flex:1; height:1px;
    --tui-nav-fc:fade(@wh,60%);
    --tui-nav-fc_hov:var(--primary-base);
    --tui-nav-fc_act:var(--primary-base);

    --tui-nav-bg:transparent;
    --tui-nav-bg_hov:var(--tone-strongest_op1);
    --tui-nav-bg_act:var(--tone-strongest_op3);

    --tui-nav-pd:20px;
    --tui-nav-collapse-width:60px;
    --tui-nav-level-line:var(--trans-light-10);
    .tui-nav-content{
      &:before{position: absolute; content:" ";.ani(1s); .bgc(@tr); box-shadow:0 0 30px 4px @tr; .bdra(0 5px 5px 0); width: 3px; height:36px; left:0; top:50%; .fixc("y");}
      &.is-active:not(.is-opened),
      &.is-current{ .bgc(var(--sider-bg_act));
        &:before{ .bgc(var(--sider-focus)); box-shadow:0 0 30px 4px var(--sider-focus); }
      }
    }
    --tui-scroll-track:transparent;
  }
  .toggle-cp-btn{margin:0 5px;}
  .tui-cda-cont{flex:1; overflow: auto; .por;
    .controlPanel-btn{.poa; right:4px; top:4px;z-index: 10; }
  }
}
.penetration-wrap{.centerFlex; .centerAbsolute; .bgc(@rel5); .bgc(var(--primary-base_op2)); .bd(var(--tone-strongest),1px); margin:50px 0 0 0; .bdra(50%); height: 200px; width: 200px; font-size: 12px; }
</style>
