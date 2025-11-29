<script setup>
import { onMounted, reactive } from 'vue';

import demo1 from "../_common/tempBG/demo-1.jpg";
import demo2 from "../_common/tempBG/demo-2.jpg";
import demo3 from "../_common/tempBG/demo-3.jpg";
import demo4 from "../_common/tempBG/demo-4.jpg";
import demo5 from "../_common/tempBG/demo-5.jpg";
import demo6 from "../_common/tempBG/demo-6.jpg";

const images=[demo1,demo2,demo3,demo4,demo5,demo6,]

const config=reactive({
  appearance:"card",
  direction:"h",//h v
  indicatorPosition:"inside",
  height:250,
  autoplay:false,
  interval:5000,
  arrow:"hover",
  indicatorHasIndex:true,
  initialIndex:2,
  trigger:"hover",
  motionBlur:true,
  loop:true,
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
  appeaOpt:[
    {label:"普通",value:'default'},
    {label:"卡片",value:'card'},
  ],
  triggerOpt:[
    {label:"悬停",value:'hover'},
    {label:"点击",value:'click'},
  ],
  directionOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  indicPosOpt:[
    {label:"内部",value:"inside",disabled:true},
    {label:"外部",value:'outside'},
    {label:"无",value:'none'},
  ],
  arrowOpt:[
    {label:"永久",value:"always"},
    {label:"悬停",value:'hover'},
    {label:"隐藏",value:'never'},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})

const dirChange=(dir)=>{
  if(dir=='h'){
    config.height=250
  }else{
    config.height=400
  }
}

const TypeChange=(tp)=>{
  if(tp=='card'){
    state.indicPosOpt[0].disabled=true;
    config.indicatorPosition='outside'
  }else{
    state.indicPosOpt[0].disabled=false;
  }
}

onMounted(() => {
  
})
const navigateTo=(idx)=>{
  console.log("navigateTo",idx);
  
}
</script>
<template>
  <div class="carousel-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">类型</div>
        <TuiRadio @change="TypeChange" v-bind="state.radioCfg" v-model="config.appearance" :options="state.appeaOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">方向</div>
        <TuiRadio @change="dirChange" v-bind="state.radioCfg" v-model="config.direction" :options="state.directionOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">指示器位置</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.indicatorPosition" :options="state.indicPosOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">箭头显示</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.arrow" :options="state.arrowOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">指示器含序号</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.indicatorHasIndex" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">自动播放</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.autoplay" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">动态模糊</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.motionBlur" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">循环</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.loop" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">指示器触发</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.trigger" :options="state.triggerOpt"></TuiRadio>
      </div>
      
      <div class="form-group group-number">
        <div class="label">高度</div>
        <TuiInput type="number" :min="200" :max="500" :step="50" v-model="config.height"/>
      </div>
      <div class="form-group group-number">
        <div class="label">间隔时间</div>
        <TuiInput type="number" :min="3000" :max="10000" :step="1000" v-model="config.interval"/>
      </div>
    
    </div>
    <div class="demo-inner">
      
      <div class="demo-box">
        <div class="demo-title">轮播</div>
        <div class="demo-item" >
          <TuiCarousel v-bind="config">
            <TuiCarouselItem v-for="item in 4" :key="item" :label="`${item}`">
              <div class="carousel-content">Item {{ item }}</div>
            </TuiCarouselItem>
          </TuiCarousel>
        </div>
      </div>
      <div class="demo-box">
        <div class="demo-title">图片轮播</div>
        <div class="demo-item" >
          <TuiCarousel v-bind="config">
            <TuiCarouselItem v-for="(item,index) in 6" :key="item" :label="`${item}`" title="这里是标题" :description="state.cnText" :hasLinkButton="index==5" @navigateTo="navigateTo">
              <div class="carousel-content">Item {{ item }}</div>
              <img class="demo-img" :src="images[index]" alt="">
            </TuiCarouselItem>
          </TuiCarousel>
        </div>
      </div>
      <div class="demo-box">
        <div class="demo-title">无配置参数默认状态</div>
        <div class="demo-item" >
          <TuiCarousel >
            <TuiCarouselItem v-for="item in 7" :key="item" :label="`${item}`">
              <div class="carousel-content">Item {{ item }}</div>
            </TuiCarouselItem>
          </TuiCarousel>
        </div>
      </div>

    </div>

    
  </div>
</template>
<style lang="less">
.carousel-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &:not(:nth-child(2)){
        .demo-item{
          .tui-carousel-item{.bgc(var(--primary-base));}
        }
      }
      .demo-item{height: 100%; width: 100%;
        .tui-carousel-item{.fc(@wh);
          .carousel-content{.poa; inset:0;
            .centerFlex;
          }
        }
        .demo-img{width: 100%; height: 100%; object-fit: cover;}

      }
    }
  }
}

</style>
