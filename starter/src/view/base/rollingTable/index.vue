<script setup>
import { $c } from "@techui/colors";
import { tNum } from "@techui/utils";
import { inject, onBeforeMount, onMounted, reactive, ref } from 'vue';
const {$themePalette}= inject('$global');
const {font,primary,success,warning,danger,emphasis}=$themePalette.value


const tableData=ref([])
const tableDataPercent=ref([])
const tableDataNumber=ref([])

const config=reactive({
  tipConfig:{
    // type:"danger"
  },
  debug:false,
  visibleLength:4,
  interval:3000,
  showControl:true,
  seamless:true,  
  fillData:true,
  mode: 'item',
  motionBlur:true,
})

const tableCfgA={
  header: ['列1', '列2', '列3', '列4', '列5', '列6', '列7', '列8'],
}

const tableCfgB={
  header: ['W100Start', 'W90Center', 'NoneSet', 'NoneSet', 'NoneSet', 'NoneSet', 'NoneSet','W90End'],
  columnWidths: [140,90,null,null,null,null,null,90],
  columnAligns: ['start',"center",null,null,null,null,null,'end'],
  hasIndexCol:true,
}

const tableCfgC={
  header: ['列1', '列2', '列3', '列4', '列5', '列6', '列7', '列8'],
  columnWidths: [50,null,null,null,null,null,null,null],
  headerBG:primary.base,
  headerFC:font.weakest,
  fontColor:font.base,
  rowBD:primary.weaker,
  oddRowBG:$c.fade(primary.weakest,.5),
  // evenRowBG:primary.weakest,
  theadHeight:50,
  hasIndexCol:true,
  tagConfig:{
    type:"primary"
  },
}

const tableCfgD={
  header: ['列1', '列2', '列3', '列4', '进度','操作'],
  columnTypes:[null,null,null,null,'percent','operation'],
  columnWidths: [60,null,null,null,160,80],
  operation:[
    {label:"查看",value:"view",type:"primary"},
    {label:"删除",value:"delete",type:'danger'},
  ],
  hasIndexCol:true,
  buttonApperance:"link",
  progressConfig:{
    showValue:true,
    strokeWidth:10,
    valueType:"number",
    unit:"万吨",
    // maxValue:2000,
    thresholds:{
      critical:0,
      danger:30,
      warning:50,
      normal:60,
      success:80
    },
  },
  tagConfig:{
    type:"emphasis"
  },
}

const tableCfgE={
  columnWidths: [50,null,null,100,120,120],
}
const tableCfgF={
  columnWidths: [50,null,null,100,70,120],
  hasIndexCol:true,
}

const state=reactive({
  
  showBG:false,

  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  modeOpt:[
    {label:"整页",value:"page"},
    {label:"数据",value:'item'},
  ],

})


const addItem=(val)=>{

  tableData.value.push(genTableData({row:1,col:8,text:'newLine'})[0])
  tableDataPercent.value.push(genTableData({row:1,col:5,text:'newLine',percentIdx:5})[0])
  tableDataNumber.value.push(genTableData({row:1,col:5,text:'newLine',percentIdx:5})[0])
}

const remItem=(val)=>{
  tableData.value.pop()
  tableDataPercent.value.pop()
  tableDataNumber.value.pop()
}

const tableOperation=(obj)=>{
  console.log("tableOperation",obj);
  
}

const genTableData = ({
  row = 5, 
  col = 5, 
  text,
  percentIdx,
  min=0,
  max=100
}) => {
  let data = [];
  for (var i = 0; i < row; i++) {
    let rowData = [];
    for (var j = 0; j < col; j++) {
      if(percentIdx-1==j){
        rowData.push(tNum.rdm(min,max));
      }else if (text) {
        rowData.push(text);
      } else {
        rowData.push(`${i+1}行${j+1}列`);
      }
    }
    data.push(rowData);
  }
  return data;
}

onMounted(()=>{
  tableData.value=genTableData({row:10,col:8});
  tableDataPercent.value=genTableData({row:10,col:5,percentIdx:5});
  tableDataNumber.value=genTableData({row:10,col:5,percentIdx:5,min:200,max:1000});
  
})
onBeforeMount(()=>{
  
})
</script>
<template>
  <div class="rolltable-demo-wrap">
    <div class="operat-bar">
      <div class="form-group">
        <div class="label">开启测试背景</div>
        <TuiRadio v-bind="state.radioCfg" v-model="state.showBG" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group group-number">
        <div class="label">显示条数</div>
        <TuiInput type="number" :min="1" :max="15" v-model="config.visibleLength"/>
      </div>
      <div class="form-group">
        <div class="label">滚动模式</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.mode" :options="state.modeOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">显示控制栏</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showControl" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">无缝滚动</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.seamless" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">填充数据</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.fillData" :options="state.boolOpt"></TuiRadio>
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
      
      <div  class="demo-box">
        <div class="demo-title">TableA 基础用法</div>
        <div class="demo-item" >
          <TuiRollingTable class="roll-table-demo" v-bind="{
            ...config, 
            ...tableCfgA,
          }">
            <TuiRollingTableRow v-for="(row,index) in tableData" :index="index" :data="row"/>
          </TuiRollingTable>
        </div>
      </div>

      <div  class="demo-box">
        <div class="demo-title">TableB 列设置 含序号</div>
        <div class="demo-item" >
          <TuiRollingTable class="roll-table-demo" v-bind="{
            ...config,
            ...tableCfgB,
          }" >
            <TuiRollingTableRow v-for="(row,index) in tableData" :index="index" :data="row"/>
          </TuiRollingTable>
        </div>
      </div>
      <div  class="demo-box">
        <div class="demo-title">TableC 传参控制：THead背景 行高 奇偶行 ... 设置</div>
        <div class="demo-item" >
          <TuiRollingTable class="roll-table-demo" v-bind="{
            ...config,
            ...tableCfgC,
          }" >
            <TuiRollingTableRow v-for="(row,index) in tableData" :index="index" :data="row"/>
          </TuiRollingTable>
        </div>
      </div>
      
      <div  class="demo-box">
        <div class="demo-title">TableD CssVar控制样式，进度条，操作栏 以及参数配置</div>
        <div class="demo-item" >
          <TuiRollingTable @operation="tableOperation" class="roll-table-cssvar-demo" v-bind="{
            ...config,
            ...tableCfgD,
          }" >
            <TuiRollingTableRow v-for="(row,index) in tableDataNumber" :index="index" :data="row"/>
          </TuiRollingTable>
        </div>
      </div>

      <div  class="demo-box">
        <div class="demo-title">TableE 无header 通过ColSlot插槽注入数据（调用内部progress组件） 以及 dom传参</div>
        <div class="demo-item" >
          <TuiRollingTable @operation="tableOperation" class="roll-table-demo" v-bind="{
            ...config,
            ...tableCfgE,
          }" >
            <TuiRollingTableRow v-for="(row,ridx) in tableDataPercent" :index="ridx" >
              <TuiRollingTableCol v-for="(col,cidx) in row" :contentType="cidx==3&&'component'||cidx==4&&'percent'||'string'">
                <template v-if="cidx!==3">{{ col }}</template>
                <TuiTag type="warning" class="special-dom" v-else>{{ col }}</TuiTag>
              </TuiRollingTableCol>
              <TuiRollingTableCol>
                <TuiButton size="small" plain type="primary">查看</TuiButton>
                <TuiButton size="small" plain type="danger">删除</TuiButton>
              </TuiRollingTableCol>
            </TuiRollingTableRow>
          </TuiRollingTable>
        </div>
      </div>
      
      <div  class="demo-box">
        <div class="demo-title">TableF 无header 通过ColSlot插槽注入数据（调用外部progress组件） 以及 dom传参</div>
        <div class="demo-item" >
          <TuiRollingTable @operation="tableOperation" class="roll-table-demo" v-bind="{
            ...config,
            ...tableCfgF,
          }" >
            <TuiRollingTableRow v-for="(row,ridx) in tableDataPercent" :index="ridx" >
              <TuiRollingTableCol v-for="(col,cidx) in row" :contentType="cidx==3&&'component'||cidx==4&&'component'||'string'">
                <TuiTag type="warning" class="special-dom" v-if="cidx==3">{{ col }}</TuiTag>
                <TuiProgress :valueSize="12" type="circle" style="width:40px" :value="parseInt(col)" v-else-if="cidx==4"/>
                <template v-else>{{ col }}</template>
              </TuiRollingTableCol>
              <TuiRollingTableCol>
                <TuiButton size="small" plain type="primary">查看</TuiButton>
                <TuiButton size="small" plain type="danger">删除</TuiButton>
              </TuiRollingTableCol>
            </TuiRollingTableRow>
          </TuiRollingTable>
        </div>
      </div>

    </div>
    
  </div>
</template>
<style lang="less">
//:controlType="state.ctrlTypeCfg.active" 
.rolltable-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px; .por;
  .operat-bar{.flex(30px); padding:0 20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{.flex(40px); padding:20px; margin:0; flex-wrap: wrap;
    .demo-box{display:flex; flex-direction: column; gap:0; .por; width: calc(50% - 20px); height:340px; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); padding:10px;
      &.show-bg{ .bgi("../_common/tempBG/pattern.png"); background-size: 100px 60px; padding:20px; .bd(@bk,3px); .bdra(10px);}
      .demo-title{}
      .radio-demo{.poa; left:10px; bottom:10px; }
      .btn-group{.poa; right:10px; bottom:10px;}

      .demo-item{ flex:1; overflow: hidden;}

      .roll-table-cssvar-demo{
        --tui-rolltb-col-fc:var(--font-base);
        --tui-rolltb-col-pd:0 10px;
        --tui-rolltb-head-fc:var(--font-weakest);
        --tui-rolltb-head-bg:var(--emphasis-base);
        --tui-rolltb-head-lh:50px;
        --tui-rolltb-row-bd:var(--emphasis-weaker);
        --tui-rolltb-oddbg:var(--emphasis-weakest_op5);
        // --tui-rolltb-evenbg:var(--emphasis-weakest);
      }
      

    }
  }
}


</style>
