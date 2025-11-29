<script setup>
// import { tInterval } from "@techui/utils";
// import { $c } from "@techui/colors";
// import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { reactive } from 'vue';

import DemoA0 from "./sub/demoA0.vue";
import DemoA1 from "./sub/demoA1.vue";
import DemoA2 from "./sub/demoA2.vue";
import DemoA3 from "./sub/demoA3.vue";
import DemoB from "./sub/demoB.vue";
import DemoC from "./sub/demoC.vue";
import DemoD from "./sub/demoD.vue";
import DemoE from "./sub/demoE.vue";
import DemoF from "./sub/demoF.vue";
import DemoG from "./sub/demoG.vue";
import DemoH from "./sub/demoH.vue";
import DemoI from "./sub/demoI.vue";
import DemoJ from "./sub/demoJ.vue";
import DemoK from "./sub/demoK.vue";

const trees=[
  DemoA0,
  DemoA1,
  DemoA2,
  DemoA3,
  DemoB,
  DemoC,
  DemoD,
  DemoE,
  DemoF,
  DemoG,
  DemoH,
  DemoI,
  DemoJ,
  DemoK,
]

const config=reactive({
  shape:'cylinder',
  baseSpacing:20,
  viewDeep:15,//15
  gap:30,
  showBase:false,
  showTrack:true,
  baseColorRatio:1,
  baseColorWeakened:false,
  barColorRatio:15,
  resizeObserver:true,
  barBlur:3,
  baseBlur:1,
  trackBlur:0
})

const state=reactive({
  height:300,
  col:5,
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  directionOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  
  shapeOpt:[
    {label:"圆柱",value:"cylinder"},
    {label:"方柱",value:"cube"},
  ],

})


</script>
<template>
  <div class="tree-demo-wrap">
    <div class="operat-bar">
      
      <!-- <div class="form-group">
        <div class="label">柱体形状</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.shape" :options="state.shapeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">显示底座</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showBase" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">显示轨道</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showTrack" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group group-number">
        <div class="label">高度</div>
        <TuiInput type="number" :min="150" :max="500" :step="50" v-model="state.height"/>
      </div>
      <div class="form-group group-number">
        <div class="label">列</div>
        <TuiInput type="number" :min="3" :max="6" v-model="state.col"/>
      </div>
      <div class="form-group group-number">
        <div class="label">视图深度</div>
        <TuiInput type="number" :min="0" :max="50" :step="5" v-model="config.viewDeep"/>
      </div>
      <div class="form-group group-number" v-if="config.showBase">
        <div class="label">基座边距</div>
        <TuiInput type="number" :min="10" :max="50" :step="5" v-model="config.baseSpacing"/>
      </div>
      <div class="form-group group-number" v-if="config.showBase">
        <div class="label">底座颜色系数</div>
        <TuiInput type="number" :min="-5" :max="5" :step="0.5" :precision="2" v-model="config.baseColorRatio"/>
      </div>
      <div class="form-group" v-if="config.showBase">
        <div class="label">底座弱化</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.baseColorWeakened" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group group-number" v-if="config.showTrack">
        <div class="label">柱体间隙</div>
        <TuiInput type="number" :min="0" :max="50" :step="5" v-model="config.gap"/>
      </div>
      <div class="form-group group-number">
        <div class="label">渐变差值系数</div>
        <TuiInput type="number" :min="0" :max="100" :step="10" v-model="config.barColorRatio"/>
      </div>
      
      <div class="form-group group-number">
        <div class="label">柱体模糊</div>
        <TuiInput type="number" :min="0" :max="6" v-model="config.barBlur"/>
      </div>
      <div class="form-group group-number" v-if="config.showBase">
        <div class="label">基座模糊</div>
        <TuiInput type="number" :min="0" :max="6" v-model="config.baseBlur"/>
      </div>
      <div class="form-group group-number" v-if="config.showTrack">
        <div class="label">轨道模糊</div>
        <TuiInput type="number" :min="0" :max="6" v-model="config.trackBlur"/>
      </div> -->
      

    </div>
    <div class="demo-inner">
      
      <component :is="comp" v-for="(comp,index) in trees"></component>
      
    </div>

    <!-- <div class="demo-inner">
      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">test1</div>
        <div class="demo-item" >
        </div>
      </div>

      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">test2</div>
        <div class="demo-item" >
        </div>
      </div>
    </div> -->

  </div>
</template>
<style lang="less">
.tree-demo-wrap{  min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{ .flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{ .flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display: flex; .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:400px; padding:40px 20px 20px 20px;
      .demo-title{.poa; left:10px; top:10px; font-weight: bold;}
      .demo-item{width: 100%;}
      
      &.demo-box-col2{width:calc(50% - 27px); }
      &.demo-box-col3{width:calc(33.3333% - 27px); }
      &.demo-box-col4{width:calc(25% - 30px); }
      &.demo-box-col5{width:calc(20% - 32px); }
      &.demo-box-col6{width:calc(16.666% - 34px); }
      &.demo-box-group{ height:350px;
        .demo-item{height: 100%;}
      }

      
    }
  }
}



</style>
