import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import TechUIInit from "@techui/admin";
// locale("en");
// import { license, subLicense } from "./utils/license.js";

// import locales from "@techui/locales/index.js"

const app = createApp(App);
const params={
  app,
  debug:true,
  // license, 
  // subLicense,
  features:{
    echarts:true,
    advanced:true,
  }
}
TechUIInit(params).then(()=>{
  // app.use(locales)
  app.use(router)
  app.use(store)
  app.mount('#app')
})
