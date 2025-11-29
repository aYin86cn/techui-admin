<script setup>
import { reactive, toRefs } from "vue";
import TechUIColorsMatch from "./colorMatch.vue";
// import TechUIColorsV1 from "./colorsV1.vue"
// import TechUIColorsV2 from "./colorsV2.vue"
const state=reactive({
  tabConfig:{
    tabs:[
      {title:"TechUIColor Match"},
      {title:"TechUIColor V1"},
      {title:"TechUIColor V2"},
    ],
    current:0,
  },
})
const {current}=toRefs(state.tabConfig)
</script>
<template>
  <div class="techUIColors-layout">
    <TechUIColorsMatch v-if="current==0"></TechUIColorsMatch>
    <!-- <FloatTabs :tabConfig="state.tabConfig"></FloatTabs>
    <TechUIColorsV1 v-if="current==1"></TechUIColorsV1>
    <TechUIColorsV2 v-if="current==2"></TechUIColorsV2> -->
  </div>
</template>
<style lang="less">
.techUIColors-layout{
  .float-tabs{top:20px; z-index: 2;}
}
</style>