<script setup>
import { $c, $chroma } from "@techui/colors";
import { computed, getCurrentInstance, inject, onMounted, reactive, ref, watch } from "vue";
import DialogChange from "./dialog/dialogComp.vue";
const {proxy:{$tMessage}}=getCurrentInstance();
const {$tBus,$tToast}= inject('$global');

const dialogConfig=reactive({
  show:false,
  level:[],
  LD:[],
  type:""
})

watch(()=>dialogConfig.show,(val)=>{
  $tBus.emit("dialogShow",val)
})

const showDialog=(type)=>{
  if(type=='exp'){
    dialogConfig.level=expLevel;
    dialogConfig.LD=expLD;
    dialogConfig.type="exp";
  }else if(type=='bas'){
    dialogConfig.level=basLevel;
    dialogConfig.LD=basLD;
    dialogConfig.type="bas";
  }
  dialogConfig.show=true;
}

const reciveFromDialog=(parmas)=>{
  if(parmas.type=="exp"){
    distanceExp.value=$chroma.distance($c[parmas.color+parmas.saturation+parmas.lightness], inputSearch.value)
    similarColorExp.value=parmas.color+parmas.saturation+parmas.lightness
  }else{
    distance.value=$chroma.distance($c[parmas.color+parmas.saturation+parmas.lightness], inputSearch.value)
    similarColor.value=parmas.color+parmas.saturation+parmas.lightness
  }
  dialogConfig.show=false
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


const basLevel=["l","m","r","d"]
const basLD=[1,2,3,4,5,6,7,8,9]
const inputSearch=ref("");

const expLevel=["A","B","C","D","E","F"]
const expLD=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19"]

const distance=ref(0);
const distanceAdv=ref(0);
const distanceExp=ref(0);
const distanceFixed=computed(()=>{
  return distance.value.toFixed(2);
})
const distanceExpFixed=computed(()=>{
  return distanceExp.value.toFixed(2);
})
const similarColor=ref("");
const similarColorAdv=ref([]);
const similarColorExp=ref("");
const similarColorHex=computed(()=>{
  return $c[similarColor.value]
})
const similarColorExpHex=computed(()=>{
  return $c[similarColorExp.value]
})

const similarColorAdvIndex=ref(0);


const matchColor=()=>{
  if(!isValidColor(inputSearch.value)){
    $tMessage({ content:"Not a valid color", type: 'warning', })
    return
  }
  //在ayin color base中匹配颜色
  distance.value=9999999
  colors.forEach((color,i)=>{
    basLevel.forEach((level,j)=>{
      basLD.forEach((LD,i)=>{
        let distanceCurrent=$chroma.distance($c[color.short+level+LD], inputSearch.value)
        if(distance.value>distanceCurrent){
          distance.value=distanceCurrent;
          similarColor.value=color.short+level+LD;
        }
      })
    })
  })
  
  similarColorAdv.value=[];
  
  //可用高度匹配到相似的颜色，但是太复杂了！
  // for(var i=0;i<10;i++){
  //   for(var j=0;j<10;j++){
  //     similarColorAdv.value.push(
  //       $chroma($chroma($c[similarColor.value]).darken((10-i)*.1).css()).set("hsl.s", (10-j)*.1).hex()
  //     )
  //   }
  // }
  // for(var i=0;i<10;i++){
  //   for(var j=0;j<10;j++){
  //     similarColorAdv.value.push(
  //       $chroma($chroma($c[similarColor.value]).brighten((i+1)*.1).css()).set("hsl.s", (10-j)*.1).hex()
  //     )
  //   }
  // }

  // for(var j=0;j<10;j++){
  //   similarColorAdv.value.push({name:"",color:$chroma($c[similarColor.value]).set("hsl.s", (j+1)*.1).hex()})
  // }

  //通过变换匹配到的颜色的明暗度来生成一些其他颜色用于二次匹配
  for(var i=0;i<10;i++){
    similarColorAdv.value.push({name:'darken(@'+similarColor.value+','+((10-i)*.1).toFixed(1)+')',color:$chroma($c[similarColor.value]).darken((10-i)*.1).hex()})
  }
  for(var i=0;i<10;i++){
    similarColorAdv.value.push({name:'lighten(@'+similarColor.value+','+((10-i)*.1).toFixed(1)+')',color:$chroma($c[similarColor.value]).brighten((i+1)*.1).hex()})
  }
  distanceAdv.value=999999
  similarColorAdv.value.forEach((item,i)=>{
    let distanceCurrent=$chroma.distance(item.color, inputSearch.value)
    if(distanceAdv.value>distanceCurrent){
      distanceAdv.value=distanceCurrent;
      similarColorAdvIndex.value=i;
    }
    item.distance=$chroma.distance(item.color, inputSearch.value).toFixed(1);
  })



  //匹配techUIColors Expand颜色表
  distanceExp.value=9999999
  colors.forEach((color,i)=>{
    expLevel.forEach((level,j)=>{
      expLD.forEach((LD,i)=>{
        let distanceCurrent=$chroma.distance($c[color.short+level+LD], inputSearch.value)
        if(distanceExp.value>distanceCurrent){
          distanceExp.value=distanceCurrent;
          similarColorExp.value=color.short+level+LD;
        }
      })
    })
  })
  console.log("techUIColorsExpand",distanceExp.value,similarColorExp.value);
}

function isValidColor(input) {
  const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  const namedColors = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
    "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey",
    "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
    "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory",
    "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen",
    "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen",
    "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
    "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream",
    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid",
    "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum",
    "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
    "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen",
    "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow",
    "yellowgreen"
  ];

  const lowerCaseInput = input.toLowerCase();
  if (hexRegex.test(lowerCaseInput)) {
    return true;
  }
  if (namedColors.includes(lowerCaseInput)) {
    return true;
  }
  return false;
}

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  $tToast({content:"拷贝成功", type: 'success', })
};

const searchChange=()=>{
  similarColor.value=""
}
onMounted(() => {
  
})

</script>
<template>
  
<div class="color-match-wrap">
  <div class="search-wrap">
    <i class="tui-icon ti-palette"></i>
    <h1>TechUI Colors Match</h1>
    <TuiInput v-model="inputSearch" @keydown.enter="matchColor" class="color-search-input" @input="searchChange" size="large"  placeholder="Enter the color value to match">
      <template #prefix>
        <i class="tui-icon ti-search"></i>
      </template>
      <template #suffix>
        <TuiButton @click="matchColor" type="primary">Match</TuiButton>
      </template>
    </TuiInput>
  </div>
  <div class="match-result" v-if="similarColor">
    <h3>aYin Color v1 Match Result</h3>
    <tui-row>
      <tui-col :span="12">
        <div class="color-show color-origin">
          <span class="desc">Input</span>
        </div>
      </tui-col>
      <tui-col :span="12">
        <div class="color-show color-matchedExp">
          <span class="desc">Match</span>
          <div class="inner-button" @click="showDialog('exp')">Manual</div>
          <tui-row :gutter="20">
            <tui-col :span="12">
              <div class="group">
                <span class="label">Distance:</span>
                <span class="content">{{distanceExpFixed}}</span>
              </div>
            </tui-col>
            <tui-col :span="12">
              <div class="group">
                <span class="label">Name:</span>
                <span class="content copy-elem" @click="copyToClipboard(similarColorExp)">{{similarColorExp}}</span>
              </div>
            </tui-col>
          </tui-row>
        </div>
      </tui-col>
    </tui-row>
    
    <h3>aYin Color v2 Match Result</h3>
    <tui-row>
      <tui-col :span="12">
        <div class="color-show color-origin">
          <span class="desc">Input</span>
        </div>
      </tui-col>
      <tui-col :span="12">
        <div class="color-show color-matched">
          <span class="desc">Match</span>
          <div class="inner-button" @click="showDialog('bas')">Manual</div>
          <tui-row :gutter="20">
            <tui-col :span="12">
              <div class="group">
                <span class="label">Distance:</span>
                <span class="content">{{distanceFixed}}</span>
              </div>
            </tui-col>
            <tui-col :span="12">
              <div class="group">
                <span class="label">Name:</span>
                <span class="content copy-elem" @click="copyToClipboard(similarColor)">{{similarColor}}</span>
              </div>
            </tui-col>
          </tui-row>
        </div>
      </tui-col>
    </tui-row>
    <tui-row :gutter="0">
      <tui-col :span="24">
        <div class="color-show color-expand">
          <div class="colorExp" v-for="(item,index) in similarColorAdv" :style="'background-color:'+item.color+';'" :class="similarColorAdvIndex==index?'active':''">
            <div class="detail">
              <span class="destance">{{item.distance}}</span>
              <span class="name">{{item.name}}</span>
            </div>
            <div class="origin"></div>
          </div>
        </div>
      </tui-col>
    </tui-row>
  </div>
</div>
<DialogChange @pushParmas="reciveFromDialog" :dialogConfig="dialogConfig" :colors="colors"></DialogChange>
</template>
<style lang="less">
.color-match-wrap{width: 1000px; min-height:100%; margin:0 auto; padding:50px; .bdra(5px);  z-index: 1;
  .flex(20px); flex-direction: column; justify-content: start; align-items: stretch;
  .search-wrap{ text-align: center; 
    .ti-palette{font-size: 80px; .fc(@aqA10);}
    h1{font-size: 24px;font-weight: bold; .fc(var(--font-base)); margin:30px 0;}
    .tui-icon{line-height: 1;}
  }
  .match-result{text-align: center; .bgc(var(--tech-bg)); .bd(var(--tech-bd)); .bdra(8px);
    .tui-row{margin:0 0 20px 0;}
    .color-show{width:100%;  height: 100px;  display:inline-block; position: relative;
      .desc{.poa; .bgc(fade(@bk,70%)); .fc(@wh); padding:5px 20px; }
      .inner-button{.poa; right:5px; bottom:5px; .fc(@wh); z-index: 1; font-size: 12px; cursor: pointer;}
      .group{display:inline-block; font-size: 20px;  line-height: 100px;
        .label,
        .content{  .fc(@wh);.txs(50%,3px,1px,1px);
          &.copy-elem{cursor: pointer;}
        }
        .label{font-size: 14px;}
      }
      &.color-origin{.bgc(v-bind(inputSearch)); .bdra(10px 0 0 10px); .desc{ top:0; left:0; .bdra(10px 0 10px 0);} }
      &.color-matched,
      &.color-matchedExp{.bdra(0 10px 10px 0);  .desc{ top:0; right:0;.bdra(0 10px 0 10px);} }
      &.color-matched{.bgc(v-bind(similarColorHex));}
      &.color-matchedExp{.bgc(v-bind(similarColorExpHex));}
      &.color-expand{height:auto; display:flex;flex-direction: row;flex-wrap: wrap; gap:10px;
        .colorExp{display:inline-block; width:calc(20% - 8px); height: 50px; .bd(var(--common-bg),3px); .bdra(8px); position: relative;
          .detail{opacity: 0;.poa; inset:0; .bdra(6px); .bgc(fade(@bk,30%)); 
            span{display:block; line-height: 20px; height: 20px; font-size: 12px; .fc(@wh); .txs(50%,3px,1px,1px);
              &.distance{}
              &.name{ }
            }
          }
          .origin{.bgc(v-bind(inputSearch)); opacity: 0; position: absolute; inset:0; left:auto; width: 50%;}
          &:before{content:" "; position: absolute; left:5px; top:5px; width: 5px; height: 5px; .bdra(5px); .bgc(@bk); opacity: 0;}
          &:hover{.detail{opacity: 1;}}
          &.active{ &:before{opacity: 1;}}
        }
        .desc{ bottom:-31px; left:50%; .fixc("x"); .bdra(0 0 10px 10px);} 
      }
    }
    
    .adv-btn{display:block; margin:20px auto;}
  }
}
</style>
