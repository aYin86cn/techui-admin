<script setup>
import { tTimer } from "@techui/utils";
import { onMounted, reactive, ref } from 'vue';
import Layout from "./layout.vue";
const loading=ref(true)
const adptType=ref('fixed')// fixed advance stretch extension
const adptCfg=reactive({
  disabled:false,
  shadow:true,
  monitorRatio:true,
  // tipAutoShow:false,
})

onMounted(() => {
  tTimer.s("loading",()=>{
    loading.value=false
  },2000)
})

</script>
<template>
  <TuiAdaptive className="t3d-adaptive-wrap" v-model:adaptiveType="adptType" v-bind="adptCfg" v-model:loading="loading">
    <Layout/>
    <TuiToggleControlPanel class="toggle-cp-btn"/>
  </TuiAdaptive>
  
</template> 
<style lang="less">
.t3d-adaptive-wrap{
  .toggle-cp-btn{ .poa; right:3px; top:3px; z-index: 9; }
}
</style>