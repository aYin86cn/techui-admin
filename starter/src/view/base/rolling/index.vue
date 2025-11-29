<script setup>
import { tStr } from "@techui/utils";
import { reactive, ref } from 'vue';
const dataA=ref(["AAAAA","BBBBB","CCCCC","DDDDD","EEEEE","FFFFF","GGGGG","HHHHH","IIIII","JJJJJ"])
const dataB=ref(["AAAAA","BBBBB","CCCCC","DDDDD"])

const config=reactive({
  controlAlign:"center",
  direction:"up",
  mode:"item",
  autoRolling:false,
  seamless:true,
  showControl:true,
  hoverPause:true,
  debug:true,
  delay:2000,
  visibleLength:6,
  controlType:"arrow",
  fillData:false,
  controlDirection:"v",
  motionBlur:true,
  resizeObserver:'global',
})

const state=reactive({
  
  rollingA:{initIndex:5},
  rollingB:{},
  rollingC:{
    indicatorHasToggle:true,
    trigger:"hover",
  },
  rollingD:{},

  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],

  contAlignOpt:[
    {label:"Start",value:"start"},
    {label:"Center",value:"center"},
    {label:"End",value:'end'},
  ],
  controlDirOpt:[
    {label:"垂直",value:"v"},
    {label:"垂直反向",value:"vr"},
    {label:"水平",value:"h"},
    {label:"水平反向",value:"hr"},
  ],
  directionOpt:[
    {label:"向上",value:"up"},
    {label:"向下",value:'down'},
    {label:"向左",value:"left"},
    {label:"向右",value:'right'},
  ],
  modeOpt:[
    {label:"整页",value:"page"},
    {label:"数据",value:'item'},
  ],
  ctrlTypeOpt:[
    {label:"箭头",value:"arrow"},
    {label:"指示器",value:'indicator'},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})

const addItem=(val)=>{
  let rmdName=tStr.rdm();
  dataA.value.push(rmdName)
  dataB.value.push(rmdName)
}

const remItem=(val)=>{
  dataA.value.pop()
  dataB.value.pop()
}


const searollRef=ref(null);
const inputIndex=ref(0);

const play=()=>{ searollRef.value.play() }
const stop=()=>{ searollRef.value.stop() }
const toggle=()=>{ searollRef.value.toggle() }
const prev=()=>{ searollRef.value.prev() }
const next=()=>{ searollRef.value.next() }
const info=()=>{ console.log("getInfo",searollRef.value.getInfo());}
const goTo=(index)=>{ searollRef.value.goTo(index?index:parseInt(inputIndex.value)) }

</script>
<template>
  <div class="rolling-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">自动滚动 方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.direction" :options="state.directionOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">滚动模式</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.mode" :options="state.modeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">自动滚动</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.autoRolling" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">无缝滚动</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.seamless" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">悬停暂停</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.hoverPause" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">Debug</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.debug" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">填充数据</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.fillData" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group group-number">
        <div class="label">显示条数</div>
        <TuiInput type="number" :min="1" v-model="config.visibleLength"/>
      </div>
      <div class="form-group">
        <div class="label">控制栏</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showControl" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">控制栏位置</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.controlAlign" :options="state.contAlignOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">控制栏方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.controlDirection" :options="state.controlDirOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.mode=='page'">
        <div class="label">控制栏类型</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.controlType" :options="state.ctrlTypeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">动态模糊</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.motionBlur" :options="state.boolOpt"></TuiRadio>
      </div>
    </div>

    <div class="button-bar">
      <tui-button @click="play">play</tui-button>
      <tui-button @click="stop">stop</tui-button>
      <tui-button @click="toggle">toggle</tui-button>
      <tui-button @click="prev">prev</tui-button>
      <tui-button @click="next">next</tui-button>
      <tui-button @click="info">info</tui-button>
      <tui-button @click="goTo('frist')">frist</tui-button>
      <tui-button @click="goTo('last')">last</tui-button>

      <tui-input v-model="inputIndex">
        <template #suffix>
          <tui-button @click="goTo()">Go</tui-button>
        </template>
      </tui-input>

      <TuiButtonGroup class="btn-group">
        <TuiButton @click="addItem"><i class="tui-icon ti-plus"></i></TuiButton>
        <TuiButton @click="remItem"><i class="tui-icon ti-minus"></i></TuiButton>
      </TuiButtonGroup>
    </div>

    <div class="demo-inner">

      <!--// mode item  -->

      <div :class="`demo-box demo-${config.direction}`">
        <div class="demo-title">Index 初始值</div>
        <div class="demo-item" >
          <TuiRolling ref="searollRef" v-bind="{
            ...state.rollingA,
            ...config
          }">
            <TuiRollingItem v-for="(item,index) in dataA">{{ item }}</TuiRollingItem>
          </TuiRolling>
        </div>
      </div>

      <div :class="`demo-box demo-${config.direction}`">
        <div class="demo-title">正常</div>
        <div class="demo-item" >
          <TuiRolling v-bind="{
            ...state.rollingB,
            ...config
          }">
            <TuiRollingItem v-for="(item,index) in dataA">{{ item }}</TuiRollingItem>
          </TuiRolling>
        </div>
      </div>
      
      <div :class="`demo-box demo-${config.direction}`">
        <div class="demo-title">Page模式 indicator-hover toggle-button</div>
        <div class="demo-item" >
          <TuiRolling v-bind="{
            ...state.rollingC,
            ...config
          }">
            <TuiRollingItem v-for="(item,index) in dataA">{{ item }}</TuiRollingItem>
          </TuiRolling>
        </div>
      </div>

      <div :class="`demo-box demo-${config.direction}`">
        <div class="demo-title">数据不足且不补齐</div>
        <div class="demo-item" >
          <TuiRolling v-bind="{
            ...state.rollingD,
            ...config
          }">
            <TuiRollingItem v-for="(item,index) in dataB">{{ item }}</TuiRollingItem>
          </TuiRolling>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="less">
.rolling-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .button-bar{ padding:10px 20px 0 20px; .flex;
    .tui-input{width: 120px; margin-left: 10px;}
    .btn-group{ margin-left: 10px;}
  }
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-right,
      &.demo-left{ height:250px;
        .demo-item{width: 100%; height:100%; .centerFlex; }
      }

      &.demo-down,
      &.demo-up{ height:500px; width:calc(25% - 30px);
        .demo-item{width: 100%; height:100%; }
      }
      .demo-item{flex-direction: column;
        .tui-rolling{flex:1;.bd(var(--common-bd));.bgc(var(--common-bg));}
      }
      .tui-orient-h{
        .tui-rolling-item{.centerFlex; .bdr(var(--common-bd));}
      }
      .tui-orient-v{
        .tui-rolling-item{.centerFlex; .bdb(var(--common-bd));}
      }
      .tui-roll-dir-h{.tui-rolling-controls{.bdl(var(--common-bd));}}
      .tui-roll-dir-hr{.tui-rolling-controls{.bdr(var(--common-bd));}}
      .tui-roll-dir-v{.tui-rolling-controls{.bdt(var(--common-bd));}}
      .tui-roll-dir-vr{.tui-rolling-controls{.bdb(var(--common-bd));}}
      
    }
  }
}
</style>
