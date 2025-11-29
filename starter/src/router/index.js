
import { createRouter, createWebHashHistory } from 'vue-router';


import layout from "@view/admin/layout/layout.vue";

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes :[
    { path: "/login", name: "login", component:()=>import("@view/admin/login/index.vue"), meta: { requireAuth: false, hideInTab: true,order:0 } }, 
    { path: "/", name: "layout", component: layout, redirect:"/tuiIntro",
      meta: { requireAuth: true,order:1 },
      children: [
        { path: ":pathMatch(.*)*", name: "404",
          component:()=>import("@/components/error/404.vue"),
        },
      ]
    },
    { path: "/componentNav", name: "componentNav", component:()=>import("@view/navigation/index-nav.vue"), meta: { hideInTab: true,order:2 }},
    
  ]
});

// router.afterEach(() => {
//   //NProgress.done()
// })

export default router;

