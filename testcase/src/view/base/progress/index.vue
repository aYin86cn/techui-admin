<script setup>
import { $c } from "@techui/colors";
import { tInterval } from "@techui/utils";
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
const thresholdsPct={
  critical:0,
  danger:20,
  warning:39,
  normal:49,
  success:79
}

const thresholdsVal={
  critical:0,
  danger:59,
  warning:120,
  normal:180,
  success:260
}

const state=reactive({
  progressGroup:[
    {title:"Bar-基础",type:"bar",children:[
      {label:"label width 120",config:{value:30,labelWidth:140,index:12,
        tipConfig:{type:"primary"},
        tagConfig:{type:"danger",tone:"strong"}
      }},
      {label:"success",config:{value:50,status:'success'}},
      {label:"warning",config:{value:70,status:'warning',index:5}},
      {label:"danger",config:{icon:"tui-icon ti-star",maxValue:200,value:90,unit:"吨",displayValue:"auto",status:'danger',showStatusIcon:false}},
    ]},
    {title:"Bar-进阶 (labelNewline)",type:"bar",children:[
      {label:"indeterminate",config:{labelNewline:true,value:30.25,indeterminate:true,duration:6,index:1}},
      {label:"striped maxValue thresholds",config:{icon:"tui-icon ti-star",labelNewline:true,value:150,maxValue:300,precision:1,unit:"万吨",striped:true,strokeWidth:12,valuePosition:'newline',index:2,thresholds:thresholdsVal,displayValue:"auto"}},
      {label:"stripedFlow",config:{labelNewline:true,value:70,strokeWidth:12,striped:true,stripedFlow:true,status:'warning'}},
      {label:"valueInside",config:{icon:"tui-icon ti-star",labelNewline:true,valuePosition:'inside',value:90,color:$c.pul5}},
    ]},
    
    {title:"Circle-基础",type:"circle",children:[
      {label:"normal",config:{value:30,icon:"tui-icon ti-star",iconSize:24,iconColor:$c.cyl5}},
      {label:"success",config:{value:50,status:'success'}},
      {label:"warning",config:{value:70,status:'warning',showStatusIcon:false}},
      {label:"danger",config:{value:90,status:'danger'}},
    ]},
    {title:"Circle-进阶",type:"circle",children:[
      {label:"numberValue",config:{type:"circle",strokeWidth:12,value:53,maxValue:372,unit:"万吨"}},
      {label:"custom color",config:{type:"circle",value:50,strokeWidth:12,label:null,color:$c.pul5,strokeLinecap:"square"}},
      {label:"guage",config:{type:"guage",value:70,strokeWidth:12,icon:"tui-icon ti-star",iconSize:24}},
      {label:"guage custom color",config:{type:"guage",value:90,strokeWidth:12,label:null,strokeLinecap:"butt",color:$c.pul5}},
    ]},
    {title:"Bar-无label 无Text",type:"bar",children:[
      {label:"normal",config:{value:30,label:null,showValue:null}},
      {label:"success",config:{value:50,status:'success',label:null,showValue:null}},
      {label:"warning",config:{labelNewline:true,value:70,status:'warning',label:null,showValue:null}},
      {label:"danger",config:{labelNewline:true,value:90,status:'danger',label:null,showValue:null}},
    ]},
    {title:"Guage",type:"guage",children:[
      {label:"自定义尺寸",config:{value:70,strokeWidth:10,width:200,valueSize:32,labelSize:16}},
      {label:"自定义尺寸",config:{value:15,strokeWidth:10,width:200,valueSize:24,labelSize:16,icon:"tui-icon ti-star",iconSize:30}},
    ]},
  ]
})

const format = (props) => {
  if(props.value === 100){
    return 'Full'
  }else if(props.value < 30){
    return 'Low'
  }else{
    return `${props.value}%`
  }
}

const pctVal=ref(0)
const nomVal=ref(0)

watch(()=>nomVal.value,(val)=>{
  state.progressGroup[1].children[1].config.value=val
})


onMounted(() => {
  tInterval.s('progressX321',() => {
    pctVal.value = (pctVal.value >= 100) ? 0 : pctVal.value + 10
    nomVal.value = (nomVal.value >= 300) ? 0 : nomVal.value + 30
  }, 3000)
})
onUnmounted(()=>{
  tInterval.c('progressX321')
})
</script>
<template>
  <div class="progress-demo-wrap">
    <!-- <el-progress :value="90" status="success" showValue="false" />
    <el-progress :value="90" type="circle" status="warning" :indeterminate="true" />
    <el-progress :value="90" status="danger" /> -->
    <div class="demo-inner">
      <div :class="`demo-box demo-${item.type}`" v-for="(item,indexP) in state.progressGroup">
        <div class="demo-title">{{ item.title }}</div>
        <div class="demo-item" v-for="(progress,indexP) in item.children">
          <TuiProgress :label="progress.label" :type="item.type" v-bind="progress.config" ></TuiProgress>
        </div>
      </div>

      <div :class="`demo-box demo-bar`">
        <div class="demo-title">Bar Slot</div>

        <div class="demo-item">
          <TuiProgress label="Format Demo" :thresholds="thresholdsPct" :labelWidth="120" :value="pctVal" :format="format"/>
        </div>

        <div class="demo-item">
          <TuiProgress :value="pctVal">
            <template v-slot="{ value }">
              default Solt {{ value }} %
            </template>
            <template v-slot:label>
              Solt Demo
            </template>
            <template v-slot:icon>
              <i class="tui-icon ti-laptop"></i>
            </template>
          </TuiProgress>
        </div>

        <div class="demo-item">
          <TuiProgress :value="pctVal" :labelNewline="true" status="success">
            <template v-slot="{ value }">
              default Solt {{ value }} %
            </template>
            <template v-slot:label>
              Solt Demo
            </template>
            <template v-slot:icon>
              <i class="tui-icon ti-laptop"></i>
            </template>
          </TuiProgress>
        </div>
        
        

      </div>

      <div :class="`demo-box demo-circle`">
        <div class="demo-title">Circle Guage Slot</div>

        <div class="demo-item">
          <TuiProgress type="circle" :thresholds="thresholdsPct" label="Format Demo" :value="pctVal" :format="format"/>
        </div>

        <div class="demo-item">
          <TuiProgress :iconSize="24" type="circle" :value="pctVal">
            <template v-slot="{ value }">
              {{ value }} %
            </template>
            <template v-slot:label>
              Solt Demo
            </template>
            <template v-slot:icon>
              <i class="tui-icon ti-laptop"></i>
            </template>
          </TuiProgress>
        </div>

        <div class="demo-item">
          <TuiProgress :iconSize="24" type="guage" :value="pctVal" :labelNewline="true" status="success">
            <template v-slot="{ value }">
              {{ value }} %
            </template>
            <template v-slot:label>
              Solt Demo
            </template>
            <template v-slot:icon>
              <i class="tui-icon ti-laptop"></i>
            </template>
          </TuiProgress>
        </div>
        
        

      </div>

    </div>
  </div>
</template>
<style lang="less">
.progress-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-bar{ flex-direction: column; gap:50px; justify-content: center;
        .tui-progress-bar{margin:0;}
        &:nth-child(2){gap:25px;}
      }
      &.demo-bar-other{ flex-direction: column; gap:50px; justify-content: center;
        .tui-progress-bar{margin:0;}
        &:nth-child(2){gap:25px;}
      }
      &.demo-circle,
      &.demo-guage{align-items: center; justify-content: center;
        .demo-item{text-align: center;
          .item-label{padding:0 0 10px 0;}
          .tui-progress{margin-top:10px;}
        }
      }
    }
  }
}
</style>
