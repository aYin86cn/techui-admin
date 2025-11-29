<script setup>
import { inject, onMounted, reactive } from 'vue';
const {initBG,$tState,$globalConfig,$backgroundConfig}= inject('$global');

const {adptBase,adptAdva}= inject('adaptiveCfg');

const state=reactive({
  SvgPattern:{
    viewSvgName:"diamondWeaving",
    rootSvgName:"diamondWeaving",
    gradType:"radial",
    gradOrientation:"ellipse at bottom",
  },
  
  options:[
    'test', 
    'blocks', 
    'circuitDiagram', 
    'circularOverlayA', 
    'circularOverlayB', 
    'contourLine', 
    'crosshairA', 
    'crosshairB', 
    'cubeA', 
    'cubeB', 
    'diamondFlipped', 
    'diamondLattice', 
    'diamondPixel', 
    'diamondWeaving', 
    'dots', 
    'hexagonA', 
    'hexagonB', 
    'hexagonC', 
    'hexagonD', 
    'HexagonCurved', 
    'lineGrid', 
    'lineWeaving', 
    'mazeA', 
    'mazeB', 
    'mazeC', 
    'mountains', 
    'rain', 
    'shellA', 
    'shellB', 
    'slashParallel', 
    'rectWeavingA', 
    'rectWeavingB', 
    'rectWeavingC', 
    'totem', 
    'triangleA', 
    'triangleB', 
    'waveA', 
    'waveB', 
    'zigZagA', 
    'zigZagB',
  ],

  radioCfg:{  direction:"v", appearance:"button", size:"small", defaultIcon:false, },

  gradTypeOpt:[
    {label:"radial",value:"radial"},
    {label:"line",value:"line"},
  ],
  gradLineOrieOpt:[
    // '45deg',
    // '135deg',
    // '225deg',
    // '315deg',
    'to top',
    'to right',
    'to left',
    'to bottom',
    'to top left',
    'to top right',
    'to bottom left',
    'to bottom right',
  ],
  gradRadiaOrieOpt:[
    'ellipse',
    'ellipse at top ',
    'ellipse at bottom',
    'ellipse at left',
    'ellipse at right',
    'ellipse closest-side',
    'circle',
    'circle at top',
    'circle at bottom',
    'circle at left',
    'circle at right',
    'circle closest-side',
    'circle at 20% 20%',
    // 'circle farthest-corner at center',
    // 'from 0deg',
  ],
  adaptiveTypeOpt:[
    {label:"延伸",value:'extension'},
    {label:"弹性",value:'flexible'},
    {label:"固定",value:'fixed'},
    {label:"拉伸",value:'stretch'},
  ],
})

const gradChange=(val)=>{
  if(val=='radial'){
    state.SvgPattern.gradOrientation="ellipse at bottom"
  }else if(val=='line'){
    state.SvgPattern.gradOrientation="to top"
  }
  bgChange()
}

const bgChange=()=>{
  $backgroundConfig.value={
    ...$backgroundConfig.value,
    graphicType:"SvgPattern",
    SvgPattern:state.SvgPattern
  }
  // initBG(bgCfg)
}

onMounted(() => {
})


</script>
<template>
  <div class="background-demo-wrap">
    <div class="operat-bar">
      <div class="form-wrap">
        
        <div class="form-group">
          <div class="label">适配类型</div>
          <TuiRadio v-model="$globalConfig.adaptive" v-bind="state.radioCfg" >
            <TuiRadioItem v-for="(item,index) in state.adaptiveTypeOpt" :value="item.value">{{ item.label }}</TuiRadioItem>
          </TuiRadio>
        </div>
        
        <div class="form-group">
          <div class="label">Root背景</div>
          <TuiRadio @change="bgChange" v-model="state.SvgPattern.rootSvgName" v-bind="state.radioCfg" >
            <TuiRadioItem v-for="(item,index) in state.options" :value="item">{{ item }}</TuiRadioItem>
          </TuiRadio>
        </div>
        <div class="form-group">
          <div class="label">View背景</div>
          <TuiRadio @change="bgChange" v-model="state.SvgPattern.viewSvgName" v-bind="state.radioCfg">
            <TuiRadioItem v-for="(item,index) in state.options" :value="item">{{ item }}</TuiRadioItem>
          </TuiRadio>
        </div>
        <div class="form-group">
          <div class="label">渐变类型</div>
          <TuiRadio @change="gradChange" v-model="state.SvgPattern.gradType" v-bind="state.radioCfg">
            <TuiRadioItem v-for="(item,index) in state.gradTypeOpt" :value="item.value">{{ item.label }}</TuiRadioItem>
          </TuiRadio>
        </div>
        <div class="form-group" v-if="state.SvgPattern.gradType=='radial'">
          <div class="label">渐变方向Radial</div>
          <TuiRadio @change="bgChange" v-model="state.SvgPattern.gradOrientation" v-bind="state.radioCfg">
            <TuiRadioItem v-for="(item,index) in state.gradRadiaOrieOpt" :value="item">{{ item }}</TuiRadioItem>
          </TuiRadio>
        </div>
        <div class="form-group" v-if="state.SvgPattern.gradType=='line'">
          <div class="label">渐变方向Line</div>
          <TuiRadio @change="bgChange" v-model="state.SvgPattern.gradOrientation" v-bind="state.radioCfg">
            <TuiRadioItem v-for="(item,index) in state.gradLineOrieOpt" :value="item">{{ item }}</TuiRadioItem>
          </TuiRadio>
        </div>
      </div>
    </div>
    <div class="demo-layout">
      <div class="group-title"></div>


    </div>
  </div>
</template>
<style lang="less">
.background-demo-wrap{ min-height:100%;  margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px;
    .form-group{
      .label{margin:10px 0;}
      .tui-radio{max-height:500px; overflow: auto; flex-wrap: nowrap; padding-top:1px;
        .tui-radio-item{.bdra(0)!important;}
      }
    }
    .form-wrap{.flex(20px); }
  }
  .demo-layout{ .flex(20px); padding:20px; flex-wrap: wrap; .por;
    .group-title{width: 100%; font-size: 18px; padding:10px 0; font-weight: bold;}
    .group{.flex(10px); align-items: start;
      
      
    }
  }
}
</style>
