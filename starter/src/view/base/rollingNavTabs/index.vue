<script setup>
import { tStr } from "@techui/utils";
import { reactive, ref } from 'vue';
const navData=ref([
  { label:"Dashboard",value:'dash',icon:"tui-icon ti-home",locked:true},
  { label:"Tab2",value:"tab2",icon:"tui-icon ti-bell",locked:false,disabled:true},
  { label:"Tab3",value:"tab3",icon:"tui-icon ti-star"},
  { label:"Tab4",value:"tab4"},
  { label:"Tab5",value:"tab5"},
  { label:"Tab6",value:"tab6"},
  { label:"Tab7"},
  { label:"Tab8"},
  { label:"Tab9"},
  { label:"Tab10"},
  { label:"Tab11 测试文本溢出"},
])

const curNav=ref('tab6');

const radioCallBack=(val)=>{
  console.log("radio",val);
}

const config=reactive({
  debug:false,
  itemApproxWidth:140,
  itemApproxHeight:40,
  closeable:true,
  direction:"h",
  controlPosition:"prefix",
  prefixReverse:false, 
  suffixReverse:false,
  motionBlur:true,
  tipConfig:{
  },
  resizeObserver:'global',
  // tipTransparent:false,
})

const state=reactive({

  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  preVisAct:true,
  sufVisAct:true,

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
  navDirOpt:[
    {label:"横向",value:"h"},
    {label:"纵向",value:'v'},
  ],
  contrlPosOpt:[
    {label:"前",value:"prefix"},
    {label:"后",value:"suffix"},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})

const tabChange=(val,index)=>{
  console.log("tabChange",val,index);
  
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
  <div class="navTabs-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">导航方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.direction" :options="state.navDirOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">前缀slot开关</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.preVisAct" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">后缀slot开关</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.sufVisAct" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="state.preVisAct">
        <div class="label">前缀slot反转</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.prefixReverse" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="state.sufVisAct">
        <div class="label">后缀slot反转</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.suffixReverse" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">控制栏位置</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.controlPosition" :options="state.contrlPosOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">容器尺寸</div>
        <TuiRadio v-bind="state.radioCfg" class="radio-demo" @change="radioCallBack" v-model="state.wrapSizeAct" :options="state.wrapSizeOpt"></TuiRadio>
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

      <div :class="`demo-box demo-${config.direction} demo-size-${state.wrapSizeAct}`">
        <div class="demo-title">{{config.direction=='h'?'Horizontal':'Vertical'}}</div>
        <div class="demo-item" >

          <TuiRollingNavTabs v-model="curNav" @change="tabChange" v-bind="config" >
            <TuiRollingNavTab v-for="(item,index) in navData" :index="index" :value="item.value||item.label" v-bind="item" @remove="removeTab(index)"/>
            <template #prefix v-if="state.preVisAct">
              <i class="tui-icon tis-cog"></i>
            </template>
            <template #suffix v-if="state.sufVisAct">
              <i class="tui-icon ti-menu"></i>
            </template>
          </TuiRollingNavTabs>

        </div>
      </div>

    </div>
    
  </div>
</template>
<style lang="less">
.navTabs-demo-wrap{max-width:1400px; min-height:100%; width:100%; margin:0 auto; padding:20px; .por;
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
        .tui-roll-nav-tabs{.bd(var(--common-bd));}
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
</style>
