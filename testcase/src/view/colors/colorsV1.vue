
<script setup>
import { inject } from "vue";
const {$tToast}=inject("$global");

const jscolor=(val)=>{
  return $c[val];
}
const colors=[
  {short:"re",eng:"red",chs:"红"},
  {short:"ro",eng:"red-orange",chs:"红橙"},
  {short:"or",eng:"orange",chs:"橙"},
  {short:"oy",eng:"orange-yellow",chs:"橙黄"},
  {short:"ye",eng:"yellow",chs:"黄"},
  {short:"yc",eng:"yellow",chs:"黄"},
  {short:"ch",eng:"chartreuse",chs:"草绿"},
  {short:"cg",eng:"chartreuse-green",chs:"草绿-绿"},
  {short:"gr",eng:"green",chs:"绿"},
  {short:"ga",eng:"green-aquamarine",chs:"绿-水绿"},
  {short:"aq",eng:"aquamarine",chs:"水绿"},
  {short:"ac",eng:"aquamarine-cyan",chs:"水绿-青"},
  {short:"cy",eng:"cyan",chs:"青"},
  {short:"cb",eng:"cyan-blue",chs:"青蓝"},
  {short:"bl",eng:"blue",chs:"蓝"},
  {short:"bi",eng:"blue-indigo",chs:"蓝靛"},
  {short:"in",eng:"indigo",chs:"靛"},
  {short:"ip",eng:"indigo-purple",chs:"靛紫"},
  {short:"pu",eng:"purple",chs:"紫"},
  {short:"pp",eng:"purple-pink",chs:"紫粉"},
  {short:"pi",eng:"pink",chs:"粉"},
  {short:"pv",eng:"pink-violetred",chs:"粉-洋红"},
  {short:"vi",eng:"violetred",chs:"紫红"},
  {short:"vr",eng:"violetred-red",chs:"紫红-红"},
  {short:"gy",eng:"gray",chs:"灰"}
]
const normal=["l","m","r","d"]
const variation=["vl","vm","vr","vd"]//variation

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  $tToast({content:"拷贝成功", type: 'success', })
};

</script>
<template>
  <div class="techUIColors">
    <div class="color-row">
      <div class="css-color color-column">
        <div class="group-wrapper" v-for="(item,index) in colors" :key="'g1-'+index">
          <p class="title">{{index+1}}-{{item.short}}-{{item.eng}}</p>
          <div class="color-wrapper" :class="'color-'+item.short+'-wrapper'" >
            <div class="sub-wrapper" v-for="(item2,index2) in normal" :key="'g2-'+index2">
              <!-- <p class="title-sub">{{item.short}}-{{item2}}</p> -->
              <ul class="color-group "><!--+colors[i]+"-"+sort[j]+""-->
                  <li 
                    :class="'bg-'+item.short+item2+item3" 
                    v-for="(item3,index3) in 9" :key="'g3-'+index3"
                    @click="copyToClipboard(item.short+item2+(index3+1))"
                  >
                    {{item.short}}{{item2}}{{index3+1}}
                  </li><!--"+colors[i]+"-"+sort[j]+k+"-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<style lang="less">
@import "./less/base-bg.less";
.techUIColors{padding:0 40px; margin:40px 0; 
  .color-row{width:100%;
    .color-column{.grid(2,1,20px); width: 100%; 
      // .title1st{.bgc(var(--common-bg)); .bdt(var(--common-bd));.bdb(var(--common-bd)); .fc(var(--primary-base)); font-size: 3rem; font-weight:bold;text-transform:uppercase; text-indent: 1rem; padding:6rem 0 3rem 0; }
    }
  }
  .group-wrapper{
    .title{font-size: 1.2rem; font-weight:bold;text-transform:uppercase; text-indent: 1rem; .fc(var(--font-base)); }
    .color-wrapper{.bgc(var(--tech-bg)); .bd(var(--tech-bd)); padding:10px; .bdra(6px); margin:1rem; display:block;
      .sub-wrapper{
        .title-sub{font-size: 1rem;  text-indent: 1rem; color:#999; margin:0;}
        .color-group{display:table;width: 100%; padding:0; margin:0;
          li{width:3rem;height:3rem;  display:table-cell; margin:.5rem;line-height: 3rem; color:#fff; text-align: center; text-shadow: 1px 1px 3px rgba(0,0,0,.8);}
        }
      }
    }
  }
}


</style>



