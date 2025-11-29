<script setup>
import { reactive, ref } from 'vue'

const props=defineProps({
  formCfg:Object,
  comCfg:Object,
})
const formRef = ref(null)

const selectOptions=[
  { value: 'A', label: '选项A' },
  { value: 'B', label: '选项b' },
  { value: 'C', label: '选项C',disabled:true },
  { value: 'D', label: '选项D' },
  { value: 'E', label: '选项E' },
  { value: 'F', label: '选项F' },
  { value: 'G', label: '加长的选项G加长的选项G加长的选项G加长的选项G加长的选项G' },
  { value: 'H', label: '选项H' },
  { value: 'I', label: '元素I' },
  { value: 'J', label: '元素J' },
  { value: 'K', label: '元素K' },
  { value: 'L', label: '元素L' },
]

const checkboxs=[
  {label:"Item1"},
  {label:"Item2 This is an English text for testing purposes."},
  {label:"Item3",disabled:true},
]

const radios=[
  {label:"Item1"},
  {label:"Item2 This is an English text for testing purposes."},
  {label:"Item3",disabled:true},
]

const form = reactive({
  name: '',
  type: 'B',
  category: 'B',
  date: '',
  week: '',
  repeat:false,
  target: [],
  location: '',
  times:0,
  desc: ''
})

const selectChange=(val)=>{
  console.log("selectChange",val,form);
  
}

const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    {  required: true, message: '请至少选择一个活动类型', trigger: 'change' }
  ],
  category: [
    { required: true, message: '请选择活动分类', trigger: 'change' }
  ],
  date: [
    { required: true, message: '请选择活动日期', trigger: 'change' }
  ],
  week: [
    { required: true, message: '请选择活动周', trigger: 'change' }
  ],
  target: [
    { type: 'array', required: true, message: '请至少选择一个活动目标', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请选择活动地点', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动描述', trigger: 'blur' }
  ]
})

const onSubmit = async () => {
  try {
    const valid = await formRef.value.validate()
    if (valid) {
      console.log('表单验证通过:', form)
    }
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}

const onReset = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <TuiForm class="tui-form-demo" ref="formRef"
    :model="form" 
    :rules="rules"
    v-bind="{...comCfg,...formCfg}"
  >
    <TuiFormItem label="Activity name" prop="name">
      <TuiInput v-model="form.name" :maxLength="10" clearable placeholder="请输入活动名称" />
    </TuiFormItem>
    <TuiRow :gutter="20">
      <TuiCol :span="12">
        <TuiFormItem label="Activity type" prop="type">
          <TuiSelect @change="selectChange" clearable v-model="form.type" :options="selectOptions"/>
        </TuiFormItem>
      </TuiCol>
      <TuiCol :span="12">
        <TuiFormItem label="Activity Times" prop="times">
          <TuiInput v-model="form.times" type="number" :min="0" :max="5" />
        </TuiFormItem>
      </TuiCol>
    </TuiRow>
    <TuiRow :gutter="20">
      <TuiCol :span="12">
        <TuiFormItem label="Activity Date" prop="date">
          <TuiTimePickerNative type="datetime" clearable v-model="form.date" />
        </TuiFormItem>
      </TuiCol>
      <TuiCol :span="12">
        <TuiFormItem label="Activity Week" prop="week">
          <TuiTimePickerNative type="week" clearable v-model="form.week" />
        </TuiFormItem>
      </TuiCol>
    </TuiRow>
    <TuiFormItem label="Repeat" prop="repeat">
      <TuiToggle v-model="form.repeat" />
    </TuiFormItem>
    <TuiFormItem label="Activity Target" prop="target">
      <TuiCheckbox appearance="buttonPlain" v-model="form.target">
        <TuiCheckboxItem :icon="item.icon" :value="item.label" v-for="(item,index) in checkboxs">{{ item.label }}</TuiCheckboxItem>
      </TuiCheckbox>
    </TuiFormItem>
    <TuiFormItem label="Activity Location" prop="location">
      <TuiRadio appearance="buttonPlain" v-model="form.location">
        <TuiRadioItem :icon="item.icon" :value="item.label" v-for="(item,index) in radios">{{ item.label }}</TuiRadioItem>
      </TuiRadio>
    </TuiFormItem>
    <TuiFormItem label="Activity Desc" prop="desc">
      <TuiInput v-model="form.desc" type='textarea' :maxLength="30" />
    </TuiFormItem>
    <TuiFormItem contentAlign="right">
      <TuiButton type="primary" @click="onSubmit"> Create </TuiButton>
      <TuiButton @click="onReset"> Cancel </TuiButton>
    </TuiFormItem>
  </TuiForm>
</template>
<style lang="less">
</style>