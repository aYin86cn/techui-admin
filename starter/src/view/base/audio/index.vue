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
  .blank-demo-inner{display: flex; gap:20px; padding:20px; flex-wrap: wrap; margin:0 0 50px 0;
    .blank-demo-box{width:calc(12.5% - 18px); position: relative; background-color: var(--common-bg); border: 1px solid var(--common-bd); border-radius: 5px; min-height:100px; display: inline-flex; align-items: center; justify-content: center;
      
      .demo-title{position: absolute; left:0; top:0; margin:10px;}
      .play-button{width: 40px; height: 40px; border: 4px solid var(--font-weaker); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition-duration: .5s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: scale; user-select: none;
        .tui-icon{font-size:12px; color: var(--font-weak); transition-duration: .5s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: all;}
        &:hover{scale:1.1;
          .tui-icon{color: var(--font-strong);}
        }
        &:active{background-color: var(--primary-weakest);}
      }
    }
  }
}
</style>
