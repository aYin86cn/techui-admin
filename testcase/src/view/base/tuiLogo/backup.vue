<script setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
const router = useRouter();
const testRef = ref('')

const config=reactive({
  size:48,
})

const configsys=reactive({
  direction:"h",
  textSize:24,
})

const state=reactive({
  radioCfg:{ appearance:"button",  defaultIcon:false, },
  
  boolOpt:[
    {label:"是",value:true},
    {label:"否",value:false},
  ],
  logoSizeOpt:[
    {label:"24px",value:24},
    {label:"32px",value:32},
    {label:"48px",value:48},
  ],
  textSizeOpt:[
    {label:"14px",value:14},
    {label:"18px",value:18},
    {label:"24px",value:24},
  ],
  dirOpt:[
    {label:"水平",value:'h'},
    {label:"垂直",value:'v'},
  ],
  logos:[
    {label:"Colorful",desc:"彩色图标",config:{appearance:"colorful"}},
    {label:"White",desc:"白色图标",config:{appearance:"white"}},
    {label:"Black",desc:"黑色图标",config:{appearance:"black"}},
    {label:"Theme Weakest",desc:"与主题色调贴近",config:{appearance:"weakest"}},
    {label:"Theme Strongest",desc:"与主题色调相反",config:{appearance:"strongest"}},
    {label:"Theme custom",desc:"自定义",config:{appearance:"custom"}},
  ],
  logoSys:[
    {label:"Colorful",desc:"彩色图标",config:{iconAppearance:"colorful",textAppearance:"fontBase"}},
    {label:"White",desc:"白色图标",config:{iconAppearance:"white",textAppearance:"white"}},
    {label:"Black",desc:"黑色图标",config:{iconAppearance:"black",textAppearance:"black"}},
    {label:"Theme Weakest",desc:"与主题色调贴近",config:{iconAppearance:"weakest",textAppearance:"weakest"}},
    {label:"Theme Strongest",desc:"与主题色调相反",config:{iconAppearance:"strongest",textAppearance:"strongest"}},
    {label:"Theme custom",desc:"自定义",config:{iconAppearance:"custom",textAppearance:"custom"}},
    {label:"Colorful White Text",desc:"彩色图标 白色文字",config:{iconAppearance:"colorful",textAppearance:"white"}},
  ],
})

</script>
<template>
  <div class="tui-logo-icon-demo">
    <TuiForm class="operat-bar" :model="config" inline labelPosition="top">
      <TuiFormItem label="图标尺寸" prop="size">
        <TuiRadio v-bind="state.radioCfg" v-model="config.size" :options="state.logoSizeOpt"></TuiRadio>
      </TuiFormItem>
    </TuiForm>
    <div :class="['item',`item-appear-${item.config.appearance}`]" v-for="item in state.logos">
      <div class="title">{{ item.label }}</div>
      <div class="desc">{{ item.desc  }}</div>
      <TuiIconLogo v-bind="{...item.config,...config}"></TuiIconLogo>
    </div>

    <TuiForm class="operat-bar" :model="config" inline labelPosition="top">
      <TuiFormItem label="方向" prop="direction">
        <TuiRadio v-bind="state.radioCfg" v-model="configsys.direction" :options="state.dirOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="文字尺寸" prop="textSize">
        <TuiRadio v-bind="state.radioCfg" v-model="configsys.textSize" :options="state.textSizeOpt"></TuiRadio>
      </TuiFormItem>
    </TuiForm>

    <div :class="['item',`item-appear-${item.config.iconAppearance}`,`item-tappear-${item.config.textAppearance}`]" v-for="item in state.logoSys">
      <div class="title">{{ item.label }}</div>
      <div class="desc">{{ item.desc  }}</div>
      <TuiSystemLogo v-bind="{
        logoSize:config.size,
        ...item.config,
        ...configsys,
      }"></TuiSystemLogo>
    </div>
    
  </div>
</template>
<style lang='less'>
.tui-logo-icon-demo{width:100%; margin:0 auto; padding:20px 40px; .flex(20px);flex-wrap: wrap;
  .operat-bar{width:100%; .flex(20px); padding:0; margin-bottom:20px; flex-wrap: wrap; }
  .devider{width:100%;}
  .item{.centerFlex; width:calc(16.666666% - 25px); padding:20px; .bdra(10px); .flex(10px); flex-direction: column; 
    .title{font-size: 18px;}
    .desc{font-size: 12px;}
    &.item-appear-colorful{.bgc(var(--common-bg)); .bd(var(--common-bd)); 
      &.item-tappear-white{ .fc(@wh); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    }
    
    &.item-appear-custom{.bgc(var(--common-bg)); .bd(var(--common-bd)); 
      .tui-logo-icon{ --tui-logo-icon-color:@pul5; }
      .tui-logo-system{ --tui-logo-sys-color:@pul5; }
    }
    &.item-appear-white{ .fc(@wh); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    &.item-appear-black{ .fc(@bk); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    &.item-appear-colorful.text-ivt,
    &.item-appear-weakest{ .fc(var(--tone-weakest)); .bgc(var(--tone-weaker)); .bd(var(--tone-weak));}
    &.item-appear-strongest{ .fc(var(--tone-strongest)); .bgc(var(--tone-weaker)); .bd(var(--tone-weaker));}
  }
}
</style>