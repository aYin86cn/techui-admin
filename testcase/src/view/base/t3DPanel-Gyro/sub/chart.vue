<script setup>
// import EchartBarHorizA from "./charts/echarts-BarHorizA.vue"
// import EchartBarHorizB from "./charts/echarts-BarHorizB.vue"
// import EchartLine from "./charts/echarts-lineA.vue"
// import EchartPie from "./charts/echarts-pieA.vue"
const {$i18nt,timer,$tState,$themePalette,$tBus}= inject('$global');

// const charts=[EchartBarHorizA,EchartBarHorizB,EchartLine,EchartPie,EchartBarHorizA]

const $theme={...$themePalette.value};

const t3DConfig={
  debug:false,
  coeff:.2,
  thicknessColor:$theme.button.bg,
  // thicknessCoeff:.1,
  // shadowCoeff:.2,
  // shadowBlur:5,
  // perspective:500,
  showShadow:true,
  // shadowTransparent:.5,
}

const techBorderConfig={
  title:"Chart Title",
  titleWidth:120,
  decoration:false,
  decorationAlt: true,
  decorationAlt: true,
  rotate: "x",
  opacity: 0.7
}

onMounted(() => {
})

</script>
<template>
  <div class="Tui3DPanel-chart-wrap">
    <div class="chart-item" v-for="(item,index) in 5">
      <Tui3DPanel :config="t3DConfig" :index="index">
        <template #default="parmas" >
          <AyinTechBorderA1 :config="techBorderConfig" v-if="index<4">
            <!-- <component :is="item"></component> -->
          </AyinTechBorderA1>
          <div :class="`demo-box ${parmas?.boxShadowName}`" v-else>
            <!-- <component :is="item"></component> -->
            <div class="inner-box"></div>
          </div>
        </template>
      </Tui3DPanel>
    </div>
    
  </div>
</template>
<style lang="less">
.Tui3DPanel-chart-wrap{ padding:30px 30px 100px 30px;  overflow: auto; .poa; inset:0;
  .chart-item{ height:250px; margin:0 0 30px 0; }
  .demo-box{.bdTech(var(--button-bd_act),var(--tech-deco_A)); .poa; inset:0; .bgc(var(--tech-bg));
    .inner-box{.bdTechBottom(var(--tech-deco_A))}
  }
}
</style>