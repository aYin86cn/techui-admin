<template>
  <div class="global-service-overview">
    <!-- 头部 -->
    <header class="header">
      <h1 class="title">TechUI 全局服务概述</h1>
    </header>

    <!-- 主要内容 -->
    <main class="content">
      <!-- 什么是 -->
      <section class="section">
        <h2 class="section-title">什么是 TechUI 全局服务？</h2>
        <p class="paragraph">
          TechUI 全局服务 (<code class="code-inline">$global</code>) 是一个基于 Vue 3 Provide/Inject 机制的应用级状态管理和服务集成方案。它作为应用的"中央神经系统"，统一管理全局状态、配置、UI 组件和工具方法，让组件间的通信和状态共享变得简单高效。
        </p>
        <p class="paragraph">这里仅仅是粗略的介绍特性，详细的使用方式，请等待正在开发中的文档详解。</p>
      </section>

      <!-- 核心理念 -->
      <section class="section">
        <h2 class="section-title">核心理念</h2>
        <div class="concept-grid">
          <TuiTyped type="primary" class="concept-card">
            <h3 class="concept-title">一次注入，全局可用</h3>
            <p class="concept-desc">
              通过在根组件提供服务，所有子组件都可以按需注入使用，无需层层传递 props 或繁琐的状态管理配置。
            </p>
          </TuiTyped>
          <TuiTyped type="success" class="concept-card">
            <h3 class="concept-title">响应式驱动</h3>
            <p class="concept-desc">
              所有状态都是响应式的，状态变化会自动触发相关组件的更新，确保 UI 与数据保持同步。
            </p>
          </TuiTyped>
          <TuiTyped type="warning" class="concept-card">
            <h3 class="concept-title">模块化组织</h3>
            <p class="concept-desc">
              服务被组织成清晰的功能模块，包括配置管理、UI 控制、通知系统、主题管理、国际化等，按需使用互不干扰。
            </p>
          </TuiTyped>
        </div>
      </section>

      <!-- 主要功能模块 -->
      <section class="section">
        <h2 class="section-title">主要功能模块</h2>
        <div class="modules-list">
          <div v-for="module in modules" :key="module.id" class="module-item">
            <div class="module-header">
              <span class="module-icon">{{ module.icon }}</span>
              <h3 class="module-title">{{ module.title }}</h3>
            </div>
            <p class="module-desc">{{ module.desc }}</p>
            <ul class="module-features">
              <li v-for="(feature, index) in module.features" :key="index" class="feature-item">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </section>


      <!-- 设计优势 -->
      <section class="section">
        <h2 class="section-title">设计优势</h2>
        <div class="advantages-grid">
          <div v-for="(advantage, index) in advantages" :key="index" class="advantage-card">
            <div class="advantage-number">{{ index + 1 }}</div>
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-desc">{{ advantage.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 快速开始 -->
      <section class="section">
        <h2 class="section-title">快速开始</h2>
        <div class="quickstart-grid">
          <div class="quickstart-step">
            <h3 class="step-title">提供服务</h3>
            <TuiTyped type="invert">
              <pre class="code-block"><code>{{ provideCode }}</code></pre>
            </TuiTyped>
          </div>
          <div class="quickstart-step">
            <h3 class="step-title">使用服务</h3>
            <TuiTyped type="invert">
              <pre class="code-block"><code>{{ injectCode }}</code></pre>
            </TuiTyped>
          </div>
        </div>
      </section>

      
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// 功能模块数据
const modules = ref([
  {
    id: 1,
    icon: '⚙️',
    title: '全局状态管理',
    desc: '管理应用级的配置和运行时状态，如：',
    features: [
      '配置管理: 主题、平台、功能开关、布局模式等',
      '运行状态: 全屏、最大化、侧边栏折叠等动态状态',
      '设备信息: 设备类型、浏览器、分辨率、触摸支持等',
      '数据容器: 跨组件共享的数据存储'
    ]
  },
  {
    id: 2,
    icon: '🎨',
    title: '主题与视觉系统',
    desc: '提供完整的主题管理能力：',
    features: [
      '主题切换: 支持预设主题的动态切换',
      '颜色管理: 统一的主题色板访问接口',
      '背景系统: 可配置的背景图案和效果',
      '过渡动画: 统一的页面和路由过渡控制',
      '3D 效果: 可选的三维视觉增强'
    ]
  },
  {
    id: 3,
    icon: '🔔',
    title: '注意力系统',
    desc: '统一管理各类用户提醒组件：',
    features: [
      'Message: 轻量级消息提示',
      'Notification: 系统通知',
      'Toast: 吐司提示',
      'Flash: 闪烁提醒',
      'Dispatcher: 智能调度器，按序管理多个提醒的显示顺序',
      'Loading: 全局/局部加载状态',
      'Mask: 遮罩层控制'
    ]
  },
  {
    id: 4,
    icon: '🌐',
    title: '国际化支持',
    desc: '内置的多语言解决方案：',
    features: [
      '动态语言切换 (中文/繁体/英文)',
      '响应式翻译文本',
      '语言包按需加载'
    ]
  },
  {
    id: 5,
    icon: '📱',
    title: '自适应布局系统',
    desc: '智能的响应式布局管理：',
    features: [
      '多种自适应模式 (固定/弹性/拉伸/扩展)',
      '窗口变化监听',
      'Portlet 组件管理',
      '自适应重置和重新初始化'
    ]
  },
  {
    id: 6,
    icon: '🧭',
    title: '路由与导航',
    desc: '路由相关的工具方法：',
    features: [
      'Query 参数管理',
      '路由过渡动画控制',
      '页面重载 (软/硬重载)'
    ]
  },
  {
    id: 7,
    icon: '👔',
    title: 'Admin 管理系统',
    desc: '企业级后台管理功能：',
    features: [
      '标签页管理: 多标签页导航',
      '缓存控制: 页面缓存和生命周期管理',
      '用户系统: 用户信息、权限、菜单管理',
      '路由守卫: 组件注册和路由初始化'
    ]
  },
  {
    id: 8,
    icon: '🛠️',
    title: '工具与辅助功能',
    desc: '',
    features: [
      '事件总线: 跨组件事件通信',
      '音频管理: 全局音效控制',
      '加密存储: 安全的本地存储方案',
      '调试工具: 开发模式的调试支持'
    ]
  }
]);



// 设计优势
const advantages = ref([
  {
    title: '统一的 API 设计',
    desc: '所有功能遵循一致的命名规范和使用模式，学习成本低，易于维护。'
  },
  {
    title: '按需注入',
    desc: '组件只需要注入实际使用的功能，保持代码简洁，避免不必要的依赖。'
  },
  {
    title: '解耦架构',
    desc: '各功能模块独立设计，可以根据项目需求选择性启用（如 Admin 功能）。'
  },
  {
    title: '响应式友好',
    desc: '所有状态都基于 Vue 3 的响应式系统，与组件生命周期完美集成。'
  }
]);

// 快速开始代码
const provideCode = `<!-- App.vue 
在使用之前，需要在app.vue，使用TuiProvider包裹路由，或者顶层组件。
才可以在组件中使用全局的$global注入。
-->
<template>
  <TuiProvider>
    <router-view></router-view>
  </TuiProvider>
</template>

`;

const injectCode = `<!-- 任意子组件 -->
<script setup>
import { inject } from 'vue';

const { $tMessage, $gTheme } = inject('$global');

$tMessage('Hello TechUI!');
console.log('当前主题:', $gTheme.value);
<\/script>`;

</script>

<style lang="less">
.global-service-overview {
  max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;
  
  .header {
    text-align: center; margin-bottom: 60px; padding-bottom: 30px;
    .title { font-size: 42px; font-weight: 700; .fc(var(--font-stronger)); margin: 0; }
  }
  
  .content { .section { margin-bottom: 60px; } }
  
  .section-title {
    font-size: 28px; font-weight: 600; margin-bottom: 24px; padding-bottom: 12px; .bdb(var(--common-bd));
  }
  
  .paragraph {
    font-size: 16px; line-height: 1.8; margin-bottom: 16px;
    .code-inline {padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; .fc(var(--danger-base)); font-size: 14px; }
  }
  
  .concept-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 24px;
    .concept-card { padding: 24px; transition: transform 0.3s;
      &:hover { transform: translateY(-5px); }
    }
    .concept-title { font-size: 20px; font-weight: 600; margin: 0 0 12px 0; }
    .concept-desc { font-size: 14px; margin: 0; line-height: 1.6; opacity: 0.95; }
  }
  
  .modules-list {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;
    .module-item { .bgc(var(--common-bg)); .bd(var(--common-bd)); border-radius: 8px; padding: 20px; transition: box-shadow 0.3s, transform 0.3s;
      &:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.1); transform: translateY(-3px); }
    }
    .module-header { display: flex; align-items: center; margin-bottom: 12px; }
    .module-icon { font-size: 32px; margin-right: 12px; }
    .module-title { font-size: 20px; font-weight: 600; .fc(var(--font-stronger)); margin: 0; }
    .module-desc { font-size: 14px; margin-bottom: 12px; }
    .module-features { list-style: none; padding: 0; margin: 0; }
    .feature-item { font-size: 13px; padding: 6px 0; padding-left: 20px; position: relative;
      &:before { content: '▸'; position: absolute; left: 0; .fc(var(--primary-base)); font-weight: bold; }
    }
  }
  
  .code-block {
    height:250px; overflow: hidden; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; margin: 0;
    code { white-space: pre; }
  }
  
  .advantages-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;
    .advantage-card { .bgc(var(--common-bg)); .bd(var(--common-bd)); .fc(var(--font-stronger)); .bdl(var(--primary-weaker),5px); padding: 20px; border-radius: 6px; position: relative; padding-left: 70px; min-height: 100px; }
    .advantage-number { position: absolute; left: 20px; top: 20px; width: 36px; height: 36px; background: #3498db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; }
    .advantage-title { font-size: 18px; font-weight: 600;.fc(var(--font-stronger)); margin: 0 0 8px 0; }
    .advantage-desc { font-size: 14px; margin: 0; line-height: 1.6; }
  }
  
  .quickstart-grid {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap:20px;
    .quickstart-step {  border-radius: 8px; padding: 0; }
    .step-title { font-size: 20px; font-weight: 600; .fc(var(--font-stronger)); margin: 0 0 16px 0; }
  }


}

</style>