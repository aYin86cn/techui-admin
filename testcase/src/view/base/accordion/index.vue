<script setup>
import { $c } from "@techui/colors";
import { reactive, ref } from "vue";
import demo1 from "../_common/tempBG/demo-1.jpg";
import demo2 from "../_common/tempBG/demo-2.jpg";
import demo3 from "../_common/tempBG/demo-3.jpg";
import demo4 from "../_common/tempBG/demo-4.jpg";
import demo5 from "../_common/tempBG/demo-5.jpg";
import demo6 from "../_common/tempBG/demo-6.jpg";

const rainbowColors=$c.scale([$c.rel4,$c.yem4,$c.aql4,$c.bll4,],6)
const purpleColors=$c.scale([$c.pul1,$c.pul7],6)

const items = ref([
  { title: '工作台', icon: 'tui-icon ti-star', type: 'primary', },
  { title: 'Profile', icon: 'tui-icon ti-star', type: 'success', },
  { title: 'Messages', icon: 'tui-icon ti-home', type: 'warning', },
  { title: 'Settings', type: 'default', },
  { title: 'Analytics',typeColor:$c.pul3 },
  { title: 'Logout', type: 'danger', }
]);

const images = ref([
  { title: '工作台', icon: 'tui-icon ti-star', image:demo1},
  { title: 'Profile', icon: 'tui-icon ti-star', image:demo2 ,hasLinkButton:true,},
  { title: 'Messages', icon: 'tui-icon ti-home', image:demo3 },
  { title: 'Settings', image:demo4 },
  { title: 'Analytics', image:demo5 },
  { title: 'Logout', image:demo6 }
]);

const config=reactive({
  direction:"h",//h v
  // width:'100%',
  itemMinSize:40,
  autoplay:false,
  interval:3000,
  duration:.3,
  trigger:"hover",
  motionBlur:true,
  activeShowTitle:true,
  typedConfig:{
    appearance:"line",
    tone:"base",
  },
  height:300,
  resizeObserver:'global',
})


const state=reactive({

  cnText:"这是一个用于测试的中文文本。我们希望这段文本能够包含各种常见的汉字、标点符号以及数字，以确保在不同的显示环境下都能正确显示。同时，我们也希望这段文本能够有一定的长度，以便测试文本的自动换行和滚动效果。请注意，这段文本仅用于测试目的，不代表任何实际意义。",
  enText:"This is an English text for testing purposes. We aim to include various common English words, punctuation marks, and numbers to ensure proper display across different environments. Additionally, we want this text to be of sufficient length to test text wrapping and scrolling functionalities. Please note that this text is solely for testing and does not represent any real content.",
  
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  directionOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  triggerOpt:[
    {label:"悬停",value:'hover'},
    {label:"点击",value:'click'},
  ],

  toneOpt:[
    {label:"淡",value:"weak"},
    {label:"基",value:"base"},
    {label:"强",value:"strong"},
    {label:"强反",value:"strongInvert"},
    {label:"极反",value:"extremeInvert"},
  ],
  appearOpt:[
    {label:"背景",value:"background"},
    {label:"线条",value:"line"},
    {label:"文字",value:"text"},
    {label:"无",value:"none"},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})

const dirChange=(val)=>{
  if(val=='h'){
    config.height=300
  }else{
    config.height=500

  }
}

const navigateTo=(idx)=>{
  // console.log("navigateTo",idx);
}

</script>
<template>
  <div class="accd-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">排列方向</div>
        <TuiRadio @change="dirChange" v-bind="state.radioCfg" v-model="config.direction" :options="state.directionOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">触发方式</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.trigger" :options="state.triggerOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">动态模糊</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.motionBlur" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">自动播放</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.autoplay" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">显示激活标题</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.activeShowTitle" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group group-number">
        <div class="label">间隔时间</div>
        <TuiInput type="number" :min="1000" :max="10000" :step="1000" v-model="config.interval"/>
      </div>

      <div class="form-group">
        <div class="label">外观</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.typedConfig.appearance" :options="state.appearOpt"></TuiRadio>
      </div>

      <div class="form-group">
        <div class="label">类型色调</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.typedConfig.tone" :options="state.toneOpt"></TuiRadio>
      </div>

      <div class="form-group group-number">
        <div class="label">高度</div>
        <TuiInput type="number" :min="200" :max="500" :step="50" v-model="config.height"/>
      </div>
    </div>
    
    <div class="demo-inner">
      <div class="demo-box">
        <div class="demo-title">正常</div>
        <TuiAccordion v-bind="config"  >
          <TuiAccordionItem 
            v-for="(item, index) in items" 
            :key="index"
            :index="index"
            v-bind="item"
          >
            <div class="demo-content">{{ state.cnText }}</div>
          </TuiAccordionItem>
        </TuiAccordion>
      </div>

      <div class="demo-box">
        <div class="demo-title">内容类型为图片(contentType)</div>
        <TuiAccordion v-bind="config" contentType="image">
          <TuiAccordionItem 
            v-for="(item, index) in images" 
            :key="index"
            :index="index"
            v-bind="item"
            :description="state.cnText"
            @navigateTo="navigateTo"
          >
          </TuiAccordionItem>
        </TuiAccordion>
      </div>

      <div class="demo-box">
        <div class="demo-title">自定义颜色彩虹</div>
        <TuiAccordion v-bind="config"  >
          <TuiAccordionItem 
            v-for="(item, index) in items" 
            :key="index"
            :index="index"
            v-bind="item"
            :typeColor="rainbowColors[index]"
          >
            <div class="demo-content">{{ state.cnText }}</div>
          </TuiAccordionItem>
        </TuiAccordion>
      </div>
      
      <div class="demo-box">
        <div class="demo-title">自定义颜色紫色渐变</div>
        <TuiAccordion v-bind="config"  >
          <TuiAccordionItem 
            v-for="(item, index) in items" 
            :key="index"
            :index="index"
            v-bind="item"
            :typeColor="purpleColors[index]"
          >
            <div class="demo-content">{{ state.cnText }}</div>
          </TuiAccordionItem>
        </TuiAccordion>
      </div>


    </div>

    
  </div>
</template>
<style lang="less">
.accd-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-horizontal{ 
        .demo-item{width: 100%; height:100%; .centerFlex; }
      }
      &.demo-vertical{ height:500px; width:calc(25% - 30px);
        .demo-item{width: 100%; height:100%;  }
      }
      .demo-content{
        .demo-inner-title{font-weight: bold; margin-bottom:10px;}
      }
    }
  }
}


</style>
