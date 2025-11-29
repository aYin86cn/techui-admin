<script setup>
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Layout from './layout.vue';
const { $route } = getCurrentInstance().proxy;
const {$i18nt,timer,$tState,$deviceInfo,$tBus}= inject('$global');
const scarollBar = ref(true);
const adptType=ref('fixed')// fixed advance stretch extension
const adptivePanelConfig = {
  loading:false,
  width:480,
};

const loading=ref(false)

watch(()=>$route, (to, from) => {
  // console.log("dashboard1080C $route",to,from)
});
onMounted(() => {
  
});

onBeforeUnmount(() => {
  
});

</script>
<template>
  <TuiAdaptive v-bind="adptivePanelConfig" v-model:adaptiveType="adptType" v-model:loading="loading" class="Tui3DPanel-AP">
    <Layout></Layout>
  </TuiAdaptive>
</template>

<style lang="less">
.Tui3DPanel-AP{::-webkit-scrollbar{width:2px; height:2px;}}
</style>