import { markRaw } from "vue";

const register = {
  //advanceCompt
  adaptiveDemo: () => import("@/view/base/adaptive/index.vue"),
  //support
  backgroundDemo: () => import("@/view/base/background/index.vue"),
  iconsDemo: () => import("@/view/base/icons/index.vue"),
  audioDemo: () => import("@/view/base/audio/index.vue"),
  i18nDemo: () => import("@/view/base/i18n/index.vue"),
  tuiServiceDemo: () => import("@/view/intro/tservice/index.vue"),
  tuiIntro: () => import("@/view/intro/techui/index.vue"),
}

Object.keys(register).forEach(key => {
  register[key] = markRaw(register[key]);
});

export default register