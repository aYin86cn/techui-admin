<script setup>
import { inject, reactive, toRefs } from 'vue';

const {i18n,audio}= inject('$global');

const state=reactive({
  audoDemos:[
    'clickA',
    'clickB',
    'clickC',
    'dindonA',
    'dindonB',
    'dindonC',
    'errorA',
    'errorB',
    'errorC',
    'errorD',
    'pingA',
    'pingB',
    'pingC1',
    'pingC2',
    'pingC3',
    'popupA',
    'popupB',
    'popupC',
    'popupD',
  ]
})

const audioPlay=(name)=>{
  console.log("audioPlay name",name);
  
  audio.play(name)
}


const {
  
}=toRefs(state)


</script>
<template>
  <div class="audio-demo-wrap">
    <div class="blank-demo-inner">
      <div class="blank-demo-box" v-for="(item,index) in state.audoDemos">
        <div class="demo-title" >{{ item }}</div>
        <div class="play-button" @click="audioPlay(item)">
          <i class="tui-icon tis-play"></i>
        </div>
      </div>
      
    </div>
  </div>
</template>
<style lang="less">
.audio-demo-wrap{ min-height:100%; width:1400px; margin:0 auto ; padding:20px; 
  .blank-demo-inner{.flex(20px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0;
    .blank-demo-box{width:calc(12.5% - 18px); .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(5px); min-height:100px; .centerFlex;
      
      .demo-title{.poa; left:0; top:0; margin:10px;}
      .play-button{width: 40px; height: 40px; .bd(var(--font-weaker),4px); .bdra(50%); .centerFlex; cursor: pointer; .ani(.5s,scale); user-select: none;
        .tui-icon{font-size:12px; .fc(var(--font-weak)); .ani;}
        &:hover{scale:1.1;
          .tui-icon{.fc(var(--font-strong));}
        }
        &:active{.bgc(var(--primary-weakest));}
      }
    }
  }
}
</style>
