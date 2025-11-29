<script setup>
import { onMounted, reactive } from 'vue'
defineOptions({
  name: 'TimePickerNativeDemo',
})
const state=reactive({
  input1:"",
  input2:"",
  input3:"",
  input4:"",
  input5:"",
  input6:"",
  inputGroup:[
    {label:"日期选择",common:{type:"date"},children:[
      {label:"默认",value:"",config:{note:"test"}},
      {label:"格式化",value:"",config:{format:"MM月DD日"}},
      {label:"大",value:"",config:{size:"large"}},
      {label:"小",value:"",config:{size:"small"}},
    ]},
    {label:"日期时间选择",common:{type:"datetime"},children:[
      {label:"默认",value:"",config:{}},
      {label:"可清空",value:"",config:{clearable:true}},
      {label:"格式化",value:"",config:{format:"YYYY年MM月DD日 HH时mm分"}},
    ]},
    {label:"时间选择",common:{type:'time'},children:[
      {label:"默认",value:"",config:{}},
      {label:"格式化",value:"",config:{format:"HH时MM分"}},
    ]},
    {label:"月选择",common:{type:'month'},children:[
      {label:"默认",value:"",config:{}},
      {label:"格式化",value:"",config:{format:"YYYY年MM月"}},
      
    ]},
    {label:"周选择",common:{type:'week'},children:[
      {label:"默认",value:"",config:{}},
      {label:"格式化",value:"",config:{format:"YYYY年第WW周"}},
    ]},
  ]
})

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
        
        <form class="demo-box" v-for="(iptEl,indexIpt) in group.children">
          <div class="demo-title">{{ iptEl.label }}</div>
          <TuiTimePickerNative v-model="iptEl.value" v-bind="{...group.common,...iptEl.config}" />
        </form>
        
      </div>
      
    </template>
    
  </div>
</template>
<style lang="less">
.input-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .group-title{ .bdb(var(--common-bd)); font-size: 16px;font-weight: bold; margin:0 20px; line-height: 1.5;}
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{width:calc(25% - 30px); .por;
      .demo-title{padding:10px;}
    }
  }
}
</style>
