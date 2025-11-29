<script setup>
import { reactive } from 'vue';
import FormA from "./sub/formA.vue";

defineOptions({
  name: 'formDemo',
})

const comCfg=reactive({
  inline:false,
  labelPosition:"right",
  labelWidth:150,
  labelSuffix:":",
  labelHide:false,
  asteriskHide:false,
  asteriskPosition:'left',
  validateOnRuleChange:true,
  disabled:false,
  scrollToError:false,
  size:'default',
  scrollIntoViewOptions:true,
})

const formACfg=reactive({
})

const formBCfg=reactive({
  labelSuffix:"-",
})

const state=reactive({
  formCfg:{
    inline:true,
  },
  radioCfg:{ appearance:"button", defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],

  sizeOpt:[
    {label:"小",value:"small"},
    {label:"默认",value:"default"},
    {label:"大",value:'large'},
  ],
  labelPosOpt:[
    {label:"左对齐",value:"left"},
    {label:"右对齐",value:"right"},
    {label:"上部",value:'top'},
  ],
  astiskOpt:[
    {label:"左",value:"left"},
    {label:"右",value:"right"},
  ],
  contAlignOpt:[
    {label:"Start",value:"start"},
    {label:"Center",value:"center"},
    {label:"End",value:'end'},
  ],
})

</script>
<template>
  <div class="form-demo-wrap">
    <div class="operat-bar">
      <TuiForm class="tui-form-demo" :model="comCfg" inline labelPosition="top">
        <TuiFormItem label="Label位置" prop="labelPosition">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.labelPosition" :options="state.labelPosOpt"></TuiRadio>
        </TuiFormItem>
        <TuiFormItem label="Label宽度" prop="labelWidth">
          <TuiInput style="width:150px" :min="100" :max="250" :step="50" type="number" v-model="comCfg.labelWidth" ></TuiInput>
        </TuiFormItem>
        <TuiFormItem label="星号位置" prop="asteriskPosition">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.asteriskPosition" :options="state.astiskOpt"></TuiRadio>
        </TuiFormItem>
        <TuiFormItem label="隐藏Label" prop="labelHide">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.labelHide" :options="state.boolOpt"></TuiRadio>
        </TuiFormItem>
        <TuiFormItem label="禁用" prop="disabled">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.disabled" :options="state.boolOpt"></TuiRadio>
        </TuiFormItem>
        <TuiFormItem label="内联元素" prop="inline">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.inline" :options="state.boolOpt"></TuiRadio>
        </TuiFormItem>
        <TuiFormItem label="尺寸大小" prop="inline">
          <TuiRadio v-bind="state.radioCfg" v-model="comCfg.size" :options="state.sizeOpt"></TuiRadio>
        </TuiFormItem>

      </TuiForm>

      <!-- 
      <div class="form-group">
        <div class="label">Type色调</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.tone" :options="state.toneOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">半透明</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.transparent" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.transparent">
        <div class="label">背景模糊</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.backgroundBlur" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group" v-if="config.transparent">
        <div class="label">显示关闭</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.showClose" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label">静音</div>
        <TuiRadio v-bind="state.radioCfg" v-model="config.mute" :options="state.boolOpt"></TuiRadio>
      </div>
      <div class="form-group">
        <div class="label current-channel" v-if="$aDispatcher.currentChannel">当前消息类型: {{ $aDispatcher.currentChannel }}</div>
        <div class="queue-length" v-if="$aDispatcher.queue.length>0">总消息队列: {{ $aDispatcher.queue.length }}</div>
      </div> -->
    </div>

    <div class="demo-inner">
      <div class="demo-box">
        <div class="demo-title">
          <span class="label">默认</span>
        </div>
        <FormA :comCfg="comCfg" :formCfg="formACfg"/>
      </div>
      <div class="demo-box">
        <div class="demo-title">默认</div>
        <FormA :comCfg="comCfg" :formCfg="formBCfg"/>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.form-demo-wrap{ min-height:100%; width:1400px; margin:0 auto ; padding:20px; 
  .operat-bar{ }
  .demo-inner{.flex(40px); padding:20px 0; flex-wrap: wrap; margin:0 0 50px 0;
    .demo-box{width:calc(50% - 20px); padding:20px; .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px;
      .demo-title{margin-bottom:20px; .bdb(var(--common-bd)); padding:10px; font-weight: bold; font-size: 16px; .flex;
        .label{flex:1;}
        .tui-raido{}
      }

    }
  }
  
}
</style>
