import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import TechUIInit from "@techui/admin";

//浅蓝 主题
import "@techui/themes/lightBlue";
//深蓝 主题
import "@techui/themes/darkBlue";
//黑色 主题
import "@techui/themes/darkBlack";

const app = createApp(App);
const params={
  app,
  debug:true,
  features:{
    // echarts:true,
    // advanced:true,
  }
}
TechUIInit(params).then(()=>{
  app.use(router)
  app.use(store)
  app.mount('#app')
})
