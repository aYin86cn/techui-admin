<script setup>
import { reactive } from 'vue';

const config=reactive({
  direction:"h",
  ellipsis:true,
  accordion:false,
  collapse:false,
  menuTrigger:"click",
  defaultOpened:['4'],
  defaultActive:['4','4A'],
  fixedWidth:100,
  resizeObserver:'global',
})

const state=reactive({
  width:800,
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  dirOpt:[
    {label:"水平",value:'h'},
    {label:"垂直",value:'v'},
  ],
  triggerOpt:[
    {label:"点击",value:'click'},
    {label:"悬停",value:'hover'},
    {label:"全局",value:'global'},
  ],
  resizeObsOpt:[
    {label:"自身",value:"self"},
    {label:"全局",value:"global",},//disabled:true
    {label:"无",value:"none"},
  ],
})


// Menu data structure
const menuData = [
  { id: "1", label: 'Start', icon:'tui-icon ti-home',
    children: [
      { id: "1A", label: 'Option 1A', 
        children: [
          { id: "1A1", label: 'Option 1A1' },
          { id: "1A2", label: 'Option 1A2' }
        ]
      },
      { id: "1B", label: 'Option 1B',children: [
        { id: "1B1", label: 'Option 1B1' },
        { id: "1B2", label: 'Option 1B2' }
      ]}
    ]
  },
  { id: "2", label: 'Component', icon: 'tui-icon ti-grid', disabled:true,
    children: [
      { id: "2A", label: 'Option 2A' },
      { id: "2B", label: 'Option 2B' }
    ]
  },
  { id: "3", label: 'Theme', icon:'tui-icon ti-palette',
    children: [
      { id: "3A", label: 'Option 3A' , disabled:true}
    ]
  },
  { id: "4", label: 'MultiLan', icon: 'tui-icon ti-language-alt',
    children: [
      { id: "4A", label: 'Option 4A' }
    ]
  },
  { id: "5", label: 'License', icon: 'tui-icon ti-certificate-alt',
    children: [
      { id: "5A", label: 'Option 5A' }
    ]
  },
  { id: "6", label: 'Version', icon: 'tui-icon ti-code-hexagon', },
  { id: "7", label: 'Other', icon: 'tui-icon ti-script', disabled:true,
    children: [
      { id: "7A", label: 'Option 7A' }
    ]
  },
  { id:"8", label: 'About', icon: 'tui-icon ti-info-circle',
    children: [
      { id: "8A", label: 'Option 8A', disabled:true, }
    ]
  }
];

// Methods
function handleChange(obj) {
  console.log('Menu Changed:', obj);
}
function handleOpen(obj) {
  console.log('Menu Open:', obj);
}
function handleClose(obj) {
  console.log('Menu Close:', obj);
}

</script>
<template>
  <div class="tui-nav-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">监测自适应</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.resizeObserver" :options="state.resizeObsOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">方向</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.direction" :options="state.dirOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.direction=='v'">
        <div class="label">手风琴模式</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.accordion" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.direction=='v'">
        <div class="label">折叠导航</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.collapse" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.direction=='h'">
        <div class="label">自动省略</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.ellipsis" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">菜单触发</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.menuTrigger" :options="state.triggerOpt"></TuiRadio>
      </div>

      <div class="form-group group-number" v-if="config.direction=='h'">
        <div class="label">宽度</div>
        <TuiInput type="number" :min="200" :max="1400" :step="100" v-model="state.width"/>
      </div>

    </div>

    <div class="demo-layout" :style="`--box-width:${state.width}px`">

      <div :class="`group group-dir-${config.direction} ${config.collapse?'is-collapse':''}`">
        <TuiNav
          :data="menuData"
          v-bind="config"
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
        />
        
      </div>
      

    </div>
    
  </div>
</template>
<style lang="less">
.tui-nav-demo-wrap{  min-height:100%; width:1400px; margin:0 auto; padding:20px;
  .operat-bar{.por; z-index: 10; .flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .color-grid{.flex(10px); flex-wrap: wrap;
    .item-color{flex:1; min-width:30px; height:30px; opacity: .3; cursor: pointer; .bdra(5px); 
      &.is-active{opacity: 1;}
    }
  }
  .demo-layout{ .flex(40px); padding:20px; flex-wrap: wrap;
    .group-title{width: 100%; .bdb(var(--common-bd)); font-size: 18px; padding:10px 0; font-weight: bold;}
    .group{ padding:10px; .por; .bgc(var(--common-bg));.bd(var(--common-bd)); .bdra(10px); .flex(10px);
      .echart-wrap{flex:1;}
    }
    .group{ 
      &.group-dir-h{width:var(--box-width); }
      &.group-dir-v{width:300px; }
      &.is-collapse{width:auto;}
    }

  }
}
</style>