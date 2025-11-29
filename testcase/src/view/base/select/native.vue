<script setup>
import { onMounted, reactive } from 'vue'
const state=reactive({
  slotInput1:"",
  slotInput2:"",
  input1:"",
  input2:"",
  input3:"",
  input4:"",
  input5:"",
  input6:"",
  options:[
    { value: 'A', label: '选项A' },
    { value: 'B', label: '选项b' },
    { value: 'C', label: '选项C',disabled:true },
    { value: 'D', label: '选项D' },
    { value: 'E', label: '选项E' },
    { value: 'F', label: '选项F' },
    { value: 'G', label: '选项G' },
    { value: 'H', label: '选项H' },
    { value: 'I', label: '元素I' },
    { value: 'J', label: '元素J' },
    { value: 'K', label: '元素K' },
    { value: 'L', label: '元素L' },
  ],
  inputGroup:[
    {label:"单选",common:{},children:[
      {label:"默认",value:"",config:{}},
      {label:"可清空",value:"",config:{clearable:true}},
      {label:"禁用",value:"",config:{disabled:true}},
      {label:"图标",value:"",config:{icon:"tui-icon ti-star"}},
      {label:"图标SVG",value:"",config:{icon:"tui-icon ti-search"}},
    ]},
    {label:"多选",common:{},children:[
      {label:"多选",value:"",config:{multiple:true}},
      {label:"禁用",value:"",config:{disabled:true,multiple:true}},
    ]},
    {label:"尺寸",common:{},children:[
      {label:"小",value:"",config:{clearable:true,size:"small"}},
      {label:"默认",value:"",config:{clearable:true,}},
      {label:"大",value:"",config:{filterable:false,size:"large"}},
      {label:"小",value:"",config:{clearable:true,size:"small",icon:"tui-icon ti-star"}},
      {label:"默认",value:"",config:{clearable:true,icon:"tui-icon ti-star"}},
      {label:"大",value:"",config:{filterable:false,size:"large",icon:"tui-icon ti-search"}},
    ]},
  ]
})

const filterMethod=(option,text)=>{
  return option.value.includes(text)
}

onMounted(() => {
  
})

</script>
<template>
  <div class="input-demo-wrap">
    <!-- <el-input readonly v-model="state.testinput"></el-input>
    <el-input type="textarea" readonly v-model="state.testinput"></el-input> -->
    
    <template v-for="(group,indexG) in state.inputGroup">
      <div class="group-title">{{ group.label }}</div>
      <div class="demo-inner" >
        
        <div class="demo-box" v-for="(iptEl,indexIpt) in group.children">
          <div class="demo-title">{{ iptEl.label }}</div>
          <TuiSelectNative v-if="iptEl.type!='blank'" :options="state.options" v-model="iptEl.value" v-bind="{...group.common,...iptEl.config}"  />
          <div class="selected-value" v-if="iptEl.value">Selected: {{ iptEl.value }}</div>
        </div>
        
      </div>
      
    </template>
    <div class="group-title">Slot传入item</div>
    <div class="demo-inner" >
      
      <div class="demo-box">
        <div class="demo-title">Slot 单选</div>
        <TuiSelectNative v-model="state.slotInput1" >
          <TuiOptionNative v-for="(option, index) in state.options" 
            :key="index"
            :value="option.value"
            :label="option.label"
            :disabled="option.disabled"
          />
        </TuiSelectNative>
        <div class="selected-value" v-if="state.slotInput1">Selected: {{ state.slotInput1 }}</div>
      </div>
      <div class="demo-box">
        <div class="demo-title">Slot 多选</div>
        <TuiSelectNative multiple filterable v-model="state.slotInput2" >
          <TuiOptionNative v-for="(option, index) in state.options" 
            :key="index"
            :value="option.value"
            :label="option.label"
            :disabled="option.disabled"
          />
        </TuiSelectNative>
        <div class="selected-value" v-if="state.slotInput2">Selected: {{ state.slotInput2 }}</div>
      </div>
      
    </div>

  </div>
</template>
<style lang="less">
.input-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .group-title{ .bdb(var(--common-bd)); font-size: 16px;font-weight: bold; margin:0 20px; line-height: 1.5;}
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{width:calc(25% - 30px); .por;
      .demo-title{padding:10px;}
      .selected-value{margin:10px;}
    }
  }
}
</style>
