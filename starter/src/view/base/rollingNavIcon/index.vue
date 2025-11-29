<script setup>
import { tStr } from "@techui/utils";
import { reactive, ref } from 'vue';
const navData=ref([
  { label:"Dashboard 测试文本溢出",value:'dash',icon:"tui-icon ti-home",locked:true},
  { label:"Icon2",value:"icon2",icon:"tui-icon ti-bell",locked:true,disabled:true},
  { label:"Icon3",value:"icon3",icon:"tui-icon ti-star"},
  { label:"Icon4",value:"icon4"},
  { label:"Icon5",value:"icon5"},
  { label:"Icon6",value:"icon6"},
  { label:"Icon7"},
  { label:"Icon8"},
  { label:"Icon9"},
  { label:"Icon10"},
  { label:"Icon11"},
  { label:"Icon12"},
  { label:"Icon13"},
  { label:"Icon14"},
  { label:"Icon15"},
  { label:"Icon16 测试文本溢出"},
])

const curNav=ref('tab6');

const radioCallBack=(val)=>{
  // console.log("radio",val);
}

const config=reactive({
  debug:false,
  itemApproxWidth:130,
  itemApproxHeight:90,
  frameWidth:100,
  frameHeight:80,
  iconSize:28,
  direction:"h",
  controlPosition:"right",
  frameShap:"round",
  trigger:"click",
  closeable:true,
  motionBlur:true,
  resizeObserver:'global',
  tipConfig:{
  },
})

const state=reactive({

  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  navDirOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  ctrlPosOpt:[
    {label:"上",value:"top"},
    {label:"右",value:"right"},
    {label:"下",value:"bottom"},
    {label:"左",value:"left"},
  ],
  frameShapOpt:[
    {label:"圆角",value:"round"},
    {label:"圆形",value:"circle"},
    {label:"无",value:"none"},
  ],
  triggerOpt:[
    {label:"点击",value:"click"},
    {label:"悬停",value:"hover"},
  ],

  bgInvertAct:false,
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],

  wrapSizeAct:"md",
  wrapSizeOpt:[
    {label:"自适应",value:"at"},
    {label:"最大",value:"xl"},
    {label:"大",value:"lg"},
    {label:"中",value:"md"},
    {label:"小",value:"sm"},
  ],
  frameSizeAct:"large",
  frameSizeOpt:[
    {label:"大",value:"large"},
    {label:"小",value:"small"},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})

const frameShapChange=(val)=>{
  console.log("frameShapChange",val);
  
}
const frameSizeChange=(val)=>{
  console.log("frameSizeChange",val);
  if(val=='large'){
    config.itemApproxWidth=130
    config.itemApproxHeight=90
    config.frameWidth=100
    config.frameHeight=80
    config.iconSize=28
  }else if(val=='small'){
    config.itemApproxWidth=120
    config.itemApproxHeight=80
    config.frameWidth=90
    config.frameHeight=70
    config.iconSize=24
  }
}

const iconChange=(val,index)=>{
  console.log("iconChange",val,index);
  
}
const addItem=(val)=>{
  let rmdName=tStr.rdm();
  navData.value.push({ label:rmdName,value:rmdName},)
}

const remItem=(val)=>{
  navData.value.pop()
}

const removeTab=(idx)=>{
  console.log("removeTab",idx);
  navData.value.splice(idx, 1);
}

</script>
<template>
  <div class="navIcon-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">尺寸</div>
        <TuiRadio @change="frameSizeChange" v-bind="state.radioCfg" v-model="state.frameSizeAct" :options="state.frameSizeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">导航方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.direction" :options="state.navDirOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">可关闭</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.closeable" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">控制栏位置</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.controlPosition" :options="state.ctrlPosOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">元素外框</div>
        <TuiRadio v-bind="state.radioCfg" @change="frameShapChange" v-model="config.frameShap" :options="state.frameShapOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">Point触发</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.trigger" :options="state.triggerOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">容器尺寸</div>
        <TuiRadio v-bind="state.radioCfg" class="radio-demo" @change="radioCallBack" v-model="state.wrapSizeAct" :options="state.wrapSizeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">背景反色</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.bgInvertAct" :options="state.boolOpt"></TuiRadio>
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

      <div :class="`demo-box demo-bg-${state.bgInvertAct?'invert':'normal'} demo-${config.direction} demo-size-${state.wrapSizeAct}`">
        <div class="demo-title">{{config.direction=='h'?'Horizontal':'Vertical'}}</div>
        <div class="demo-item" >

          <TuiRollingNavIcon class="roll-icon-demo" v-model="curNav" @change="iconChange" 
            v-bind="config" 
          >
            <TuiRollingNavIconItem v-for="(item,index) in navData" :index="index" :value="item.value||item.label" v-bind="item" @remove="removeTab(index)"/>
          </TuiRollingNavIcon>

        </div>
      </div>

    </div>
    
  </div>
</template>
<style lang="less">
//:controlType="state.ctrlTypeCfg.active" 
.navIcon-demo-wrap{max-width:1400px;  min-height:100%; width:100%; margin:0 auto; padding:20px; .por;
  .operat-bar{.flex(30px); padding:0 20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0; 
    .demo-box{ display:flex; gap:20px; .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:20px;

      .demo-title{.poa; left:10px; top:10px;}
      .radio-demo{.poa; left:10px; bottom:10px; }
      .btn-group{.poa; right:10px; bottom:10px;}

      &.demo-h{ height:250px; 
        .demo-item{width: 100%; height:100%;  flex-direction: column;}
        &.demo-size-at{width: 100%;}
        &.demo-size-xl{width: 1400px;}
        &.demo-size-lg{width: 1100px;}
        &.demo-size-md{width: 800px;}
        &.demo-size-sm{width: 400px;}
      }
      &.demo-v{ height:500px; width:400px;
        .demo-item{ width: 100%; 
          .tui-roll-tabs{height:90%!important;}
        }
        &.demo-size-at{height: calc(100vh - 180px);}
        &.demo-size-xl{height: 800px;}
        &.demo-size-lg{height: 600px;}
        &.demo-size-md{height: 400px;}
        &.demo-size-sm{height: 200px;}
      }

      .demo-item{.centerFlex; gap:20px;
        .tui-slot-inner{.centerFlex; padding:0 10px; }
      }
      .tui-orient-h{
        .tui-rolling-item{.centerFlex; }
      }
      .tui-orient-v{
        .tui-rolling-item{.centerFlex; }
      }
      
    }
  }
}

.theme-scheme-light{
  .navIcon-demo-wrap{
    .demo-bg-normal{ .bgc(var(--common-bg));
      
    }

    .demo-bg-invert{ .bgc(var(--primary-stronger)); 
      .demo-title{.fc(@wh);}
      .roll-icon-demo{
        .tui-roll-nav-icon-item {
          
          .item-frame .tui-roll-lock{.bgc(var(--font-weakest));}

          --tui-rollni-item-bd_def:var(--tone-strongest);
          --tui-rollni-item-bd_hov:var(--success-base_op5);
          --tui-rollni-item-bd_act:var(--success-base);
          --tui-rollni-item-bd_dis:var(--tone-strongest);

          --tui-rollni-item-bg_def:var(--tone-strongest_op5);
          --tui-rollni-item-bg_hov:var(--tone-strongest_op5);
          --tui-rollni-item-bg_act:var(--tone-strongest_op5);
          --tui-rollni-item-bg_dis:var(--tone-strongest_op5);

          --tui-rollni-item-fc_def:var(--font-weaker);
          --tui-rollni-item-fc_hov:var(--success-weak);
          --tui-rollni-item-fc_act:var(--success-base);
          --tui-rollni-item-fc_dis:var(--font-weak);

          
        }
        .tui-roll-nav-icon-control{
          --tui-rollni-indic_def:var(--tone-strongest);
          --tui-rollni-indic_hov:var(--success-stronger);
          --tui-rollni-indic_act:var(--success-base);
          --tui-rollni-ctrl-bg:var(--tone-strongest_op5);
          --tui-rollni-ctrl-bd:var(--tone-strongest);
          --tui-rollni-ctrl-indic-bdra:10px;
          --tui-rollni-ctrl-indic-size:10px;
          .tui-button{
            --tui-btn-bg_def:var(--primary-stronger); 
            --tui-btn-bg_hov:var(--primary-strong); 
            --tui-btn-bg_act:var(--primary-stronger); 
            --tui-btn-bg_dis:var(--primary-strongest); 

            --tui-btn-bd_def:var(--primary-strong);
            --tui-btn-bd_hov:var(--primary-stronger); 
            --tui-btn-bd_act:var(--primary-strong); 
            --tui-btn-bd_dis:var(--primary-stronger); 
            
            --tui-btn-fc_def:var(--font-weakest);
            --tui-btn-fc_dis:var(--font-weak);
          }
        }
      }
    }
  }
}

</style>
