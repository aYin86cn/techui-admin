<script setup>
import { reactive } from 'vue';
const optionsA=[
  { timestamp: '2024-01-20', content: '创建项目创建项目创建项目创建项目创建项目创建项目创建项目创建项目创建项目创建项目',hollow:true },
  { timestamp: '2024-01-21', content: '完成开发',size:'large',hollow:true },
  { timestamp: '2024-01-21', content: '完成开发',size:'large',hollow:true },
  { timestamp: '2024-01-20', type: 'primary', content: '创建项目'},
  { timestamp: '2024-01-21', type: 'danger', content: '完成开发',size:'small'}
]
const optionsB=[
  { timestamp: '2024-01-20', content: '创建项目',size:'small' ,icon:"tui-icon ti-eye"},
  { timestamp: '2024-01-21', type: 'danger', content: '完成开发',size:'default',icon:"tui-icon ti-lotus" },
  { timestamp: '2024-01-21', type: 'success', content: '完成开发',size:'large',icon:"tui-icon ti-eye" },
  { timestamp: '2024-01-20', type: 'primary', content: '创建项目',size:'default',icon:"tui-icon ti-star"},
  { timestamp: '2024-01-21', type: 'warning', content: '完成开发',size:'default',icon:"tui-icon ti-star" }
]
const state=reactive({
  timelineGroup:[
    {title:"Timeline 基础",type:"horizontal",label:"default",options:optionsA,config:{direction:'horizontal' },},
    {title:"Timeline 基础",type:"horizontal",label:"default",options:optionsB,config:{direction:'horizontal',timestampPlacement:'top' },},
    {title:"Timeline 基础",type:"vertical",label:"default",options:optionsA,config:{ timestampPlacement:'top' },},
    {title:"Timeline 基础",type:"vertical",label:"default",options:optionsA,config:{ },},
    {title:"Timeline 基础",type:"vertical",label:"default",options:optionsB,config:{ },},
    {title:"Timeline 基础",type:"vertical",label:"default",options:optionsB,config:{ },},
  ],
  slot:{
    configA:{direction:'horizontal'},
    configB:{maxWidth:200,maxLine:3}
  }
})




</script>
<template>
  <div class="timelines-demo-wrap">

    <div class="demo-inner">
      <div :class="`demo-box demo-${item.type}`" v-for="(item,indexP) in state.timelineGroup">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" >
          <TuiTimeline :options="item.options" v-bind="item.config" :lines="2"></TuiTimeline>
        </div>
      </div>

      <div class="demo-box demo-horizontal">
        <div class="demo-title">slot Demo</div>
        <div class="demo-item" >
          <TuiTimeline v-bind="state.slot.configA" >
            <TuiTimelineItem v-for="(item,index) in optionsA" v-bind="item">{{ item.content }}</TuiTimelineItem>
          </TuiTimeline>
        </div>
      </div>
      <div class="demo-box demo-horizontal">
        <div class="demo-title">slot Demo</div>
        <div class="demo-item" >
          <TuiTimeline v-bind="state.slot.configA" >
            <TuiTimelineItem v-for="(item,index) in optionsB" v-bind="item">{{ item.content }}</TuiTimelineItem>
          </TuiTimeline>
        </div>
      </div>
      <div class="demo-box demo-vertical">
        <div class="demo-title">slot Demo</div>
        <div class="demo-item" >
          <TuiTimeline v-bind="state.slot.configB" >
            <TuiTimelineItem v-for="(item,index) in optionsA" v-bind="item">{{ item.content }}</TuiTimelineItem>
          </TuiTimeline>
        </div>
      </div>

    </div>

    
  </div>
</template>
<style lang="less">
.timelines-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-horizontal{ 
        .demo-item{width: 100%; height:100%; .centerFlex; }
      }
      &.demo-vertical{ height:500px; width:calc(25% - 30px);
        .demo-item{width: 100%; height:100%;  }
        
      }
    }
  }
}
</style>
