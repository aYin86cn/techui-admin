<script setup>
const {$i18nt,timer,$tState,$themePalette,$tBus}= inject('$global');

import demoAlpha from "../images/demoAlpha.png";

import banner01 from "../images/banner01.png";
import banner02 from "../images/banner02.png";
import banner03 from "../images/banner03.png";
import banner04 from "../images/banner04.png";
import btn01 from "../images/btn1.png";
import btn02 from "../images/btn2.png";
import btn03 from "../images/btn3.png";
import btn04 from "../images/btn4.png";

const $theme={...$themePalette.value};

const state=reactive({
  tui3DAlphaConfig:{
    mode:"gyro",
    uesAlpha:true,
    shadowCoeff:.2,
    thicknessCoeff:0.05,
  },
  t3DGridConfig:{
    mode:"gyro",
    debug:false,
    shadowCoeff:.5,
    thicknessCoeff:0.2,
  },
  buttonImages:[btn01,btn02,btn03,btn04],
  cardList:[
    {title:"This is card title",date:"20230728",img:banner01,statistics:{comments:532,forward:428,favorite:631,view:121}},
    {title:"This is card title",date:"20230728",img:banner02,statistics:{comments:52,forward:31,favorite:68,view:82}},
    {title:"This is card title",date:"20230728",img:banner03,statistics:{comments:42,forward:21,favorite:23,view:28}},
    {title:"This is card title",date:"20230728",img:banner04,statistics:{comments:532,forward:421,favorite:231,view:321}},
  ],
  t3DCardConfig:{
    mode:"gyro",
    shadowBlur:5,
    shadowCoeff:.5,
    thicknessCoeff:0.2,
  },
})

onMounted(() => {
})

</script>
<template>
  <div class="Tui3DPanel-card-wrap">
    
      
    <p class="desc">独立模式</p>
    <div class="demo-grid">
      <div class="grid-item" v-for="(item,index) in state.buttonImages"  :key="index">
        <Tui3DPanel :config="state.t3DGridConfig" :index="index">
          <template #default="parmas">
            <img :class="`img-3d ${parmas?.boxShadowName}`" :src="item" alt="">
          </template>
        </Tui3DPanel>
      </div>
      
    </div>
    
    <p class="desc">联合模式</p>
    <Tui3DPanel :config="state.t3DGridConfig">
      <template #default="parmas">
        <div class="demo-grid">
          <div class="grid-item" v-for="(item,index) in state.buttonImages">
            <img :class="`img-3d ${parmas?.boxShadowName}`" :src="item" alt="">
          </div>
        </div>
      </template>
    </Tui3DPanel>
    
    <p class="desc">独立模式-附带文字阴影</p>
    <div class="card-wrap">
      <div class="card-item" v-for="(item,index) in state.cardList" :key="index">
        <Tui3DPanel :config="state.t3DCardConfig" group="card" :index="index">
          <template #default="parmas">
            <div :class="`card-inner ${parmas?.boxShadowName}`">
              <img :src="item.img" alt="">
              <div class="title">{{item.title}}</div>
            </div>
            <div :class="`statistics-wrap ${parmas.textShadowName}`">
              <div class="sta-item" v-for="(itemSta,indexSta) in item.statistics">
                <i class="tui-icon ti-chat" v-if="indexSta=='comments'"></i>
                <i class="tui-icon ti-terminal" v-if="indexSta=='forward'"></i>
                <i class="tui-icon ti-star" v-if="indexSta=='favorite'"></i>
                <i class="tui-icon ti-dialog" v-if="indexSta=='view'"></i>
                <span class="sta">{{itemSta}}</span>
              </div>
            </div>
          </template>
        </Tui3DPanel>
      </div>
    </div>
    
    <p class="desc">使用陀螺仪的Alpha参数</p>
    <div class="demo-item">
      <Tui3DPanel :config="state.tui3DAlphaConfig" group="alpha">
        <template #default="parmas">
          <img :class="`img-3d demoAlpha ${parmas?.boxShadowName}`" :src="demoAlpha" alt="">
        </template>
      </Tui3DPanel>
    </div>

  </div>
</template>
<style lang="less">
.Tui3DPanel-card-wrap{padding:40px 40px 100px 40px; overflow: auto; .poa; inset:0;text-align: center;
  .img-3d{width: 100%; .bdra(10px);
    &.demoAlpha{width:200px; height:200px; margin:0 auto; .bdra(50%);}
  }
  .demo-item{margin:0 0 40px 0;
  }
  .demo-grid{.grid(2,2,20px); margin:40px 0;
    .grid-item{
      .grid-inner{.bgc(var(--button-bg_act)); min-height:80px; .bdra(10px);}
    }
  }
  
  .card-wrap{
    .card-item{margin:30px 0;
      .unInit{
        .card-inner{ }
      }
      .inited{
        .card-inner{
          .title{ }
        }
      }
      .card-inner{.bdra(10px);.por;
        img{width:100%; height:200px; object-fit: cover; .bdra(10px);}
        .title{font-size: 16px; padding:10px;.poa; .bgBlur; .bgc(fade(@bk,50%)); .bdra(0 0 10px 10px); .fc(@wh); bottom:0; left:0; right:0;}//.bglg(fade(@bk,20%),fade(@bk,60%),180deg);
      }
      .statistics-wrap{padding: 5px; .fc(var(--font-normal)); .por; z-index: 1;
        .sta-item{display:inline-block; font-size: 14px; margin:0 20px 0 0;
          .i{margin:0 5px 0 0; vertical-align: bottom;}
          .sta{}
        }
      }
    }
  }
}


</style>