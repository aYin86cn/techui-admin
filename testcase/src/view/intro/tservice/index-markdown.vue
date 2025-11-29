<script setup>
import { nextTick, onMounted, ref } from 'vue';
import ReadmeMD from './readme.md';
const articleRef = ref(null);
const tocContainerRef = ref(null);

// 搬运函数
const moveToc = () => {
  if (!articleRef.value || !tocContainerRef.value) return;

  // 1. 在正文中查找 markdown-it 生成的 toc 元素
  // 注意：'.table-of-contents' 必须和你配置中的 containerClass 一致
  const tocElement = articleRef.value.querySelector('.table-of-contents');

  if (tocElement) {
    // 2. 将其移动到侧边栏容器中 (appendChild 会自动将元素从原位置移除)
    tocContainerRef.value.appendChild(tocElement);
  }
};

onMounted(() => {
  // 确保 DOM 渲染完毕后执行
  nextTick(() => {
    moveToc();
  });
});

</script>
<template>
  <div class="md-page-layout">
    <div class="sidebar-toc" ref="tocContainerRef"> </div>
    <div class="main-content" ref="articleRef">
      <ReadmeMD/>
    </div>
  </div>
</template>
<style lang="less">
.md-page-layout {display: flex; .poa; inset:0; overflow: hidden;
  .sidebar-toc,
  .main-content{height: 100%; overflow-x: hidden; overflow-y: auto;}
  .main-content{flex:1; .bgc(var(--common-bg)); padding:40px; .bdl(var(--common-bd));}
  .markdown-body{
    .table-of-contents { display: none; }
    h1{margin:40px 0; line-height: 1.2;}
    ul { list-style: none; padding-left: 0; 
      li{list-style: disc; list-style-position: inside;}
    }
  }
}

.table-of-contents {
  // position:fixed; max-height:100%; inset:0 auto 0 0;
  .bgc(var(--common-bg));
  padding:20px;
  width: 350px;
  > ul { list-style: none; padding-left: 0; 
    >li{font-weight: bold; list-style: decimal; list-style-position: inside;}
  }
  li { margin: 0.5rem 0; font-weight: normal;
    ul{padding-left:20px;}
  }
  a {.fc(var(--font-base));text-decoration: none;
    &:hover { .fc(var(--primary-base)); }
  }
}


</style>