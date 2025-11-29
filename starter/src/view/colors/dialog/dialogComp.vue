<script setup>
import { inject, reactive, watch } from "vue";
const props=defineProps({ dialogConfig:Object, colors:Array})

const {$tToast}=inject("$global");

const emits = defineEmits(["pushParmas"])

const dialogConfim=()=>{
  if(!select.color||!select.saturation||!select.lightness){
    $tToast({content:"Miss Filed", type: 'warning', })
    return
  }
  select.type=props.dialogConfig.type
  emits("pushParmas",select)
}

watch(()=>props.dialogConfig,(val)=>{
  if(val.show){
    select.color=""
    select.saturation=""
    select.lightness=""
    select.type=""
  }
},{deep:true})

const select=reactive({
  color:"",
  saturation:"",
  lightness:"",
  type:""
});

const state=reactive({
  radioCfg:{
    defaultIcon:false,
    appearance:"button", 
  }
})


</script>
<template>
  <TuiDialog v-model="dialogConfig.show" title="Choose Color" :width="640" :destroyOnClose="true">
    <div class="dialog-content">
      <h3>Color</h3>
      <TuiRadio class="color-group" v-model="select.color" :defaultIcon="false">
        <TuiRadioItem v-for="(item,index) in colors" :value="item.short">
          <div :class="`color-item bg-${item.short}`" :style="`background-color:${item}`">
            <i class="tui-icon ti-check" v-if="select.color==item.short"></i>
            <span class="name" v-else>{{item.short}}</span>
          </div>
        </TuiRadioItem>
      </TuiRadio>
      <h3>Saturation</h3>
      <TuiRadio v-model="select.saturation" v-bind="state.radioCfg">
        <TuiRadioItem v-for="(item,index) in dialogConfig.level" :value="item">{{item}}</TuiRadioItem>
      </TuiRadio>
      <h3>Brightness</h3>
      <TuiRadio v-model="select.lightness" v-bind="state.radioCfg">
        <TuiRadioItem v-for="(item,index) in dialogConfig.LD" :value="item">{{item}}</TuiRadioItem>
      </TuiRadio>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <TuiButton @click="dialogConfig.show = false">Cancel</TuiButton>
        <TuiButton type="primary" @click="dialogConfim" >Confirm</TuiButton >
      </span>
    </template>
  </TuiDialog>
</template>
<style lang="less">
@import url(../less/base-bg.less);
.dialog-content{
  h3{.fc(var(--font-base));}
  .color-group{
    --tui-radio-pd:0;
    --tui-radio-height:40px;
    --tui-radio-itm-mgidt:0;
    gap:5px;
    .tui-radio-item{.por;
      .color-item {width: 40px; height: 40px; .fc(@wh); .tst(@gym5); font-weight: bold; .bdra(5px); .centerFlex;
        .tui-icon{.bgc(fade(@bk,30%)); .poa; inset:0; .centerFlex; .bdra(5px);}
      }
    }
  }
}
</style>
