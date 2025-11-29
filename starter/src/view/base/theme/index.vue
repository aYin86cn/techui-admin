<script setup>
import { $c } from "@techui/colors";
import { cssVarGen } from "@techui/utils";
import { computed, inject, onMounted } from 'vue';
const element=[
  {label:"common",desc:"常规边框背景",children:[
    {label:"bd bg root",className:"common-bg-bd-root"},
    {label:"bd bg",className:"common-bg-bd"},
    {label:"bd bg layer",className:"common-bg-bd-layer"},
    {label:"bd bg frame",className:"common-bg-bd-frame"},

  ]},
  
  {label:"font",desc:"字体",children:[
    {label:"strongest",className:"font-strongest"},
    {label:"stronger",className:"font-stronger"},
    {label:"strong",className:"font-strong"},
    {label:"base",className:"font-base"},
    {label:"weak",className:"font-weak"},
    {label:"weaker",className:"font-weaker"},
    {label:"weakest",className:"font-weakest"},
  ]},
  {label:"button",desc:"按钮",children:[
    {label:"base",className:"button-base"},
    {label:"hover",className:"button-hover"},
    {label:"active",className:"button-active"},
    {label:"disabled",className:"button-disabled"},
  ]},
  {label:"input",desc:"输入框、下拉选择框",children:[
    {label:"base",className:"input-base"},
    {label:"hover",className:"input-hover"},
    {label:"active",className:"input-focus"},
    {label:"disabled",className:"input-disabled"},
  ]},
  {label:"menu",desc:"菜单",children:[
    {label:"base",className:"menu-base"},
    {label:"hover",className:"menu-hover"},
    {label:"active",className:"menu-active"},
    {label:"disabled",className:"menu-disabled"},
  ]},
  {label:"shadow",desc:"阴影(非主题中设定)",children:[
    {label:"shadow weakest",className:"shadow-weakest"},
    {label:"shadow weaker",className:"shadow-weaker"},
    {label:"shadow weak",className:"shadow-weak"},
    {label:"shadow base",className:"shadow-base"},
    {label:"shadow strong",className:"shadow-strong"},
    {label:"shadow stronger",className:"shadow-stronger"},
    {label:"shadow strongest",className:"shadow-strongest"},
    
  ]},
  {label:"overlay",desc:"叠加层(非主题中设定)",children:[
    {label:"overlay weakest",className:"overlay-weakest"},
    {label:"overlay weaker",className:"overlay-weaker"},
    {label:"overlay weak",className:"overlay-weak"},
    {label:"overlay base",className:"overlay-base"},
    {label:"overlay strong",className:"overlay-strong"},
    {label:"overlay stronger",className:"overlay-stronger"},
    {label:"overlay strongest",className:"overlay-strongest"},
    
  ]},
  {label:"scroll",desc:"滚动条",children:[
    {label:"scroll",className:"scroll"},
    {label:"scroll layer",className:"scroll-layer"},
  ]},
  {label:"background",desc:"矢量背景颜色定义",children:[
    {label:"bg view",className:"techui-bg-view"},
    {label:"bg root",className:"techui-bg-root"},
  ]},
  {label:"chart",desc:"图表配色",children:[
    {label:"common",className:"chart-common"},
    {label:"map",className:"chart-map"},
    {label:"visual",className:"chart-visual"},
    {label:"palette",className:"chart-palette"},
  ]},
  
  {label:"tone",desc:"当前主题限定从最暗到最亮的颜色值",labels:["weakest","weaker","weak","base","strong","stronger","strongest"], children:[
    {label:"tone",className:"tone"},
    {label:"tone",className:"tone",opacity:"op9"},
    {label:"tone",className:"tone",opacity:"op8"},
    {label:"tone",className:"tone",opacity:"op7"},
    {label:"tone",className:"tone",opacity:"op6"},
    {label:"tone",className:"tone",opacity:"op5"},
    {label:"tone",className:"tone",opacity:"op4"},
    {label:"tone",className:"tone",opacity:"op3"},
    {label:"tone",className:"tone",opacity:"op2"},
    {label:"tone",className:"tone",opacity:"op1"},
  ]
  },

  {label:"status",desc:"6种状态",labels:["weakest","weaker","weak","base","strong","stronger","strongest"], children:[
  
    {label:"status info",className:"info"},
    {label:"status info",className:"info",opacity:"op9"},
    {label:"status info",className:"info",opacity:"op8"},
    {label:"status info",className:"info",opacity:"op7"},
    {label:"status info",className:"info",opacity:"op6"},
    {label:"status info",className:"info",opacity:"op5"},
    {label:"status info",className:"info",opacity:"op4"},
    {label:"status info",className:"info",opacity:"op3"},
    {label:"status info",className:"info",opacity:"op2"},
    {label:"status info",className:"info",opacity:"op1"},
    {divider:true},

    {label:"status primary",className:"primary"},
    {label:"status primary",className:"primary",opacity:"op9"},
    {label:"status primary",className:"primary",opacity:"op8"},
    {label:"status primary",className:"primary",opacity:"op7"},
    {label:"status primary",className:"primary",opacity:"op6"},
    {label:"status primary",className:"primary",opacity:"op5"},
    {label:"status primary",className:"primary",opacity:"op4"},
    {label:"status primary",className:"primary",opacity:"op3"},
    {label:"status primary",className:"primary",opacity:"op2"},
    {label:"status primary",className:"primary",opacity:"op1"},

    {divider:true},

    {label:"status success",className:"success"},
    {label:"status success",className:"success",opacity:"op9"},
    {label:"status success",className:"success",opacity:"op8"},
    {label:"status success",className:"success",opacity:"op7"},
    {label:"status success",className:"success",opacity:"op6"},
    {label:"status success",className:"success",opacity:"op5"},
    {label:"status success",className:"success",opacity:"op4"},
    {label:"status success",className:"success",opacity:"op3"},
    {label:"status success",className:"success",opacity:"op2"},
    {label:"status success",className:"success",opacity:"op1"},

    {divider:true},

    {label:"status warning",className:"warning"},
    {label:"status warning",className:"warning",opacity:"op9"},
    {label:"status warning",className:"warning",opacity:"op8"},
    {label:"status warning",className:"warning",opacity:"op7"},
    {label:"status warning",className:"warning",opacity:"op6"},
    {label:"status warning",className:"warning",opacity:"op5"},
    {label:"status warning",className:"warning",opacity:"op4"},
    {label:"status warning",className:"warning",opacity:"op3"},
    {label:"status warning",className:"warning",opacity:"op2"},
    {label:"status warning",className:"warning",opacity:"op1"},

    {divider:true},

    {label:"status danger",className:"danger"},
    {label:"status danger",className:"danger",opacity:"op9"},
    {label:"status danger",className:"danger",opacity:"op8"},
    {label:"status danger",className:"danger",opacity:"op7"},
    {label:"status danger",className:"danger",opacity:"op6"},
    {label:"status danger",className:"danger",opacity:"op5"},
    {label:"status danger",className:"danger",opacity:"op4"},
    {label:"status danger",className:"danger",opacity:"op3"},
    {label:"status danger",className:"danger",opacity:"op2"},
    {label:"status danger",className:"danger",opacity:"op1"},

    {divider:true},

    {label:"status emphasis",className:"emphasis"},
    {label:"status emphasis",className:"emphasis",opacity:"op9"},
    {label:"status emphasis",className:"emphasis",opacity:"op8"},
    {label:"status emphasis",className:"emphasis",opacity:"op7"},
    {label:"status emphasis",className:"emphasis",opacity:"op6"},
    {label:"status emphasis",className:"emphasis",opacity:"op5"},
    {label:"status emphasis",className:"emphasis",opacity:"op4"},
    {label:"status emphasis",className:"emphasis",opacity:"op3"},
    {label:"status emphasis",className:"emphasis",opacity:"op2"},
    {label:"status emphasis",className:"emphasis",opacity:"op1"},
  ]},
]

const {$tc}= inject('$global');

const cssvarCPT = computed(() => {
  let bgarr=$tc('background.view_grad',true).value
  let vsarr=$tc('chart.visual',true).value
  let plarr=$tc('chart.palette',true).value
  let plscle=$c.scale(plarr,4)
  return cssVarGen("cpt-theme", {
    'bg-gradA':bgarr[0],
    'bg-gradB':bgarr[1],
    'bg-gradC':bgarr[2],
    'vs-gradA':vsarr[0],
    'vs-gradB':vsarr[1],
    'pl-gradA':plscle[0],
    'pl-gradB':plscle[1],
    'pl-gradC':plscle[2],
    'pl-gradD':plscle[3],
  });
});

onMounted(()=>{ })
</script>
<template>
  <div class="theme-preview-wrap" :style="cssvarCPT">
    <div class="preview-title">Theme Preview</div>
    <div :class="`theme-group group-${item.label}`" v-for="(item,index) in element">
      <div class="group-title">{{ item.label }} <span class="desc" v-if="item.desc">{{ item.desc }}</span></div>
      <div class="group-content">
        
        <div :class="`group-item ${itemS.divider?'item-devider':''}`" v-for="(itemS,indexS) in item.children">
          <div class="divider" v-if="itemS.divider"></div>
          <div v-else-if="item.label!='status'&&item.label!='tone'" :class="`item-inner ${itemS.className}`">
            <span class="text">{{ itemS.label }}</span>
          </div>
          <div class="item-inner" v-else>
            <div :class="`itemT ${itemS.className}-${itemT}`"  v-for="(itemT,indexT) in item.labels" >
              <div class="itemT-bg" :style="`background-color:var(--${itemS.className}-${itemT}${itemS.opacity?'_'+itemS.opacity:''})`">
                <span class="text">{{itemS.className}}-{{ itemT }}{{ itemS.opacity?'-'+itemS.opacity:'' }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="less">
.theme-preview-wrap{ margin:0 auto; width:1400px; padding:40px;
  .bgTrans(){.bgi("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==");}
  .preview-title{font-size: 24px; font-weight: bold;}
  .theme-group{padding:20px 0;
    .group-title{font-size: 18px; font-weight: bold; padding:20px 0;
      .desc{font-size: 12px; font-weight: normal;}
    }
    .group-content{padding:30px;.flex(30px); flex-wrap: wrap; text-align: center; .bgc(var(--common-bg));.bd(var(--common-bd)); .bdra(10px);
      .group-item{ width:130px;.por; height:100px; .bdra(8px);
        &:before{content:""; inset:1px; .poa; z-index: 1;.bdra(8px); }
        .item-inner{.poa; inset:0; z-index: 2;.bdra(8px); 
          .text{.poa; left:50%; .fixc("x"); white-space: nowrap; bottom:0; .fc(var(--font-strongest)); .bgc(var(--common-bg_op5)); padding:2px 5px; .bdra(8px 8px 0 0); line-height: 1;}
        } 
        &.item-devider{width:100%; height:0; opacity: 0;}
      }
    }
  }
  .group-common{
    .group-content{
      .group-item{width:161px; height:70px; 
        &:before{.bgTrans;}
        .item-inner{padding:30px 0; .bd(var(--common-bd));
          
        }
      }
    }
  }

  .common-bg-bd{.bgc(var(--common-bg)); .bd(var(--common-bd),2px)!important; }
  .common-bg-bd-root{.bgc(var(--common-bg_root)); .bd(var(--common-bd_root),2px)!important; }
  .common-bg-bd-layer{.bgc(var(--common-bg_layer)); .bd(var(--common-bd_layer),2px)!important; }
  .common-bg-bd-frame{.bgc(var(--common-bg_frame)); .bd(var(--common-bd_frame),2px)!important; }
  
  .group-shadow{
    .group-content{
      .group-item{
        // &:before{.bgTrans;}
        .item-inner{padding:30px 0; .bd(var(--common-bd));}
      }
    }
  }
  .shadow-weakest{.bxsVar(var(--shadow-weakest)); }
  .shadow-weaker{.bxsVar(var(--shadow-weaker)); }
  .shadow-weak{.bxsVar(var(--shadow-weak)); }
  .shadow-base{.bxsVar(var(--shadow-base)); }
  .shadow-strong{.bxsVar(var(--shadow-strong)); }
  .shadow-stronger{.bxsVar(var(--shadow-stronger)); }
  .shadow-strongest{.bxsVar(var(--shadow-strongest)); }
  
  .group-overlay{
    .group-content{
      .group-item{
        &:before{.bgTrans;}
        .item-inner{padding:30px 0; .bd(var(--common-bd));}
      }
    }
  }
  .overlay-weakest{.bgc(var(--overlay-weakest)); }
  .overlay-weaker{.bgc(var(--overlay-weaker)); }
  .overlay-weak{.bgc(var(--overlay-weak)); }
  .overlay-base{.bgc(var(--overlay-base)); }
  .overlay-strong{.bgc(var(--overlay-strong)); }
  .overlay-stronger{.bgc(var(--overlay-stronger)); }
  .overlay-strongest{.bgc(var(--overlay-strongest)); }
  
  .group-scroll{
    .group-content{
      .group-item{
        .item-inner{padding:30px 0;}
      }
    }
  }
  .scroll,.scroll-layer{.bgc(var(--common-bg)); .bd(var(--common-bd)); overflow: auto;
    &:after{display:block; content:" text text text text text text text text text text text text text text text text text text"; .fc(var(--font-weakest));}
  }
  .scroll-layer{ .scrollLayer;}

  .group-font{
    .group-content{
      .group-item{
        .item-inner{.bd(var(--common-bd)); font-size: 24px; font-weight: bold;
          .text{top:50%; .fixc("xy"); line-height: 2; .bgc(@tr); }
        }
      }
    }
  }

  .font-strongest{ .text{.fc(var(--font-strongest))!important;}}
  .font-stronger{.text{.fc(var(--font-stronger))!important;}}
  .font-strong{.text{.fc(var(--font-strong))!important;}}
  .font-base{.text{.fc(var(--font-base))!important;}}
  .font-weak{.text{.fc(var(--font-weak))!important;}}
  .font-weaker{.text{.fc(var(--font-weaker))!important;}}
  .font-weakest{.text{.fc(var(--font-weakest))!important;}}
  
  .group-button{ .group-content{ .group-item{line-height: 44px; } } }
  .button-base{.bgc(var(--button-bg)); .bd(var(--button-bd),3px);}
  .button-hover{.bgc(var(--button-bg_hov)); .bd(var(--button-bd_hov),3px);}
  .button-active{.bgc(var(--button-bg_act)); .bd(var(--button-bd_act),3px);}
  .button-disabled{.bgc(var(--button-bg_dis)); .bd(var(--button-bd_dis),3px);}

  .group-input{ .group-content{ .group-item{line-height: 44px; } } }
  .input-base{.bgc(var(--input-bg)); .bd(var(--input-bd),3px);}
  .input-hover{.bgc(var(--input-bg_hov)); .bd(var(--input-bd_hov),3px);}
  .input-focus{.bgc(var(--input-bg_foc)); .bd(var(--input-bd_foc),3px);}
  .input-disabled{.bgc(var(--input-bg_dis)); .bd(var(--input-bd_dis),3px);}

  .group-menu{ .group-content{ .group-item{line-height: 44px; &:before{.bgTrans;}} } }
  .menu-base{.bgc(var(--menu-bg)); .bd(var(--menu-bd),3px);}
  .menu-hover{.bgc(var(--menu-bg_hov)); .bd(var(--menu-bd_hov),3px);}
  .menu-active{.bgc(var(--menu-bg_act)); .bd(var(--menu-bd_act),3px);}
  .menu-disabled{.bgc(var(--menu-bg_dis)); .bd(var(--menu-bd_dis),3px);}

  .group-background{
    .group-content{
      .group-item{
        .item-inner{padding:25px 0; 
          &::before{content:""; width:30px;height:30px; .bdra(50%); .centerAbsolute;}
        }
      }
    }
  }
  .techui-bg-view{ background-image: linear-gradient(30deg,var(--cpt-theme-bg-gradA),var(--cpt-theme-bg-gradB),var(--cpt-theme-bg-gradC));
    &::before{.bgc(var(--background-view_svgfill)); }
  }
  .techui-bg-root{.bgc(var(--background-root)); 
    &::before{.bgc(var(--background-root_svgfill)); }
  }

  .group-chart{
    .group-content{
      .group-item{
        .item-inner{padding:25px; }
      }
    }
  }
  .chart-common{.bgc(var(--common-bg)); .bdt(var(--chart-line-weak));.bdl(var(--chart-line-base)); .bdb(var(--chart-line-strong));.bdr(var(--chart-line-weak));}
  .chart-map{.bgc(var(--chart-map-bg)); .bd(var(--chart-map-bd),3px); box-shadow: 0 0 10px var(--chart-map-glow) inset,0 0 10px var(--chart-map-shadow);
    &:hover{.bgc(var(--chart-map-bg_hov));.bd(var(--chart-map-bd_hov),3px);}
  }
  .chart-visual{background-image: linear-gradient(90deg,var(--cpt-theme-vs-gradA),var(--cpt-theme-vs-gradB));}
  .chart-palette{background-image: linear-gradient(90deg,var(--cpt-theme-pl-gradA),var(--cpt-theme-pl-gradB),var(--cpt-theme-pl-gradC),var(--cpt-theme-pl-gradD));}

  .group-tone,
  .group-status{
    .group-content{.flex(5px);
      .group-item{height:70px; width:100%;
        &:before{display:none;}
        .item-inner{height:100%; .flex(5px);
          .itemT{flex:1; .bd(var(--common-bd)); .bdra(8px); font-size: 12px; .por; z-index: 2;  //.fc(var(--font-weakest)); 
            &:before{.bgTrans; content:""; inset:1px; .poa; z-index: 1; .bdra(8px);}
            .itemT-bg{.por; z-index: 2;.bdra(8px); height: 100%;}
          }
        }
        &.item-devider{height:30px;}
      }
    }
  }
  .status-primary{}
  .status-success{}
  .status-info{}
  .status-warning{}
  .status-danger{}

}
</style>
