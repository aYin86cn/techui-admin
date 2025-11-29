import { markRaw } from "vue";

const register = {
  //advanceCompt
  adaptiveDemo: () => import("@view/base/adaptive/index.vue"),
  panicAlertDemo: () => import("@view/base/panicAlert/index.vue"),
  t3DPanel: () => import("@view/base/t3DPanel/layout.vue"),
  echartsMix3D:()=>import("@view/base/echarts/mix3D/index.vue"),
  echartsPie:()=>import("@view/base/echarts/pie/index.vue"),
  bar3DDemo: () => import("@view/base/bar3D/index.vue"),
  pie3DDemo: () => import("@view/base/pie3D/index.vue"),
  
  //support
  backgroundDemo: () => import("@view/base/background/index.vue"),
  themeDemo: () => import("@view/base/theme/index.vue"),
  iconsDemo: () => import("@view/base/icons/index.vue"),
  audioDemo: () => import("@view/base/audio/index.vue"),
  i18nDemo: () => import("@view/base/i18n/index.vue"),
  tuiServiceDemo: () => import("@view/intro/tservice/index.vue"),

  //common
  buttonDemo: () => import("@view/base/button/index.vue"),
  inputDemo: () => import("@view/base/input/index.vue"),
  timePickerNativeDemo: () => import("@view/base/timePicker/native.vue"),
  selectDemo: () => import("@view/base/select/index.vue"),
  selectNativeDemo:()=>import("@view/base/select/native.vue"),
  toggleDemo: () => import("@view/base/toggle/index.vue"),
  checkboxDemo: () => import("@view/base/checkbox/index.vue"),
  radioDemo: () => import("@view/base/radio/index.vue"),
  tagDemo:()=>import("@view/base/tag/index.vue"),
  formDemo:()=>import("@view/base/form/index.vue"),
  
  //container
  typedDemo: () => import("@view/base/typed/index.vue"),
  dialogDemo: () => import("@view/base/dialog/index.vue"),
  dialogNativeDemo: () => import("@view/base/dialog/native.vue"),
  drawerDemo: () => import("@view/base/drawer/index.vue"),
  carouselDemo: () => import("@view/base/carousel/index.vue"),
  accordionDemo: () => import("@view/base/accordion/index.vue"),
  rowColDemo:()=>import("@view/base/layout/rowCol.vue"),
  gridDemo:()=>import("@view/base/layout/grid.vue"),
  
  //prompt
  attentionDemo: () => import("@view/base/attention/index.vue"),
  popTipDemo: () => import("@view/base/tips/popTip.vue"),
  curTipDemo: () => import("@view/base/tips/curTip.vue"),
  textTipDemo: () => import("@view/base/textTip/index.vue"),
  emptyDemo: () => import("@view/base/empty/index.vue"),
  loadingDemo: () => import("@view/base/loading/index.vue"),
  
  //dataVisual
  calendarDemo:()=>import("@view/base/calendar/index.vue"),
  digitalFlipDemo: () => import("@view/base/digitalFlip/index.vue"),
  digitalRollingDemo: () => import("@view/base/digitalRolling/index.vue"),
  timelineDemo: () => import("@view/base/timeline/index.vue"),
  progressDemo: () => import("@view/base/progress/index.vue"),
  progressPoolDemo: () => import("@view/base/progressPool/index.vue"),
  
  //navigation
  treeDemo: () => import("@view/base/tree/index.vue"),
  navDemo: () => import("@view/base/nav/index.vue"),
  menuDemo: () => import("@view/base/menu/index.vue"),
  stepsDemo: () => import("@view/base/steps/index.vue"),
  tabDemo: () => import("@view/base/tab/index.vue"),
  tabScrollDemo: () => import("@view/base/tab/scroll.vue"),

  //rollingGroup
  rollingBaseDemo: () => import("@view/base/rolling/index.vue"),
  rollingNavIconDemo: () => import("@view/base/rollingNavIcon/index.vue"),
  rollingNavTabsDemo: () => import("@view/base/rollingNavTabs/index.vue"),
  rollingNotificationDemo: () => import("@view/base/rollingNotification/index.vue"),
  rollingProgressDemo: () => import("@view/base/rollingProgress/index.vue"),
  rollingTableDemo: () => import("@view/base/rollingTable/index.vue"),
  stepScrollerDemo: () => import("@view/base/scroller/step.vue"),
  virtualScrollerDemo: () => import("@view/base/scroller/virtual.vue"),
  
  //other
  loginDemo: () => import("@view/admin/login/index-demo.vue"),
  textGradientDemo: () => import("@view/base/textGradient/index.vue"),
  crosshairDemo: () => import("@view/base/crosshair/index.vue"),
  tuiIconLogoDemo: () => import("@view/base/tuiLogo/index.vue"),
  
  dashboard: () => import("@view/admin/dashboard/index.vue"),

  colorV1: () => import("@view/colors/colorsV1.vue"),
  colorV2: () => import("@view/colors/colorsV2.vue"),
  colorMatch: () => import("@view/colors/colorMatch.vue"),
  tuiIntro: () => import("@view/intro/techui/index.vue"),
  advIntro: () => import("@view/intro/advance/index.vue"),
}

Object.keys(register).forEach(key => {
  register[key] = markRaw(register[key]);
});

export default register