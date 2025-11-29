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
  
  // 自定义System Logo案例
  customSystems:[
    {label:"Custom Text",desc:"自定义主副标题",config:{iconLogo:"tui-icon ti-star",mainText:"MyApp",subText:"Pro",iconAppearance:"colorful",textAppearance:"fontBase"}},
    {label:"Custom Color",desc:"字符图标+文字",config:{iconLogo:"tui-icon ti-star",mainText:"StarApp",subText:"v2.0",iconAppearance:"custom",textAppearance:"custom"}},
    {label:"iconSrc + Custom Text",desc:"SVG图标+自定义文字",config:{
      iconSrc:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' class='iconify iconify--logos' width='37.07' height='36' preserveAspectRatio='xMidYMid meet' viewBox='0 0 256 198'%3E%3Cpath fill='%2341B883' d='M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z'%3E%3C/path%3E%3Cpath fill='%2341B883' d='m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z'%3E%3C/path%3E%3Cpath fill='%2335495E' d='M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z'%3E%3C/path%3E%3C/svg%3E",
      mainText:"Secure",subText:"Lite",iconAppearance:"colorful",textAppearance:"fontBase"
    }},
    {label:"Appearance White",desc:"白色字符图标",config:{iconLogo:"tui-icon ti-cog",mainText:"Settings",subText:"Panel",iconAppearance:"white",textAppearance:"white"}},
    {label:"Only Main Text",desc:"仅主标题",config:{iconLogo:"tui-icon ti-star",mainText:"Brand",subText:"",iconAppearance:"black",textAppearance:"black"}},
  ],
})

</script>
<template>
  <div class="tui-logo-icon-demo">
    <TuiForm class="operat-bar" :model="config" inline labelPosition="top">
      <TuiFormItem label="SystemLogo方向" prop="direction">
        <TuiRadio v-bind="state.radioCfg" v-model="configsys.direction" :options="state.dirOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="图标尺寸" prop="size">
        <TuiRadio v-bind="state.radioCfg" v-model="config.size" :options="state.logoSizeOpt"></TuiRadio>
      </TuiFormItem>
      <TuiFormItem label="文字尺寸" prop="textSize">
        <TuiRadio v-bind="state.radioCfg" v-model="configsys.textSize" :options="state.textSizeOpt"></TuiRadio>
      </TuiFormItem>
    </TuiForm>

    <div class="section-title">TechUI Icon Logo</div>
    <div :class="['item',`item-appear-${item.config.appearance}`]" v-for="item in state.logos">
      <div class="title">{{ item.label }}</div>
      <div class="desc">{{ item.desc  }}</div>
      <TuiIconLogo v-bind="{...item.config,...config}"></TuiIconLogo>
    </div>

    <div class="devider"></div>
    <div class="section-title">TechUI System Logo</div>
    <div :class="['item',`item-appear-${item.config.iconAppearance}`,`item-tappear-${item.config.textAppearance}`]" v-for="item in state.logoSys">
      <div class="title">{{ item.label }}</div>
      <div class="desc">{{ item.desc  }}</div>
      <TuiSystemLogo v-bind="{
        logoSize:config.size,
        ...item.config,
        ...configsys,
      }"></TuiSystemLogo>
    </div>

    <div class="devider"></div>
    <div class="section-title">Custom System Logo</div>
    <div :class="['item',`item-appear-${item.config.iconAppearance}`,`item-tappear-${item.config.textAppearance}`]" v-for="item in state.customSystems">
      <div class="title">{{ item.label }}</div>
      <div class="desc">{{ item.desc  }}</div>
      <TuiSystemLogo v-bind="{
        logoSize:config.size,
        ...item.config,
        ...configsys,
      }"></TuiSystemLogo>
    </div>

    <div :class="['item','item-appear-colorful']">
      <div class="title">Full Slot Custom</div>
      <div class="desc">通过slot完全自定义图标和文字</div>
      <TuiSystemLogo 
        :logoSize="config.size"
        :direction="configsys.direction"
        :textSize="configsys.textSize"
        iconAppearance="colorful"
        textAppearance="fontBase"
      >
        <template #icon>
          <i class="tui-icon ti-rocket" style="color: #8B5CF6; font-size: 48px;"></i>
        </template>
        <template #text>
          <span style="font-weight: 900;">Slot</span>
          <span style="font-weight: 100; padding: 0 10px 0 0;">Custom</span>
        </template>
      </TuiSystemLogo>
    </div>

    <div :class="['item','item-appear-colorful']">
      <div class="title">Emoji Slot</div>
      <div class="desc">使用Emoji作为图标</div>
      <TuiSystemLogo 
        :logoSize="config.size"
        :direction="configsys.direction"
        :textSize="configsys.textSize"
        iconAppearance="colorful"
        textAppearance="fontBase"
      >
        <template #icon>
          <span style="font-size: 48px;">🚀</span>
        </template>
        <template #text>
          <span style="font-weight: 900;">Emoji</span>
          <span style="font-weight: 100; padding: 0 10px 0 0;">Fun</span>
        </template>
      </TuiSystemLogo>
    </div>
    
  </div>
</template>
<style lang='less'>
.tui-logo-icon-demo{width:100%; margin:0 auto; padding:20px 40px; .flex(20px);flex-wrap: wrap;
  .section-title{width:100%; font-size: 24px; font-weight: bold; margin-top: 20px; padding: 10px 0; border-bottom: 2px solid var(--common-bd);}
  .operat-bar{width:100%; .flex(20px); padding:0; margin-bottom:20px; flex-wrap: wrap; }
  .devider{width:100%;}
  .item{.centerFlex; width:calc(16.666666% - 25px); padding:20px; .bdra(10px); .flex(10px); flex-direction: column; 
    .title{font-size: 18px;}
    .desc{font-size: 12px; text-align: center;}
    &.item-appear-colorful{.bgc(var(--common-bg)); .bd(var(--common-bd)); 
      &.item-tappear-white{ .fc(@wh); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    }
    
    &.item-appear-custom{.bgc(var(--common-bg)); .bd(var(--common-bd)); 
      .tui-logo-icon{ --tui-logo-icon-color:@pul5; }
      .tui-logo-system{ --tui-logo-sys-color:@pul5; --tui-logo-sys-icon-color:@pul5; }
    }
    &.item-appear-white{ .fc(@wh); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    &.item-appear-black{ .fc(@bk); .bgc(var(--tone-base)); .bd(var(--tone-strong));}
    &.item-appear-colorful.text-ivt,
    &.item-appear-weakest{ .fc(var(--tone-weakest)); .bgc(var(--tone-weaker)); .bd(var(--tone-weak));}
    &.item-appear-strongest{ .fc(var(--tone-strongest)); .bgc(var(--tone-weaker)); .bd(var(--tone-weaker));}
  }
}
</style>