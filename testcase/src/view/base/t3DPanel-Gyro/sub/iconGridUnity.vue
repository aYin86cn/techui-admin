<script setup>
const {$i18nt,timer,$tState,$themePalette,$tBus}= inject('$global');
import bannerSmall02 from "../images/banner-small02.png";
const $theme={...$themePalette.value};
const state=reactive({
  colorsN:["eb4747","f77d3d","f9ad42","e4e477","cdde72","a8df71","80e180","45e092","24e2af","18e0c6","32dad3","00d5ec","00a9ed","0078e0","1956ef","5d60eb","866ef6","f865c2","eb4771","f02c4c"],
  colorsL:["ff7c57","ffad55","ffdd66","e3e376","e3ff8e","b9ff98","86ffa7","5affc1","4cffdd","52fff4","69ffff","43d8ff","41a9ff","6193ff","5687ff","7577f6","a794ff","fb8ed3","ff7a9c","ff738a"],
  gridData:[
    {label: "Factory Leader",icon: "tui-icon ti-user-spark-square"},
    {label: "Office",icon:"tui-icon ti-computer-desk"},
    {label: "Enterprise Management", icon: "tui-icon ti-certificate"},
    {label: "Financial Management", icon: "tui-icon ti-coins"},
    {label: "Audit Office", icon: "tui-icon ti-chart-bar-square"},
    {label: "Human Resources", icon: "tui-icon ti-user-group-alt"},
    {label: "Party Construction", icon: "tui-icon ti-users-group"},
    {label: "Disciplinary Inspection",icon:"tui-icon ti-slideshare"},
    {label: "Standard Management", icon: "tui-icon ti-inbox-text"},
    {label: "Group Work Office",icon: "tui-icon ti-buildings"},
    {label: "Security Office", icon: "tui-icon ti-shield-keyhole"},
    {label: "Manufacturing Office", icon: "tui-icon ti-cogs-alt"},
    {label: "Quality Management",icon:"tui-icon ti-script"},
    {label: "Logistics sub-center", icon: "tui-icon ti-locker-alt"},
    {label: "Administration Office", icon: "tui-icon ti-user-ai"},
    {label: "Product leaves",icon: "tui-icon ti-books-marked"},
    {label: "Information Center",icon: "tui-icon ti-newspaper"},
    {label: "Supplies Department",icon: "tui-icon ti-coffee"},
    {label: "Procurement Management",icon:"tui-icon ti-rubiks-cube"},
    {label: "Trade Union Investment", icon: "tui-icon ti-payment"},
  ],
  tui3DConfig:{
    mode:"gyro",
    coeff:.5,
    shadowCoeff:1,
    thicknessCoeff:.3,
  },
})

// const t3DGridConfig=(item,index)=>{
//   return {
//     mode:"gyro",
//     thicknessColor:$c.darken("#"+state.colorsN[index],.8),
//     shadowCoeff:.5,
//     thicknessCoeff:.2,
//   }
// }

const getColor=(index)=>{
  return $c.darken('#'+state.colorsN[index],.8)
}

onMounted(() => {
})

</script>
<template>
  
  <div class="tui-3d-gyroUnity-wrap">
    <p class="desc">所有图标共用一个T3DPanel组件，配置参公用，其中ThicknessColor，通过CSSVar定义</p>
    <Tui3DPanel :config="state.tui3DConfig">
      <template #default="parmas">
        <img :class="`img-3d ${parmas?.boxShadowName}`" :src="bannerSmall02" />
        <div class="icon-grid">
          <div class="grid-item" v-for="(item,index) in state.gridData" :key="index">
            <div class="grid-item-box">
              <i :class="`grid-icon ${item.icon} ${parmas?.boxShadowName}`" :style="`--thickness-color:${getColor(index)}; --iconBGD:#${state.colorsN[index]};--iconBGL:#${state.colorsL[index]}`"></i>
              <span :class="`text ${parmas.textShadowName}`">{{item.label}}</span>
              <!-- <span :style="`background-color:#${state.colorsL[index]}`">{{state.colorsL[index]}}</span> -->
            </div>
          </div>
        </div>
      </template>
    </Tui3DPanel>
    
  </div>
</template>
<style lang="less">
.tui-3d-gyroUnity-wrap{ padding:60px 40px 0 40px; overflow: auto; .poa; inset:0;
  .desc{text-align: center;}
  img{width: 100%; height: 100px; .bdra(10px); margin:0 0 30px 0;}
  .icon-grid{margin:10px 0 0 0; .grid(4,1,20px);
    .van-grid-item__content{padding:10px; .bgc(@tr);}
    .grid-item{ text-align: center;
      .grid-icon{width:50px; height:50px; display:inline-block; margin:0 auto; text-align: center; line-height: 50px; font-size: 34px; color:#fff; position: relative;border-radius:8px;
        &:before{z-index: 10; position: relative;}
        &:after{ /*background-color:#7bee8a ; background-color:var(--bgColor);background: linear-gradient(#0074c2, #4da9ff);  */ background: linear-gradient(var(--iconBGD), var(--iconBGL));opacity: 1; content:" "; position: absolute; left:0; right:0; top:0; bottom:0; border-radius:8px; z-index: 9;}
      }
      .text{ .por; z-index: 1;padding:5px 0; font-size: 12px;line-height: 14px; max-height: 32px; display:block; }
    }
  }
}


</style>