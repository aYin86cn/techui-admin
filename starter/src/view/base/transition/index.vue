<script setup>
import { onMounted, reactive, ref } from 'vue';
const isVisible = ref(true);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const value=ref(66)

onMounted(()=>{
  
})

// Sample Data (replace with your actual data source)
const chartDataForPie = ref([
  { label: '类别A', value: 30, color: '#ff6384' },
  { label: '类别B', value: 10, color: '#36a2eb' },
  { label: '类别C', value: 20, color: '#ffce56' },
  { label: '类别D', value: 45, color: '#4bc0c0' },
  { label: '类别E', value: 65, color: $c.rel4 }
]);

// Sample Config (make this reactive if you have controls)
const config = reactive({
  innerRadiusPercent: 60,
  cornerRadius: 10,
  gapSize: 5, // Controls expansion and translation
  useGradient: true,
  showCenterText: true,
  chartTitle: '总量',
  totalUnit: '个',
  
});

const t3dCfg={
  // mode:"matrix",
  mode:"static",
  showShadow:true,
  thicknessCoeff:.15,
  shadowCoeff:.1,
  shadowBlur:1,
  coeff:2,
  initialRotate:{x:30,y:0,z:0},
  // thicknessBlur:1,
  // showThickness:false,
  // rotateMax:70,
  // rotateMin:-70,
}

</script>
<template>
  <div class="transition-demo-wrap">
  <!-- 
    <button @click="toggleVisibility" v-tui-drag="{ 
      // enabled:true,
      // trigger: '.dialog-header',
      // exclude: '.dialog-close',
      // containment: true,
      // positionType,
    }" >Toggle Visibility</button>
    
    <transition name="fade">
      <div v-if="isVisible" class="animated-box" v-tui-drag="{ 
      // enabled:true,
      // trigger: '.dialog-header',
      // exclude: '.dialog-close',
      // containment: true,
      // positionType,
    }">
        <div id="handle">Handle
          <span id="close">X</span>
        </div>
        This box will fade out smoothly.
      </div>
    </transition>
    <TuiInput type="number" v-model="value" :step="10" style="width:100px;"></TuiInput>
    -->
    
    
    <div class="columns-display">
      <Tui3DPanel v-bind="t3dCfg" class="t3d-panel">
        <PieChart
          :chart-data="chartDataForPie"
          v-bind="config"
          size="700"
        />
      </Tui3DPanel>
      
    </div>
    

  </div>


</template>
<style lang="less">
.transition-demo-wrap{height:100%;
  .animated-box {
    width: 200px;
    height: 100px;
    background-color: lightblue;
    animation: pulse 2s infinite; /* 循环动画 */
  }

  /* 循环动画：改变透明度 */
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  /* 进入动画的过渡效果（可选） */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease; /* 进场和离场都使用同样的过渡效果 */
  }

  /* 离场时的目标状态 */
  .fade-leave-to {
    opacity: 0; /* 离场时透明度过渡到 0 */
  }
  .container{.centerFlex;
    .multi-columns{.flex(5px);  }
  }
  .columns-display{.poa; .centerAbsolute;}
}
</style>
