
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
],
fullLevel=["A","B","C","D","E","F"],
lightDark=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19"]

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  $tToast({content:"拷贝成功", type: 'success', })
};

</script>
<template>
  <div class="techUIColors-expand">
    <div class="color-row">
      <div class="css-color color-column">
        <div class="group-wrapper" v-for="(item,index) in colors" :key="'g1-'+index">
          <p class="title">{{index+1}}-{{item.short}}-{{item.eng}}</p>
          <div class="color-wrapper" :class="'color-'+item.short+'-wrapper'" >
            <div class="sub-wrapper" v-for="(item2,index2) in fullLevel" :key="'g2-'+index2">
              <p class="title-sub" >{{item.short}}-{{item2}}</p>
              <ul class="color-group "><!--+colors[i]+"-"+sort[j]+""-->
                  <li 
                    :class="'bg-'+item.short+item2+item3" 
                    v-for="(item3,index3) in lightDark" 
                    :key="'g3-'+index3"
                    @click="copyToClipboard(item.short+item2+index3)"
                  >{{item2+item3}}</li><!--"+colors[i]+"-"+sort[j]+k+"-->
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<style lang="less">
@import "./less/extended-bg.less";
.techUIColors-expand{ padding:0 40px; margin:40px 0; 
  .color-wrapper{.bgc(var(--tech-bg)); .bd(var(--tech-bd)); padding:10px; .bdra(6px); margin:1rem; display:block;
    .title-sub{font-size: 1rem;  text-indent: 1rem; color:#999; margin:0; display:none;}
    .color-group{display:table;width: 100%;
      li{font-size: 12px; width:3rem;height:3rem; text-shadow: 1px 1px 3px rgba(0,0,0,.8);  display:table-cell; margin:.5rem;line-height: 3rem; color:fade(@wh,80%);text-align: center;}
    }
  }

  .color-row{width:100%;
    .color-column{.grid(2,1,20px); width: 100%; 
      .group-wrapper{
        .title{ text-indent: 1rem; font-size: 1.2rem; font-weight:bold;text-transform:uppercase; .fc(var(--font-base));}
      }
    }
    .css-color{content:""}
    .js-color{content:""}
  }
}

</style>



