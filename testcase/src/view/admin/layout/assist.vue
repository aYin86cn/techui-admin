<script setup>
import avatarDefault from "@assets/avatar/header.jpg";
import { computed, inject, ref } from 'vue';
import { useRouter } from "vue-router";

const {$tState,logout,$AUserInfo,controlPanelToggle}= inject('$global');

const router = useRouter();

const avatar=computed(()=>{
  return $AUserInfo.userDetail?.avatar||avatarDefault
})

let notifyAni=ref(true)
const notifyMenu=[
  { label: "提醒",counter:0, value: "notify",tagContent:5,tagType:"primary"}, 
  { label: "消息",counter:5, value: "message",tagContent:8,tagType:"success"}, 
  { label: "待办",counter:3, value: "work",tagContent:1,tagType:"warning"},
  { label: "级别",counter:3, value: "urgent",tagContent:"紧急",tagType:"danger"},
]

const notifyAct=(val)=>{
  console.log("userMenuAct",val);
}

const clsMsg=()=>{
  notifyAni.value=false;
  notifyMenu.forEach((item,index)=>{
    item.count=0;
  })
}

const userMenu=[
  { label: "个人资料", value: "personal" }, 
  { label: "注销", value: "logout", divider: true},
  { label: "安全", value: "secure", disabled: "disabled" }, 
  { label: "清空用户(测试)", value: "clear", description:"Test" },
]
const userMenuAct=(params)=>{
  switch (params.item.value){
    case "personal": 
      router.push("/personal");
      break;
    case "logout": 
      logout()
      break;
    case "clear": 
      $tState.ADMIN.userInfo.token=null;
      break;
    default:
      console.log("params",params);
  }
}
const sysMenu=[
  { label: "TechUIColor", value: "ayincolor" }, 
  { label: "设置", value: "setting" , divider:true }, 
  { label: "注销", value: "logout", divider:true,description:"Logout" },
  
]

const sysMenuAct=(params)=>{
  console.log("sysMenuAct",params);
  switch (params.item.value){
    case "ayincolor": 
      router.push("/colorV1");
      break;
    case "logout": 
      logout()
      break;
    case "setting": 
      controlPanelToggle()
      break;
    default:
      console.log("params",params);
  }
}

</script>
<template>
<div class="sider-assist-wrap">
  <div class="item" v-tui-menu="{ 
    menus:userMenu,
    trigger:'click',
    placement:'bottom-start',
    menuClick: userMenuAct,
  }">
    <img class="avatar" :src="avatar" alt="">
  </div>
  <div class="item" v-tui-menu="{ 
    menus:notifyMenu,
    trigger:'click',
    placement:'bottom-start',
    menuClick: notifyAct,
  }">
    <span class="bell" :class="notifyAni?'animated swing infinite':'aniDis'">
      <i class="tui-icon ti-bell"></i>
    </span>
  </div>
  <div class="item">
    <i class="tui-icon ti-search"></i>
  </div>
  <div class="item" v-tui-menu="{ 
    menus:sysMenu,
    trigger:'click',
    placement:'bottom-start',
    menuClick: sysMenuAct,
  }">
    <i class="tui-icon ti-menu"></i>
  </div>
</div>
</template>
<style lang="less">
.sider-assist-wrap{ .bgc(var(--shadow-weaker,fade(@bk,10%))); z-index: 5; .flex(5px);
  .item{position: relative; flex:1; text-align: center; .ani(.5s,background-color);line-height: 40px; font-size: 16px;  cursor: pointer;
    .tui-icon{.fc(var(--sider-fc)); font-size: 18px; }
    &:hover{.bgc(var(--sider-bg_act));}
    .el-dropdown{line-height: 40px; height: 40px; font-size: 16px; display:inline-block; width: 100%;}
    .avatar{width: 36px; height: 36px; .bdra(18px); .centerAbsolute;}
    .bell{ }
  }
}
.tui-expand{
  .sider-assist-wrap{ height: 50px; padding:5px 10px;//请勿修改基础属性,如height
    .item{ .bdra;
      &:nth-child(1){ flex:1.5;
        
      }
    }
  }
}
.tui-collapse{
  .sider-assist-wrap{ flex-direction: column; padding:0; height: 200px;//请勿修改基础属性，如height
    .item{ .bdra(0);
      &:nth-child(1){ height: 60px; line-height: 60px;  flex:none;
        .el-dropdown{height: 60px;}
      }
    }
  }
}
</style>
