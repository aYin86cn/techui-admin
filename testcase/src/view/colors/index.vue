<script setup>
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Layout from './layout.vue';
const { $route } = getCurrentInstance().proxy;
const {$tState,$deviceInfo,$tBus}= inject('$global');
const scarollBar = ref(true);

const loading=ref(false)

watch(()=>$route, (to, from) => {
});
onMounted(() => {
  $tBus.on("dialogShow",(dialogShow)=>{
    if(dialogShow){
      scarollBar.value=false
      }else{
      scarollBar.value=true
    }
  })

});

onBeforeUnmount(() => {
  $tBus.off("dialogShow")
  // tTimer.s("notify1");
  
});

</script>
<template>
    <Layout></Layout>
  <!-- <TuiAdaptive adaptiveType="extension" v-model:loading="loading" :class="`TechUIColor-AP ${scarollBar?'scroll':'noScroll'}`"> -->
  <!-- </TuiAdaptive> -->
</template>

<style lang="less">
.TechUIColor-AP{
  &.noScroll{
    .adaptiveObject{overflow: hidden;}
  }
}
// .TechUIColor-AP{::-webkit-scrollbar{width:2px; height:2px;}}
</style>