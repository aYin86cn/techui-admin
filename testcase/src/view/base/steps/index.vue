<script setup>
import { onMounted, reactive, ref } from 'vue';
const optionsA=[
  { title: 'Step1', description: 'description1' ,icon:"tui-icon ti-search"},
  { title: 'Step2 This is an English text for testing purposes.', description: 'description2 This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes. This is an English text for testing purposes.' ,icon:"tui-icon ti-star"},
  { title: 'Step3', description: 'description3' },
  { title: 'Step4', description: 'description4' },
]
const optionsB=[
  { title: 'Step1', description: 'description1' },
  { title: 'Step2', description: 'description2' ,icon:"tui-icon ti-star"},
  { title: 'Step3', description: 'description3' ,icon:"tui-icon ti-search"},
  { title: 'Step4 This is an English text for testing purposes.', description: 'description4 This is an English text for testing purposes. This is an English text for testing purposes.' ,status:"warning"},
  { title: 'Step5', description: 'description5' ,status:"error"}
]
const state=reactive({
  
  stepsGroup:[
    {title:"Step 基础",type:"horizontal",label:"normal",options:optionsA,config:{ active:2},},
    {title:"Step 成功",type:"horizontal",label:"normal",options:optionsA,config:{ active:3, finishStatus:"success"},},
    {title:"Step 当前步骤状态修改",type:"horizontal",label:"normal",options:optionsA,config:{ active:0,processStatus:'warning', finishStatus:"success"}},
    {title:"Step 特殊状态",type:"horizontal",label:"normal",options:optionsB,config:{ active:0}},
    {title:"Step 简单模式",type:"horizontal",label:"normal",options:optionsA,config:{active:0, simple:true,simpleWithBG:false, finishStatus:"success"}},
    {title:"Step 简单模式",type:"horizontal",label:"normal",options:optionsA,config:{active:0, simple:true}},
    
    {title:"Step 垂直模式",type:"vertical",label:"normal",options:optionsA,config:{active:2, direction:"vertical"}},
    {title:"Step 垂直模式 特殊状态",type:"vertical",label:"normal",options:optionsB,config:{active:0, finishStatus:"success", direction:"vertical"}},
    {title:"Step 垂直简单模式 无背景",type:"vertical",label:"normal",options:optionsA,config:{active:2, direction:"vertical",simple:true,simpleWithBG:false,}},
    {title:"Step 垂直简单模式 有背景",type:"vertical",label:"normal",options:optionsB,config:{active:0, finishStatus:"success", direction:"vertical",simple:true,}},
  ]
})



const nextStep=(item)=>{
  if(item.config.active==item.options.length){
    item.config.active=0
  }else{
    item.config.active++
  }
}

const slotActive=ref(0);

const nextStepNum=(max)=>{

  if(slotActive.value==max){
    slotActive.value=0
  }else{
    slotActive.value++
  }
}

onMounted(() => {
})

</script>
<template>
  <div class="steps-demo-wrap">
    <div class="demo-inner">
      <div :class="`demo-box demo-${item.type}`" v-for="(item,index) in state.stepsGroup">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" >
          <TuiButton @click="nextStep(item)">下一步</TuiButton>
          <TuiSteps :options="item.options" v-bind="item.config" :descriptionLines="index==6?4:2"></TuiSteps>
        </div>
      </div>

      <div :class="`demo-box demo-horizontal`">
        <div class="demo-title">Step Slot</div>

        <div class="demo-item">
          <TuiSteps :active="slotActive" >
            <TuiStep title="StepA" description="descriptionA"></TuiStep>
            <TuiStep title="StepB This is an English text for testing purposes." description="descriptionB This is an English text for testing purposes."></TuiStep>
            <TuiStep title="StepC" description="descriptionC" icon="tui-icon ti-star"></TuiStep>
            <TuiStep title="StepD" description="descriptionD"></TuiStep>
          </TuiSteps>
          <TuiButton @click="nextStepNum(4)">下一步</TuiButton>
        </div>

      </div>
      <div :class="`demo-box demo-horizontal`">
        <div class="demo-title">Step Slot Simple</div>

        <div class="demo-item">
          <TuiSteps :active="slotActive" :simple="true" finishStatus="success">
            <TuiStep title="StepA"></TuiStep>
            <TuiStep title="StepB"></TuiStep>
            <TuiStep title="StepC This is an English text for testing purposes." icon="tui-icon ti-star"></TuiStep>
            <TuiStep title="StepD"></TuiStep>
            <TuiStep title="StepE" status="error"></TuiStep>
          </TuiSteps>
          <TuiButton @click="nextStepNum(4)">下一步</TuiButton>
        </div>

      </div>


    </div>
  </div>
</template>
<style lang="less">
.steps-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-horizontal{ 
        .demo-item{width: 100%; height:100%; .centerFlex; }
        .tui-button{.poa; bottom:20px; left:50%; .fixc("x");}
      }
      &.demo-vertical{ height:400px; width:calc(25% - 30px);
        .demo-item{width: 100%; height:100%;  }
        .tui-button{.poa; bottom:20px; right:20px; z-index: 10; }
        .tui-steps{height: 100%;}
        .tui-steps.steps-simple{width: 120px;}
      }
      // &.demo-bar-other{ flex-direction: column; gap:50px; justify-content: center;
      //   .tui-steps-bar{margin:0;}
      //   &:nth-child(2){gap:25px;}
      // }
      // &.demo-circle,
      // &.demo-guage{align-items: center; justify-content: center;
      //   .demo-item{text-align: center;
      //     .item-label{padding:0 0 10px 0;}
      //     .tui-steps{margin-top:10px;}
      //   }
      // }
    }
  }
}
</style>
