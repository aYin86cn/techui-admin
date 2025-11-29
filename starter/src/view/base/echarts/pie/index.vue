<script setup>
import { reactive } from "vue";
import Pie01 from "./components/01.vue";
import Pie02 from "./components/02.vue";
import Pie03 from "./components/03.vue";
import Pie04 from "./components/04.vue";

const components={
  Pie01,
  Pie02,
  Pie03,
  Pie04,
}

const state=reactive({
  portlets:[
    {
      label:"统计数据 图例底部",
      slotName:"cell-0-0",
      component:"Pie01"
    },
    {
      label:"统计数据 图例右侧",
      slotName:"cell-0-1",
      component:"Pie02"
    },
    {
      label:"标签",
      slotName:"cell-0-2",
      component:"Pie03"
    },
    {
      label:"双饼图",
      slotName:"cell-1-0",
      component:"Pie04"
    },
    
  ]
})

</script>
<template>
  <div class="echartsInit-demo-wrap">
    <TuiGrid :rows="2" :cols="3" :gap="30">
      <template v-for="item in state.portlets" :key="item.slotName" #[item.slotName]>
        <div class="portlet-header">{{ item.label }}</div>
        <component :is="components[item.component]"></component>
      </template>
    </TuiGrid>
    <TuiGrid :rows="1" :cols="2" :gap="30">
      
    </TuiGrid>
  </div>
</template>
<style lang="less">
.echartsInit-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:40px 20px;
  .tui-grid-wrap{
    &:nth-child(2){margin-top:30px;}
    .tui-grid-item{height:300px; .por; .bdra(10px);
      .portlet-header{.poa; left:10px; top:10px;}
    }
  }
}
</style>
