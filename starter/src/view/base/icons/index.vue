<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, ref } from 'vue';

const {proxy:{$tToast,$tToastClose}}=getCurrentInstance();


import iconData from "./iconData.json";

const text=reactive({
  title:"🧊 TechUI Icon Viewer",
  desc:"声明：本图标库部分图标为自主设计，其余图标主要从以下免费图标库中整合，HugeIcons，SystemUIcons，IconOIR，MynauiIcons，Proicons",
  link:"ICONES.JS.ORG",
})

const searchTerm = ref('');
const showNamesAlways = ref(false);
const showBackToTop = ref(false);

const isGrouped = computed(() => {
  return Object.keys(iconData).length > 1;
});

const totalIcons = computed(() => {
  let total = 0;
  for (const icons of Object.values(iconData)) {
    total += icons.length;
  }
  return total;
});

const filteredGroups = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  const groups = [];

  for (const [groupName, icons] of Object.entries(iconData)) {
    const filtered = term === '' 
      ? icons 
      : icons.filter(icon => icon.toLowerCase().includes(term));
    
    if (filtered.length > 0) {
      groups.push({
        name: groupName,
        icons: filtered
      });
    }
  }

  return groups;
});

const filteredTotal = computed(() => {
  return filteredGroups.value.reduce((sum, group) => sum + group.icons.length, 0);
});

const showNavigation = computed(() => {
  return !searchTerm.value && isGrouped.value && Object.keys(iconData).length > 1;
});

const getIconClass = (iconName) => {
  const prefix = iconName.includes('tie-') ? 'tui-icone ' : 'tui-icon ';
  return prefix + iconName;
};

const copyToClipboard = async (iconName) => {
  const text = getIconClass(iconName);
  await navigator.clipboard.writeText(text);
  $tToast({content:"拷贝成功", type: 'success', })
};




const scrollToGroup = (groupName) => {
  const element = document.getElementById('group-' + encodeURIComponent(groupName));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  showBackToTop.value = scrollTop > viewportHeight;
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    searchTerm.value = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleKeydown);
});
</script>
<template>
  <div class="tui-icon-browser-wrap">
    <header class="tui-ib-header">
      <h1>{{ text.title }}</h1>
      <p>{{ text.desc }}</p>
      <p>免费图标资源来源：<i class="tui-icon ti-link"></i> <a :href="'https://'+text.link" target="_blank">{{ text.link }}</a></p>
    </header>

    <div class="icon-browser-controls">
      <TuiInput size="large" v-model="searchTerm" placeholder="Search icon names..." :clearable="true" icon="tui-icon ti-search">
        <template #suffix>
          图标名：<TuiToggle v-model="showNamesAlways" />
        </template>
      </TuiInput>
    </div>

    <div class="navigation" :class="{ show: showNavigation }">
      <div class="nav-title">类目快速导航</div>
      <div class="nav-links">
        <a 
          v-for="(emoji, groupName) in iconData" 
          :key="groupName"
          :href="'#group-' + encodeURIComponent(groupName)"
          class="nav-link"
          @click.prevent="scrollToGroup(groupName)"
        >
          <span>{{ groupName }}</span>
        </a>
      </div>
    </div>

    <div class="icon-count">
      Showing {{ filteredTotal }} / {{ totalIcons }} icons
    </div>

    <div class="icon-content" :class="{ 
      'show-names': showNamesAlways ,
      'auto-names': !showNamesAlways ,
    }">
      <div 
        v-for="group in filteredGroups" 
        :key="group.name"
        class="group-container"
        :id="'group-' + encodeURIComponent(group.name)"
      >
        <div v-if="isGrouped" class="group-title">
          {{ group.name }} [{{ group.icons.length }}]
        </div>
        <div class="icon-grid">
          <div 
            v-for="icon in group.icons"
            :key="icon"
            class="icon-item"
            @click="copyToClipboard(icon)"
          >
            <i :class="getIconClass(icon)"></i>
            <div class="icon-name">{{ icon }}</div>
          </div>
        </div>
      </div>
      <div v-if="filteredGroups.length === 0" class="tui-none-icon-tip"> 
        <i class="tui-icon ti-comment-alert"></i>
        未匹配到图标 
      </div>
    </div>
  </div>
</template>
<style lang="less">
.tui-icon-browser-wrap { border-top:none; border-bottom:none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding: 20px; max-width: 1400px; margin: 0 auto;
  
  .tui-ib-header { margin-bottom: 30px; 
    h1 { font-size: 2.5rem; margin-bottom: 30px; }
    p{display:flex; align-items: center;}
    a{font-weight: bold;}
    .tui-icon{font-size: 16px; margin:0 5px 0 0;}
  }
  .icon-browser-controls { display: flex; gap: 15px; margin-bottom: 20px; }
  .tui-input-suffix{white-space: nowrap;}
  .navigation { background-color: var(--common-bg); border: 1px solid var(--common-bd); border-radius: 10px; padding: 20px; margin-bottom: 20px; display: none; 
    &.show { display: block; }
    .nav-title { color: var(--primary-base); font-size: 1.1rem; font-weight: 600; margin-bottom: 15px; }
    .nav-links { display: flex; flex-wrap: wrap; gap: 10px; }
    .nav-link { background-color: var(--button-bg); border: 1px solid var(--button-bd); color: var(--primary-base); transition-duration: .5s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: all;
      display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 0.95rem; 
      &:hover { background-color: var(--button-bg_hov); border-color: var(--button-bg_hov);}
    }
  }

  .icon-count { text-align: center; font-size: 1rem; margin-bottom: 20px; opacity: 0.9; }
  .group-container { margin-bottom: 40px; scroll-margin-top: 100px; }
  .group-title { color: var(--primary-base); font-size: 1.5rem; font-weight: 600; margin-bottom: 15px; padding-left: 10px; border-left: 4px solid var(--primary-base); }
  .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px; padding: 10px; border-radius: 10px; 
    background-color: var(--common-bg); border: 1px solid var(--common-bd);
  }
  .icon-item { display: flex;  border-radius: 5px; cursor: pointer; position: relative; overflow: hidden; 
    background-color: var(--common-bg_layer); border: 1px solid var(--common-bd);
    i { font-size: 48px; line-height: 1; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
    // &:hover { transform: translateY(-5px); }
  }
  
  .show-names{
    .icon-item {transition-duration: .3s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: background-color; padding: 5px; flex-direction: column; justify-content: start; 
      .icon-name {transition-duration: .3s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: color; opacity: 1; transform: none; background: transparent; text-align: center; font-size: 12px; line-height: 1.3; word-wrap: break-word; }
      .tui-icon{transition-duration: .3s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: color;}
      &:hover{ background: var(--primary-base);
        .icon-name {color: #fff; background: transparent; }
        i { color: #fff; transform: scale(1.1); }
      } 
    }
  }
  .auto-names{
    .icon-item {padding: 10px; align-items: center; justify-content: center;
      .icon-name {display: inline-flex; align-items: center; justify-content: center; transition-duration: .3s; transition-timing-function: cubic-bezier(0.78, 0.02, 0.2, 1); transition-delay: 0s; transition-property: all; border-radius: 5px; background-color: var(--mask-stronger); border: 1px solid var(--common-bd); opacity: 0;
        position: absolute;top:0; bottom: 0; left: 0; right: 0;  padding: 8px; 
        font-size: 12px; line-height: 1; text-align: center;  word-break: break-all;
      }
      &:hover .icon-name{ opacity: 1; transform:scale(1.1) ;}
    }
  }
  .tui-none-icon-tip { text-align: center; color: var(--warning-strong); font-weight: bold; background-color: var(--common-bg); border: 1px solid var(--common-bd); padding: 30px; border-radius: 12px; font-size: 18px; 
    .tui-icon{display: block; font-size: 46px; line-height: 1.5;}
  }
}
</style>