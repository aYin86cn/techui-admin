<script setup>
import { ref } from "vue";
const items = ref([
  {
    title: 'Dashboard',
    description: 'Overview of your account statistics and activity',
    icon: 'icon-dashboard',
    status: 'primary',
    content: 'This is the dashboard content with charts and statistics.'
  },
  {
    title: 'Profile',
    description: 'Manage your personal information and settings',
    icon: 'icon-user',
    status: 'success',
    content: 'Here you can edit your profile details, change avatar, and more.'
  },
  {
    title: 'Messages',
    description: 'View your messages and notifications',
    icon: 'icon-message',
    status: 'warning',
    content: 'All your messages and conversations appear here.'
  },
  {
    title: 'Settings',
    description: 'Configure application preferences',
    icon: 'icon-settings',
    status: 'default',
    content: 'Change your app settings, notifications, and privacy options.'
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics and reports',
    icon: 'icon-chart',
    statusColor: '#9c27b0',
    content: 'Detailed charts and analytics about your activity and performance.'
  },
  {
    title: 'Logout',
    description: 'Sign out from your account',
    icon: 'icon-logout',
    status: 'danger',
    content: 'Click here to safely log out from your account.'
  }
]);

</script>
<template>
  <div class="accd-demo-wrap">

    <div class="demo-inner">
      <div :class="`demo-box `" >
        
        <TuiAccordion vertical :autoplay="3000" :height="400" :minWidth="60">
          <TuiAccordionItem 
            title="项目一" 
            icon="el-icon-picture" 
            type="primary"
          >
            <h3>自定义内容1</h3>
            <p>这里是完全自定义的内容区域</p>
          </TuiAccordionItem>
          
          <TuiAccordionItem 
            title="项目二" 
            description="这是第二个项目的描述信息" 
            type="success"
          />
          
          <TuiAccordionItem 
            title="项目三" 
            description="这是第三个项目的描述信息" 
            type="warning"
          />
          
          <TuiAccordionItem 
            title="项目四" 
            description="这是第四个项目的描述信息" 
            type="danger"
          />
        </TuiAccordion>

      </div>


    </div>

    
  </div>
</template>
<style lang="less">
.accd-demo-wrap{ min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ display:flex; gap:20px; width:calc(50% - 20px); .por; .bd(var(--common-bd)); .bdra(5px); min-height:300px; padding:50px 20px 20px 20px;
      
      .demo-title{.poa; left:10px; top:10px;}
      &.demo-horizontal{ 
        .demo-item{width: 100%; height:100%; .centerFlex; }
      }
      &.demo-vertical{ height:500px; width:calc(25% - 30px);
        .demo-item{width: 100%; height:100%;  }
        
      }
    }
  }
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  
  h2 {
    margin-bottom: 10px;
  }
  
  .custom-content {
    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #333;
    }
    
    p {
      margin: 0;
      line-height: 1.5;
    }
  }
}

</style>
