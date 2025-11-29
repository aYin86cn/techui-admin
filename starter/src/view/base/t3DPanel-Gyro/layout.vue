<script setup>
import { inject, reactive, toRefs } from 'vue'
import Card from "./sub/card.vue"
import Chart from "./sub/chart.vue"
import IconGridApart from "./sub/iconGridApart.vue"
import IconGridUnity from "./sub/iconGridUnity.vue"

const {$tState,$gT3D,controlPanelToggle}= inject('$global');
const state=reactive({
  tabActive:0,
  tabConfig:{
    appearance:"card",
    // textDirection:"v",
    // position:"left",
    options:[
      {label:"卡片"},
      {label:"宫格独立"},
      {label:"宫格联合"},
      {label:"图表"},
    ]
  },
})
const {tabActive}=toRefs(state)
</script>
<template>
  <div class="Tui3DPanel-layout">
    <i class="icon-cog tui-icon tui-cog" @click="controlPanelToggle"></i>
    <TuiTabs class="Tui3DPanel-tabs" v-model="state.tabActive" v-bind="state.tabConfig"></TuiTabs>
    <Card v-if="tabActive==0"></Card>
    <IconGridApart v-if="tabActive==1"></IconGridApart>
    <IconGridUnity v-if="tabActive==2"></IconGridUnity>
    <Chart v-if="tabActive==3"></Chart>
  </div>
</template>
<style lang="less">
.Tui3DPanel-layout{height: 100%; .por; padding:50px 0 0 0;
  .icon-cog{.poa; right:10px; top:5px; font-size: 18px; z-index: 10; cursor: pointer; width: 24px; height: 24px; line-height: 26px; text-align: center; .bdra(5px);
    // &:before{vertical-align: text-top; }
    &:hover{.bgc(var(--primary-weak));.fc(var(--font-weakest));}
  }
  .Tui3DPanel-tabs{position:fixed; left:0; right:0; top:0; z-index: 2; .bgc(var(--common-bg)); }
}
</style>