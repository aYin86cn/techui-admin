<script setup>
import { $c } from "@techui/colors";
import { tNum, tStr } from "@techui/utils";
import { inject, onBeforeMount, reactive, ref } from 'vue';
const {$themePalette}= inject('$global');
const {primary,success,warning,danger,emphasis}=$themePalette.value

const progsDataA=ref([
  {label:"数据A",value:24},
  {label:"数据B",value:34},
  {label:"数据C",value:54,status:"warning"},
  {label:"数据D",value:54,status:"success"},
  {label:"数据E",value:74},
  {label:"数据F这是一个用于测试的中文文本。希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。",value:84,status:"danger",showStatusIcon:true},
])

const progsDataB=ref([
  {label:"数据A",value:24,},
  {label:"数据B",value:64},
  {label:"数据C",value:94},
  {label:"数据D",value:124},
  {label:"数据E",value:184},
  {label:"数据F这是一个用于测试的中文文本。希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。",value:194},
])
const thresholdsB={
  danger:0,
  warning:30,
  normal:50,
  success:70
}

const progsDataC=ref([
  {label:"数据A",value:194,icon:"tui-icon ti-home",},
  {label:"数据B",value:184,icon:"tui-icon ti-bell"},
  {label:"数据C",value:124},
  {label:"数据D",value:94,icon:"tui-icon ti-star"},
  {label:"数据E",value:64,icon:"tui-icon ti-star"},
  {label:"数据F这是一个用于测试的中文文本。希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。",value:24,icon:"tui-icon ti-star"},
])
const thresholdsC={
  success:0,
  normal:30,
  warning:50,
  danger:70,
}


const config=reactive({
  tipConfig:{
  },
  debug:false,
  visibleLength:4,
  interval:3000,
  showControl:true,
  seamless:true,
  mode: 'item',
  motionBlur:true,
})

const state=reactive({
  cnText:"这是一个用于测试的中文文本。我们希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。同时，我们也希望这段文本能够有一定的长度，以便测试文本的自动换行和滚动效果。请注意，这段文本仅用于测试目的，不代表任何实际意义。 这是一个用于测试的中文文本。我们希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。",
  enText:"This is an English text for testing purposes. We aim to include various common English words, punctuation marks, and numbers to ensure proper display across different environments. Additionally, we want this text to be of sufficient length to test text wrapping and scrolling functionalities. Please note that this text is solely for testing and does not represent any real content.",
  
  showBG:false,

  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  modeOpt:[
    {label:"整页",value:"page"},
    {label:"数据",value:'item'},
  ],

})


const addItem=(val)=>{

  progsDataA.value.push({ 
    label:tStr.rdm(),
    value:tNum.rdm(0,100),
  })
  progsDataB.value.push({ 
    label:tStr.rdm(),
    value:tNum.rdm(100,200),
  })
  progsDataC.value.push({ 
    label:tStr.rdm(),
    value:tNum.rdm(200,300),
  })
}

const remItem=(val)=>{
  progsDataA.value.pop()
  progsDataB.value.pop()
  progsDataC.value.pop()
}

onBeforeMount(()=>{
  
})
</script>
<template>
  <div class="rollprog-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">开启测试背景</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.showBG" :options="state.boolOpt"></TuiRadio>
      </div>
      
      <div class="form-group group-number">
        <div class="label">显示条数</div>
        <TuiInput type="number" :min="1" v-model="config.visibleLength"/>
      </div>
      <div class="form-group">
        <div class="label">滚动模式</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.mode" :options="state.modeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">显示控制栏</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showControl" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">无缝滚动</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.seamless" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">动态模糊</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.motionBlur" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">增减Item</div>
        <TuiButtonGroup class="btn-group">
          <TuiButton @click="addItem"><i class="tui-icon ti-plus"></i></TuiButton>
          <TuiButton @click="remItem"><i class="tui-icon ti-minus"></i></TuiButton>
        </TuiButtonGroup>
      </div>
    </div>
    

    <div class="demo-inner">
      <div  class="demo-box">
        <div class="demo-title">基础用法</div>
        <div class="demo-item" >
          <TuiRollingProgress class="roll-icon-demo" v-bind="{
            ...config, 
            valueType:'percent'
          }">
            <TuiRollingProgressItem v-for="(item,index) in progsDataA" :index="index+1" v-bind="item"/>
          </TuiRollingProgress>
        </div>
      </div>
      <div  class="demo-box">
        <div class="demo-title">状态阈值</div>
        <div class="demo-item" >
          <TuiRollingProgress class="roll-icon-demo" v-bind="{
            ...config,
            progressConfig:{
              thresholds:thresholdsB,
              valueType:'number',
              unit:'万元'
            }
          }" >
            <TuiRollingProgressItem v-for="(item,index) in progsDataB" :index="index+1" v-bind="item"/>
          </TuiRollingProgress>
        </div>
      </div>
      <div  class="demo-box">
        <div class="demo-title">状态阈值(反向)</div>
        <div class="demo-item" >
          <TuiRollingProgress class="roll-icon-demo" v-bind="{
            ...config,
            progressConfig:{
              thresholds:thresholdsC,
              valueType:'number',
              unit:'万吨'
            }
          }" >
            <TuiRollingProgressItem v-for="(item,index) in progsDataC" :index="index+1" v-bind="item"/>
          </TuiRollingProgress>
        </div>
      </div>
      <div  class="demo-box">
        <div class="demo-title">手动设置颜色</div>
        <div class="demo-item" >
          <TuiRollingProgress class="roll-icon-demo" v-bind="{
            ...config,
            progressConfig:{
              valueType:'number',
              unit:'万$',
              color:$c.pul5
            },
            tipConfig:{
              type:'danger'
            },
            tagConfig:{
              type:'danger',
              tone:'strong'
            }
          }" >
            <TuiRollingProgressItem v-for="(item,index) in progsDataC" :index="index+1" v-bind="item"/>
          </TuiRollingProgress>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style lang="less">
//:controlType="state.ctrlTypeCfg.active" 
.rollprog-demo-wrap{  min-height:100%; width:1400px; margin:0 auto; padding:20px; .por;
  .operat-bar{.flex(30px); padding:0 20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; margin:0; 
    .demo-box{display:flex; flex-direction: column; gap:0; .por; flex:1; height:340px; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); padding:10px;
      &.show-bg{ .bgi("../_common/tempBG/pattern.png"); background-size: 100px 60px; padding:20px; .bd(@bk,3px); .bdra(10px);}
      .demo-title{}
      .radio-demo{.poa; left:10px; bottom:10px; }
      .btn-group{.poa; right:10px; bottom:10px;}

      .demo-item{ flex:1; overflow: hidden;}
      
    }
  }
}


</style>
