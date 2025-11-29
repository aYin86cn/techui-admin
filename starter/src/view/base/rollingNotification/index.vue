<script setup>
import { tArr } from "@techui/utils";
import { onBeforeMount, reactive, ref } from 'vue';
const notiData=ref([
  {icon:"tui-icon ti-home",type:"primary"},
  {icon:"tui-icon ti-send-alt",type:"danger"},
  {type:"warning"},
  {icon:"tui-icon ti-star",type:"success"},
  {icon:"tui-icon ti-star",type:"default"},
  {icon:"tui-icon ti-star",type:"invert"},
])

const config=reactive({
  debug:false,
  visibleLength:2,
  itemLines:2,
  transparent:true,
  backgroundBlur:true,
  tone:"base",
  interval:3000,
  motionBlur:true,
  tipConfig:{
    transparent:true,
    backgroundBlur:true,
    delay:1000,
  },
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
  toneOpt:[
    {label:"淡",value:"weak"},
    {label:"基",value:"base"},
    {label:"强",value:"strong"},
    {label:"强反",value:"strongInvert"},
    {label:"极反",value:"extremeInvert"},
  ],

  typeOpt:[
    {label:"Default",value:"default"},
    {label:"Invert",value:"invert"},
    {label:"Primary",value:'primary'},
    {label:"Success",value:'success'},
    {label:"Warning",value:'warning'},
    {label:"Danger",value:'danger'},
    {label:"Info",value:'info'},
    {label:"Emphasis",value:'emphasis'},
  ],
  appearOpt:[
    {label:"背景",value:"background"},
    {label:"线条",value:"line"},
    {label:"文字",value:"text"},
  ],
})

const transChange=(val)=>{
  console.log("transChange",val);
  config.tipConfig.transparent=val
}
const blurChange=(val)=>{
  console.log("blurChange",val);
  config.tipConfig.backgroundBlur=val
}


const addItem=(val)=>{
  notiData.value.push({ type:tArr.rdmpk1(state.typeOpt).value})
}

const remItem=(val)=>{
  notiData.value.pop()
}

const removeTab=(idx)=>{
  console.log("removeTab",idx);
  notiData.value.splice(idx, 1);
}
onBeforeMount(()=>{
  
})
</script>
<template>
  <div class="navNoti-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">开启测试背景</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.showBG" :options="state.boolOpt"></TuiRadio>
      </div>
      
      <div class="form-group group-number">
        <div class="label">显示条数</div>
        <TuiInput type="number" :min="1" v-model="config.visibleLength"/>
      </div>
      <div class="form-group group-number">
        <div class="label">Item行数</div>
        <TuiInput type="number" :min="1" v-model="config.itemLines"/>
      </div>
      <div class="form-group" v-if="config.visibleLength==1">
        <div class="label">Type色调</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.tone" :options="state.toneOpt"></TuiRadio>
      </div>

      <div class="form-group" >
        <div class="label">半透明</div>
        <TuiRadio @change="transChange" v-bind="state.radioCfg" v-model="config.transparent" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.transparent">
        <div class="label">背景模糊</div>
        <TuiRadio @change="blurChange" v-bind="state.radioCfg" v-model="config.backgroundBlur" :options="state.boolOpt"></TuiRadio>
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
      <div  :class="`demo-box ${state.showBG?'show-bg':''}`">
        <!-- <div class="demo-title">test</div> -->
        <div class="demo-item" >

          <TuiRollingNotification class="roll-icon-demo" v-bind="config" >
            <TuiRollingNotificationItem v-for="(item,index) in notiData" :index="index" v-bind="item">
              {{ index%2==0?state.cnText:state.enText }}
            </TuiRollingNotificationItem>
          </TuiRollingNotification>

        </div>
      </div>

    </div>
    
  </div>
</template>
<style lang="less">
//:controlType="state.ctrlTypeCfg.active" 
.navNoti-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px; .por;
  // .bgi("../_common/tempBG/bg5.jpg");
  .operat-bar{.flex(30px); padding:0 20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-direction: column; flex-wrap: wrap; margin:0; 
    .demo-box{display:flex; flex-direction: column; gap:20px; .por;
      &.show-bg{ .bgi("../_common/tempBG/pattern.png"); background-size: 100px 60px; padding:20px; .bd(@bk,3px); .bdra(10px);}
      .demo-title{.poa; left:10px; top:10px;}
      .radio-demo{.poa; left:10px; bottom:10px; }
      .btn-group{.poa; right:10px; bottom:10px;}

      .demo-item{ gap:20px; flex-direction: column; overflow: hidden; }
      
    }
  }
}


</style>
