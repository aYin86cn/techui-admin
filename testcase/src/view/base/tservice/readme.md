[[toc]]

# TechUI 全局服务使用文档

# 概述&注意事项

- 本文档介绍如何在 TechUI 项目中使用全局服务 `$global`。该服务通过 Vue 的 `provide/inject` 机制提供，包含了应用的全局状态、配置和方法。
- **本文档在提供了一些必要信息的情况下，由AI生成，暂时并未做任何校对。**
- 本文档中的状态管理以及函数方法，为prime组件库中的内容，其余组件库Base、Admin、Scifi有些许差异。会在后续的文档做差异化更改。

# 基础使用

## 前置组件引入

在使用TechUI组件之前，需要在app.vue中，使用TuiProvider包裹路由，或者顶层组件。才可以使用全局的$global注入。

```vue
<template>
  <TuiProvider>
    <router-view></router-view>
  </TuiProvider>
</template>
```

## 在组件中注入服务

```vue
<script setup>
import { inject } from 'vue';

const $global = inject('$global');
</script>
```

## 解构使用

```vue
<script setup>
import { inject } from 'vue';

const {
  $tState,
  $gTheme,
  $tMessage,
  themeToggle
} = inject('$global');
</script>
```

---

# 核心服务对象

## $tBus - 事件总线
- 全局事件总线，用于组件间的事件通信。**已不推荐使用！！！**
- 建议使用provide和inject来进行小范围组件通信。
- 建议使用全局状态管理进行大范围组件通信。

```javascript
// 发送事件
$tBus.emit('eventName', data);

// 监听事件
$tBus.on('eventName', callback);

// 移除监听
$tBus.off('eventName', callback);
```

## proxy
Vue 组件实例代理对象。

## $tService
完整的服务对象，包含所有状态管理方法。

---

# 全局状态 (State)

## $tState
完整的响应式状态树，包含以下子状态：

### $data - 数据容器

- 存储全局共享数据。**已不推荐使用，后续可能移除！！！**
- 设计初衷是用于快捷存储一些需要共享的公共状态，如地图点位，当前焦点图表等。
- 建议使用provide和inject来进行小范围组件通信。

```javascript
// 地图数据
$data.value.mapData // { code: "", name: "" }

// 图表数据
$data.value.chartData // { title: "", params: {} }
```

**计算属性快捷访问：**
- `$mapData` - 地图数据
- `$chartData` - 图表数据

---

### $globalConfig - 全局配置

应用的全局配置项，包含主题、平台、功能开关等。

```javascript
{
  platform: "prime",           // 平台标识
  theme: "lightBlue",         // 当前主题
  themeScheme: "light",       // 主题方案: light | dark
  t3D: true,                  // 是否启用3D效果
  maskBlur: true,             // 遮罩模糊效果
  background: "all",          // 背景应用范围: all | view | root | none
  menuTrigger: "click",       // 菜单触发方式: click | hover
  floaterTo: "#tuiAdpt",      // 浮层挂载节点
  resizeBy: "self",           // 响应式基准: self | root
  sound: true,                // 声音开关
  transition: true,           // 过渡动画开关
  adaptive: "extension",      // 自适应模式: fixed | flexible | stretch | extension | disabled
  version: "x.x.x"            // 版本号
}
```

**计算属性快捷访问：**
- `$gPlatform` - 平台标识
- `$gTheme` - 当前主题
- `$gThemeScheme` - 主题方案
- `$gT3D` - 3D效果开关
- `$gMaskBlur` - 遮罩模糊开关
- `$gMenuTrigger` - 菜单触发方式
- `$gFloaterTo` - 浮层挂载节点
- `$gResizeBy` - 响应式基准
- `$gTransition` - 过渡动画开关
- `$gSound` - 声音开关
- `$gBackground` - 背景应用范围
- `$gAdaptive` - 自适应模式
- `$gVersion` - 版本号

---

### $globalState - 全局运行状态

应用运行时的动态状态。

```javascript
{
  fullScreen: false,      // 全屏状态
  maximize: false,        // 最大化状态
  siderCollapse: false,   // 侧边栏折叠状态
  clickTarget: null,      // 点击目标
  clickCounter: 0,        // 点击计数器
  escCounter: 0,          // ESC键计数器
  resizeCounter: 0        // 窗口调整计数器
}
```

**计算属性快捷访问：**
- `$gMaximize` - 最大化状态
- `$gFullScreen` - 全屏状态
- `$gSiderCollapse` - 侧边栏折叠状态
- `$gClickTarget` - 点击目标
- `$gClickCounter` - 点击计数器
- `$gEscCounter` - ESC键计数器
- `$gResizeCounter` - 窗口调整计数器

---

### $globalParams - 全局参数

全局效果参数配置。

```javascript
{
  blurSaturate: "180%",   // 模糊饱和度
  blurRange: 5,           // 模糊范围
  initDur: 1              // 初始化动画时长
}
```

---

### $viewTrans - 视图过渡配置

控制页面切换的过渡动画。

```javascript
{
  curDur: 1,                    // 当前动画时长
  altDur: 1,                    // 备用动画时长
  curTarget: "root",            // 当前目标: adpt | root | layout
  altTarget: "root",            // 备用目标
  curName: "vt-overlap",        // 当前动画名称
  altNames: {                   // 备用动画名称集
    theme: "vt-circle-rt",
    common: "vt-overlap",
    routerPre: "vt-slide-right",
    routerNxt: "vt-slide-left",
    layout: "vt-fade"
  }
}
```

---

### $deviceInfo - 设备信息

检测到的设备相关信息。

```javascript
{
  type: null,             // 设备类型
  browser: null,          // 浏览器类型
  resolutionH: null,      // 水平分辨率
  resolutionV: null,      // 垂直分辨率
  touchable: false,       // 是否支持触摸
  orientation: null,      // 屏幕方向
  screenInvert: false     // 屏幕是否反转
}
```

---

### $controlPanel - 控制面板配置

```javascript
{
  visible: false,         // 是否可见
  modal: true,           // 是否模态
  width: 220,            // 宽度
  extension: [],         // 扩展项
  exclusion: []          // 排除项
}
```

---

### $attentionConfig - 注意力系统配置

管理各类提醒组件的配置。

#### Message 消息

```javascript
{
  position: "top-center",  // 位置: top-center | top-left | top-right | bottom-center | bottom-left | bottom-right
  offset: 0,              // 偏移量
  duration: 3000,         // 显示时长(ms)
  counter: 0              // 消息计数器
}
```

**快捷访问：** `$aMessage`

#### Notification 通知

```javascript
{
  position: "top-right",  // 位置
  offset: 0,             // 偏移量
  counter: 0             // 通知计数器
}
```

**快捷访问：** `$aNotification`

#### Toast 吐司

```javascript
{
  offsetX: 0,            // X轴偏移
  offsetY: 0,            // Y轴偏移
  duration: 3000,        // 显示时长(ms)
  visible: false         // 是否可见
}
```

**快捷访问：** `$aToast`

#### Flash 闪烁提醒

```javascript
{
  spreadRadius: 15,      // 扩散半径
  blurRadius: 30,        // 模糊半径
  frequency: 1,          // 频率
  appearance: "toast",   // 外观类型
  visible: false,        // 是否可见
  queueLength: 0,        // 队列长度
  queueOffset: 0,        // 队列偏移
  queuePosition: "top"   // 队列位置
}
```

**快捷访问：** `$aFlash`

#### Dispatcher 调度器

用于对所有提醒组件进行排序和按序弹出的功能配置。

```javascript
{
  visible: true,             // 是否可见
  debug: false,             // 调试模式
  offset: 40,               // 偏移量
  position: "bottom-right", // 位置
  currentChannel: null,     // 当前频道
  queue: []                 // 队列
}
```

**快捷访问：** `$aDispatcher`

---

### $popoverConfig - 弹出框配置

```javascript
{
  duration: 3000,        // 显示时长(ms)
  maxLength: 5,          // 最大显示数量
  appearance: "poptip"   // 外观类型
}
```

---

### $t3dConfig - 3D配置

```javascript
{
  inited: false          // 是否已初始化
}
```

---

### $adaptiveConfig - 自适应配置

```javascript
{
  ready: false,          // 是否就绪
  inited: false,         // 是否已初始化
  portletCounter: 0,     // Portlet计数器
  resizeCounter: 0,      // 调整大小计数器
  dragTip: true          // 拖拽提示
}
```

**计算属性快捷访问：**
- `$adptReady` - 是否就绪
- `$adptInited` - 是否已初始化
- `$aPortletCounter` - Portlet计数器
- `$aResizeCounter` - 调整大小计数器

---

### $backgroundConfig - 背景配置

```javascript
{
  graphicType: "SvgPattern",  // 图形类型
  SvgPattern: {}             // SVG图案配置
}
```

---

### $spinnerConfig - 加载动画配置

```javascript
{
  full: {                // 全屏加载
    name: "blocksA",     // 动画名称
    size: 100           // 尺寸
  },
  area: {                // 区域加载
    name: "pointA",      // 动画名称
    size: 40            // 尺寸
  }
}
```

**可用动画名称：**
- bars: barsA, barsB, barsC
- blocks: blocksA, blocksB, blocksC
- point: pointA, pointB, pointC
- pulseDot: pulseDotA, pulseDotB, pulseDotC
- pulseRing: pulseRingA, pulseRingB, pulseRingC
- ring: ringA, ringB, ringC
- clock

---

### $themePalette - 主题调色板

当前激活主题的颜色配置对象。

---

### $locale - 本地化语言数据

当前语言的所有翻译文本。

---

## 优化的计算属性

### $optResizeCounter
智能选择 resize 计数器，如果自适应已初始化则返回 `$aResizeCounter`，否则返回 `$gResizeCounter`。

### $optFloaterTo
智能选择浮层挂载节点，如果自适应已初始化则返回 `$gFloaterTo`，否则返回 `'#tuiRoot'`。

---

# 核心方法

## 主题与颜色

### $tc(str, cpt)
获取主题调色板中的颜色值。

**参数：**
- `str` (String): 颜色路径，如 `'primary.main'`
- `cpt` (Boolean): 是否返回计算属性，默认 `false`

**返回：** 颜色值 或 计算属性

```javascript
// 获取颜色值
const primaryColor = $tc('primary.main');

// 获取响应式颜色值
const primaryColorRef = $tc('primary.main', true);
```

### themeToggle(themeName)
切换到指定的预设主题。

**参数：**
- `themeName` (String): 主题名称（必须已注册）

```javascript
// 切换主题
themeToggle('darkBlue');
```

---

## 背景管理

### initBG(config)
初始化背景。

**参数：**
- `config` (Object): 背景配置对象（可选）

```javascript
// 使用默认配置初始化
initBG();

// 使用自定义配置
initBG({
  graphicType: 'SvgPattern',
  SvgPattern: { /* 配置 */ }
});
```

### resetBG()
重置背景，移除背景样式。

```javascript
resetBG();
```

---

## 加载动画

### initSpinner(config)
初始化加载动画配置。

**参数：**
- `config` (Object): 加载动画配置（可选）

```javascript
initSpinner({
  full: { name: "ringA", size: 80 },
  area: { name: "pointB", size: 35 }
});
```

---

## 自适应系统

### resetAdaptiveConfig()
重置自适应配置，清除相关状态和样式。

```javascript
resetAdaptiveConfig();
```

### initResizeBy()
获取自适应基准 DOM 的计算属性函数。

**返回：** 计算属性函数

```javascript
const resizeByFn = initResizeBy();
const resizeBy = resizeByFn.value('global'); // 返回 globalConfig.resizeBy
```

---

## 国际化

### initI18n()
异步初始化国际化系统。

```javascript
await initI18n();
```

### i18n(str)
获取本地化语言字符串。

**参数：**
- `str` (String): 语言路径，如 `'common.confirm'`

**返回：** 翻译后的文本

```javascript
const confirmText = i18n('common.confirm');
```

### getSysLang()
获取当前系统语言。

**返回：** 语言代码 (`'cn'` | `'hk'` | `'en'`)

```javascript
const lang = getSysLang();
```

### tConsolei18n(type, name, msg, thro)
输出国际化的控制台消息。

**参数：**
- `type` (String): 消息类型
- `name` (String): 消息名称
- `msg` (String): 消息键
- `thro` (Boolean): 是否节流，默认 `true`

```javascript
tConsolei18n('error', 'Network', 'errors.network');
```

---

## 界面控制

### controlPanelToggle()
切换控制面板的显示状态。

```javascript
controlPanelToggle();
```

### maximizeToggle()
切换最大化状态。

```javascript
maximizeToggle();
```

### toggleSider()
切换侧边栏折叠状态。

```javascript
toggleSider();
```

---

## 路由相关

### updateRouteQuery(query)
为当前路由添加 query 参数。

**参数：**
- `query` (Object): 要添加的 query 参数对象

```javascript
updateRouteQuery({ id: 123, tab: 'info' });
```

### getRouteQuery(key)
获取当前路由的 query 参数。

**参数：**
- `key` (String): 参数键名（可选，不传则返回全部）

**返回：** 参数值 或 完整 query 对象

```javascript
// 获取单个参数
const id = getRouteQuery('id');

// 获取全部参数
const query = getRouteQuery();
```

### routerTransition(config)
控制路由过渡动画。

**参数：**
- `config` (Object): 过渡配置

```javascript
routerTransition({
  name: 'vt-slide-left',
  duration: 0.5
});
```

---

## 页面重载

### softReload()
软重载：通过 v-if 重置TuiProvider组件，状态管理中的信息保持不变。

```javascript
softReload();
```

### hardReload()
硬重载：通过 location.reload() 刷新整个页面，状态管理中的信息会丢失。

```javascript
hardReload();
```

---

# 注意力组件 API

## Message 消息

### $tMessage(options)
显示消息提示。

**参数：**
- `options` (Object | String): 消息配置或消息文本

```javascript
// 简单用法
$tMessage('操作成功');

// 完整配置
$tMessage({
  type: 'success',      // success | error | warning | info
  content: '操作成功',
  duration: 3000,
  closable: true
});
```

### $tMessageCloseAll()
关闭所有消息。

```javascript
$tMessageCloseAll();
```

---

## Notification 通知

### $tNotify(options)
显示通知。

**参数：**
- `options` (Object): 通知配置

```javascript
$tNotify({
  type: 'info',
  title: '系统通知',
  content: '您有新的消息',
  duration: 4500
});
```

### $tNotifyCloseAll()
关闭所有通知。

```javascript
$tNotifyCloseAll();
```

---

## Toast 吐司

### $tToast(options)
显示 Toast 提示。

**参数：**
- `options` (Object | String): Toast 配置或文本

```javascript
// 简单用法
$tToast('已保存');

// 完整配置
$tToast({
  content: '已保存',
  duration: 2000,
  position: 'center'  // top | center | bottom
});
```

### $tToastClose()
关闭当前 Toast。

```javascript
$tToastClose();
```

---

## Flash 闪烁提醒

### $tFlash(options)
显示闪烁提醒。

**参数：**
- `options` (Object): Flash 配置

```javascript
$tFlash({
  content: '新消息',
  appearance: 'toast',
  frequency: 2
});
```

### $tFlashClose()
关闭 Flash 提醒。

```javascript
$tFlashClose();
```

---

## Attention Dispatcher 调度器

### $tAttentionDispatcher(config)
配置注意力组件调度器，用于对所有提醒组件进行排序和按序弹出。

**参数：**
- `config` (Object): 调度器配置

```javascript
$tAttentionDispatcher({
  queue: [
    { type: 'message', content: '第一条' },
    { type: 'notify', content: '第二条' }
  ],
  position: 'bottom-right'
});
```

### $tAttentionDispatcherClose()
关闭调度器。

```javascript
$tAttentionDispatcherClose();
```

---

## Popover 弹出框

### $tPopover(target, options)
显示 Popover。

**参数：**
- `target` (Element | String): 目标元素或选择器
- `options` (Object): Popover 配置

```javascript
$tPopover('#btn', {
  content: '提示内容',
  placement: 'top',    // top | bottom | left | right
  trigger: 'hover'     // hover | click
});
```

### $tPopoverCloseAll()
关闭所有 Popover。

```javascript
$tPopoverCloseAll();
```

---

## Mask 遮罩

### $tMask(options)
显示遮罩层。

**参数：**
- `options` (Object): 遮罩配置

```javascript
$tMask({
  blur: true,
  closable: true,
  zIndex: 1000
});
```

### $tMaskClose()
关闭遮罩层。

```javascript
$tMaskClose();
```

---

## Loading 加载

### $tLoading(options)
显示加载动画。

**参数：**
- `options` (Object | String): 加载配置或提示文本

```javascript
// 简单用法
$tLoading('加载中...');

// 完整配置
$tLoading({
  text: '加载中...',
  type: 'full',        // full | area
  spinner: 'ringA'
});
```

### $tLoadingClose()
关闭加载动画。

```javascript
$tLoadingClose();
```

---

# Admin 功能（需启用）

当 `isActAdminFeatures` 为 `true` 时，以下功能可用：

## $ADMIN - Admin 状态

Admin 模块的完整状态对象。

```javascript
{
  routerInited: false,         // 路由是否已初始化
  maximize: false,             // 最大化状态
  siderCollapse: false,        // 侧边栏折叠状态
  componentRegister: {},       // 组件注册表
  tabs: [],                    // 标签页列表
  keepAlive: ['home'],         // 需要缓存的组件
  userInfoSto: "session",      // 用户信息存储方式: session | local
  userInfo: {                  // 用户信息
    token: null,
    id: null,
    alias: null,
    role: { name: null }
  },
  dict: {},                    // 字典数据（保留项，暂未使用）
  menu: [],                    // 菜单数据
  permission: []               // 权限数据
}
```

**计算属性快捷访问：**
- `$ARouterInited` - 路由是否已初始化
- `$ARouterRegister` - 组件注册表
- `$ATabs` - 标签页列表
- `$AKeepAlive` - 缓存组件列表
- `$AUserInfo` - 用户信息
- `$AUserInfoSto` - 用户信息存储方式
- `$ADict` - 字典数据
- `$AMenu` - 菜单数据
- `$APermission` - 权限数据

---

## 标签页管理

### tabAdd(item)
添加标签页。

**参数：**
- `item` (Object): 路由项对象

```javascript
tabAdd({
  meta: {
    label: '用户管理',
    title: '用户管理',
    icon: 'user',
    keepAlive: true,
    hideInTab: false
  },
  path: '/user',
  query: { id: 1 }
});
```

### tabRemove(index)
移除指定索引的标签页。

**参数：**
- `index` (Number): 标签页索引

```javascript
tabRemove(2);
```

---

## 缓存管理

### keepAliveAdd(item)
添加组件到缓存列表。

**参数：**
- `item` (Object): 包含 `label` 的对象

```javascript
keepAliveAdd({ label: 'UserList' });
```

### keepAliveRemove(item)
从缓存列表移除组件。

**参数：**
- `item` (Object): 包含 `label` 的对象

```javascript
keepAliveRemove({ label: 'UserList' });
```

---

## logout()
退出登录，清除用户信息、菜单数据等。

```javascript
logout();
```

---

# 功能特性标识

## isActAdvFeatures
是否启用了高级组件功能。

```javascript
if (isActAdvFeatures) {
  // 使用高级组件
}
```

## isActEchartsFeatures
是否启用了 ECharts 功能。

```javascript
if (isActEchartsFeatures) {
  // 使用 ECharts 相关功能
}
```

## isActAdminFeatures
是否启用了 Admin 功能。

```javascript
if (isActAdminFeatures) {
  // 使用 Admin 相关功能
}
```

---

# 工具函数

## audio
音频播放管理器。

```javascript
audio.play('notification');
audio.stop();
```

## openEnc(data)
数据加密函数。

**参数：**
- `data` (Any): 要加密的数据

**返回：** 加密后的字符串

```javascript
const encrypted = openEnc({ user: 'admin' });
```

## openDec(encryptedData)
数据解密函数。

**参数：**
- `encryptedData` (String): 加密的数据

**返回：** 解密后的数据

```javascript
const decrypted = openDec(encrypted);
```

## tStoreCrypto
加密存储工具，提供安全的本地存储功能。

```javascript
// 加密存储
tStoreCrypto.set('key', data);

// 解密读取
const data = tStoreCrypto.get('key');
```

## initDebug()
初始化调试模式，在开发环境下启用调试功能。

```javascript
initDebug();
```

---

# 使用示例

## 示例 1: 切换主题并显示消息

```vue
<script setup>
import { inject } from 'vue';

const { themeToggle, $tMessage } = inject('$global');

const changeTheme = (theme) => {
  themeToggle(theme);
  $tMessage({
    type: 'success',
    content: `已切换到${theme}主题`
  });
};
</script>

<template>
  <button @click="changeTheme('darkBlue')">切换深色主题</button>
</template>
```

## 示例 2: 使用响应式主题颜色

```vue
<script setup>
import { inject, computed } from 'vue';

const { $tc, $gTheme } = inject('$global');

const primaryColor = $tc('primary.main', true);
const buttonStyle = computed(() => ({
  backgroundColor: primaryColor.value,
  color: '#fff'
}));
</script>

<template>
  <button :style="buttonStyle">动态主题按钮</button>
</template>
```

## 示例 3: 国际化文本

```vue
<script setup>
import { inject } from 'vue';

const { i18n } = inject('$global');
</script>

<template>
  <div>
    <h1>{{ i18n('common.welcome') }}</h1>
    <button>{{ i18n('common.confirm') }}</button>
  </div>
</template>
```

## 示例 4: 加载状态管理

```vue
<script setup>
import { inject } from 'vue';

const { $tLoading, $tLoadingClose, $tMessage } = inject('$global');

const loadData = async () => {
  $tLoading('加载数据中...');
  
  try {
    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 2000));
    $tMessage('加载成功');
  } catch (error) {
    $tMessage({ type: 'error', content: '加载失败' });
  } finally {
    $tLoadingClose();
  }
};
</script>

<template>
  <button @click="loadData">加载数据</button>
</template>
```

## 示例 5: Admin 标签页管理

```vue
<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { tabAdd, $ATabs } = inject('$global');

const openPage = (route) => {
  tabAdd({
    meta: {
      label: route.meta.label,
      icon: route.meta.icon,
      keepAlive: true
    },
    path: route.path,
    query: route.query
  });
  
  router.push(route);
};
</script>

<template>
  <div>
    <div v-for="tab in $ATabs" :key="tab.path">
      {{ tab.label }}
    </div>
  </div>
</template>
```

---

# 注意事项

1. **响应式使用**：状态值在模板中会自动解包 `.value`，在 `<script>` 中需要手动访问
2. **计算属性**：使用 `$tc` 等方法获取计算属性时，记得传入 `true` 参数
3. **注意力组件排序**：使用 `$tAttentionDispatcher` 可以统一管理多个提醒组件的显示顺序
4. **主题切换**：切换主题前确保主题已经在系统中注册
5. **Admin 功能**：只有在 `isActAdminFeatures` 为 `true` 时才能使用相关功能
6. **加密存储**：敏感数据建议使用 `tStoreCrypto` 进行加密存储
7. **重载选择**：需要保持状态时使用 `softReload()`，需要完全刷新时使用 `hardReload()`
8. **路由 Query**：使用 `updateRouteQuery` 不会触发页面刷新，适合动态更新 URL 参数
9. **浮层挂载**：建议使用 `$optFloaterTo` 而非直接使用 `$gFloaterTo`，前者会根据自适应状态智能选择
10. **国际化初始化**：在应用启动时应先调用 `initI18n()` 确保语言数据加载完成

---

# 最佳实践

## 1. 性能优化

```vue
<script setup>
import { inject, computed } from 'vue';

const { $gTheme, $tc } = inject('$global');

// ✅ 好的做法：使用计算属性
const primaryColor = $tc('primary.main', true);

// ❌ 避免：在模板中重复调用
// <div :style="{ color: $tc('primary.main') }"></div>
</script>
```

## 2. 条件渲染

```vue
<script setup>
import { inject } from 'vue';

const { 
  isActAdminFeatures,
  isActEchartsFeatures,
  $ADMIN 
} = inject('$global');
</script>

<template>
  <!-- 根据功能启用状态条件渲染 -->
  <AdminPanel v-if="isActAdminFeatures" />
  <ChartComponent v-if="isActEchartsFeatures" />
</template>
```

## 3. 错误处理

```vue
<script setup>
import { inject } from 'vue';

const { $tLoading, $tLoadingClose, $tMessage } = inject('$global');

const handleAction = async () => {
  const loadingId = $tLoading('处理中...');
  
  try {
    await performAction();
    $tMessage({ type: 'success', content: '操作成功' });
  } catch (error) {
    $tMessage({ 
      type: 'error', 
      content: error.message || '操作失败'
    });
  } finally {
    $tLoadingClose(loadingId);
  }
};
</script>
```

## 4. 主题适配

```vue
<script setup>
import { inject, computed } from 'vue';

const { $gThemeScheme, $tc } = inject('$global');

// 根据主题方案动态调整样式
const containerStyle = computed(() => ({
  backgroundColor: $gThemeScheme.value === 'dark' 
    ? $tc('background.dark') 
    : $tc('background.light'),
  color: $gThemeScheme.value === 'dark'
    ? '#fff'
    : '#333'
}));
</script>
```

## 5. 响应式监听

```vue
<script setup>
import { inject, watch } from 'vue';

const { $gResizeCounter, $gTheme } = inject('$global');

// 监听窗口大小变化
watch($gResizeCounter, (newVal) => {
  console.log('窗口已调整大小', newVal);
  // 执行响应式布局调整
});

// 监听主题变化
watch($gTheme, (newTheme) => {
  console.log('主题已切换至', newTheme);
  // 执行主题相关处理
});
</script>
```

## 6. 组件通信

```vue
<script setup>
import { inject, onMounted, onUnmounted } from 'vue';

const { $tBus } = inject('$global');

onMounted(() => {
  // 监听全局事件
  $tBus.on('dataUpdate', handleDataUpdate);
});

onUnmounted(() => {
  // 清理监听器
  $tBus.off('dataUpdate', handleDataUpdate);
});

const handleDataUpdate = (data) => {
  console.log('收到数据更新', data);
};

const notifyOthers = () => {
  // 发送全局事件
  $tBus.emit('dataUpdate', { id: 1, name: 'test' });
};
</script>
```

## 7. 安全存储

```vue
<script setup>
import { inject } from 'vue';

const { tStoreCrypto, openEnc, openDec } = inject('$global');

// 存储敏感数据
const saveUserCredentials = (credentials) => {
  // 方式1: 使用 tStoreCrypto
  tStoreCrypto.set('userCred', credentials);
  
  // 方式2: 使用 openEnc/openDec
  const encrypted = openEnc(credentials);
  localStorage.setItem('userCred', encrypted);
};

// 读取敏感数据
const loadUserCredentials = () => {
  // 方式1
  return tStoreCrypto.get('userCred');
  
  // 方式2
  const encrypted = localStorage.getItem('userCred');
  return openDec(encrypted);
};
</script>
```

---

# 常见问题

## Q1: 如何在非组件文件中使用 $global？

```javascript
// utils/helper.js
let globalService = null;

export const setGlobalService = (service) => {
  globalService = service;
};

export const useGlobal = () => {
  if (!globalService) {
    throw new Error('Global service not initialized');
  }
  return globalService;
};

// main.js 或 App.vue
import { setGlobalService } from './utils/helper';

const $global = inject('$global');
setGlobalService($global);
```

## Q2: 计算属性什么时候需要传 `true`？

当你需要在 `computed` 或 `watch` 中响应式地使用主题颜色时，应该传入 `true`：

```javascript
// ✅ 响应式
const color = $tc('primary.main', true);
watch(color, (newColor) => {
  // 主题切换时会触发
});

// ❌ 非响应式
const color = $tc('primary.main');
// 主题切换时不会更新
```

## Q3: 如何清空所有提醒组件？

```javascript
const { 
  $tMessageCloseAll,
  $tNotifyCloseAll,
  $tToastClose,
  $tFlashClose
} = inject('$global');

const clearAllAttentions = () => {
  $tMessageCloseAll();
  $tNotifyCloseAll();
  $tToastClose();
  $tFlashClose();
};
```

## Q4: 自适应模式有什么区别？

- `fixed`: 固定布局，不响应窗口变化
- `flexible`: 弹性布局，按比例缩放
- `stretch`: 拉伸布局，填充可用空间
- `extension`: 扩展布局，智能适配多种场景
- `disabled`: 禁用自适应

## Q5: 如何判断设备类型？

```vue
<script setup>
import { inject, computed } from 'vue';

const { $deviceInfo } = inject('$global');

const isMobile = computed(() => 
  $deviceInfo.value.type === 'mobile' || 
  $deviceInfo.value.touchable
);

const isTablet = computed(() => 
  $deviceInfo.value.type === 'tablet'
);
</script>

<template>
  <div v-if="isMobile">移动端界面</div>
  <div v-else-if="isTablet">平板界面</div>
  <div v-else>桌面端界面</div>
</template>
```

## Q6: Admin 的 keepAlive 如何工作？

```vue
<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { tabAdd, keepAliveAdd, $AKeepAlive } = inject('$global');

// 打开新标签页并启用缓存
const openCachedPage = (routeConfig) => {
  // 添加标签页
  tabAdd({
    meta: {
      label: 'UserList',
      keepAlive: true
    },
    path: '/user/list'
  });
  
  // 添加到缓存列表
  keepAliveAdd({ label: 'UserList' });
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="$AKeepAlive">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

---

# 类型定义（TypeScript 参考）

如果你的项目使用 TypeScript，可以参考以下类型定义：

```typescript
interface GlobalService {
  // 状态
  $tState: TechUIState;
  $data: DataState;
  $globalConfig: GlobalConfig;
  $globalState: GlobalState;
  // ... 其他状态
  
  // 方法
  $tc: (str: string, cpt?: boolean) => string | ComputedRef<string>;
  themeToggle: (themeName: string) => void;
  initBG: (config?: BackgroundConfig) => void;
  resetBG: () => void;
  initSpinner: (config?: SpinnerConfig) => void;
  initI18n: () => Promise<void>;
  i18n: (str: string) => string;
  getSysLang: () => 'cn' | 'hk' | 'en';
  
  // 注意力组件
  $tMessage: (options: MessageOptions | string) => void;
  $tMessageCloseAll: () => void;
  $tNotify: (options: NotifyOptions) => void;
  $tNotifyCloseAll: () => void;
  $tToast: (options: ToastOptions | string) => void;
  $tToastClose: () => void;
  $tFlash: (options: FlashOptions) => void;
  $tFlashClose: () => void;
  
  // 路由
  updateRouteQuery: (query: Record<string, any>) => void;
  getRouteQuery: (key?: string) => any;
  routerTransition: (config: TransitionConfig) => void;
  
  // 重载
  softReload: () => void;
  hardReload: () => void;
  
  // 工具
  openEnc: (data: any) => string;
  openDec: (encrypted: string) => any;
  tStoreCrypto: StorageCrypto;
  audio: AudioManager;
  
  // 特性标识
  isActAdvFeatures: boolean;
  isActEchartsFeatures: boolean;
  isActAdminFeatures: boolean;
  
  // Admin（条件性）
  $ADMIN?: AdminState;
  tabAdd?: (item: TabItem) => void;
  tabRemove?: (index: number) => void;
  keepAliveAdd?: (item: { label: string }) => void;
  keepAliveRemove?: (item: { label: string }) => void;
  logout?: () => void;
}
```

---

# 版本历史

- **v1.0.0**: 初始版本，包含基础状态管理和核心方法
- **v1.1.0**: 新增 Admin 功能模块
- **v1.2.0**: 新增注意力系统调度器
- **v1.3.0**: 优化国际化支持，新增多语言切换
- **v1.4.0**: 新增自适应系统，支持多种布局模式

---

# 支持与反馈

如有问题或建议，请联系开发团队或在项目仓库提交 Issue。

---

**文档版本**: v1.0  
**最后更新**: 2024-11