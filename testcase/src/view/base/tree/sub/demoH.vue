<script setup>
import { ref } from 'vue';
// 基础树数据
const treeData = ref([
  { id: 1, label: '一级 1', children: [
    { id: 4, label: '二级 1-1', children: [
      { id: 9, label: '三级 1-1-1' },
      { id: 10, label: '三级 1-1-2' }
    ]}
  ]},
  { id: 2, label: '一级 2', children: [
    { id: 5, label: '二级 2-1' },
    { id: 6, label: '二级 2-2' }
  ]},
  { id: 3, label: '一级 3', children: [
    { id: 7, label: '二级 3-1' },
    { id: 8, label: '二级 3-2' }
  ]}
]);
// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

// 筛选方法
const filterNode = (value, data, node) => {
  if (!value) return true;
  
  // 通过node对象获取label，而不是直接从data中获取
  const label = node.label || '';
  return label.toLowerCase().includes(value.toLowerCase());
};

</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-H">
    <div class="demo-title">可筛选</div>
    <div class="demo-item">
      <TuiTree 
        ref="filterTree"
        :data="treeData" 
        :props="defaultProps"
        node-key="id"
        :filter-node-method="filterNode"
      />
      
    </div>
  </div>
</template>
<style lang="less">
</style>
