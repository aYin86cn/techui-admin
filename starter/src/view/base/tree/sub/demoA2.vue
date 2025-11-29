<script setup>
import { ref } from 'vue';
const treeData = ref([
  { id: 1, label: '一级 1', icon:"tui-icon ti-message-thread", children: [
    { id: 4, label: '二级 1-1', children: [
      { id: 9, label: '三级 1-1-3' },
      { id: 10, label: '三级 1-1-2' }
    ]}
  ]},
  { id: 2, label: '一级 2',icon:"tui-icon ti-cog", children: [
    { id: 5, label: '二级 2-1' },
    { id: 6, label: '二级 2-2' }
  ]},
  { id: 3, label: '一级 3',icon:"tui-icon ti-target", children: [
    { id: 7, label: '二级 3-1' },
    { id: 8, label: '二级 3-2' }
  ]}
]);

// 节点点击事件处理
const handleNodeClick = (data) => {
  console.log('点击节点:', data);
};

const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-A">
    <div class="demo-title">菜单外观 自定义节点图标</div>
    <div class="demo-item">
      <TuiTree 
        ref="basicTree"
        :data="treeData" 
        :props="defaultProps"
        node-key="id"
        appearance="menu"
        :default-expanded-keys="[2, 3]"
        highlight-current
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>
<style lang="less">
</style>
