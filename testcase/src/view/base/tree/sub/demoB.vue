<script setup>
import { ref } from 'vue';
const checkTree = ref(null);
const checkedInfo = ref('');
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

const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

// 节点点击事件处理
const handleNodeClick = (data) => {
  console.log('点击节点:', data);
};

// 复选框选中事件处理 
const handleCheck = (data, checkedState) => {
  console.log('check event:', data, checkedState);
};

// 复选框变化事件处理
const handleCheckChange = (data, checked, indeterminate) => {
  console.log('check-change event:', data, checked, indeterminate);
};

// 获取选中节点
const getCheckedNodes = () => {
  const nodes = checkTree.value.getCheckedNodes();
  checkedInfo.value = `选中节点：${nodes.map(node => node.label).join(', ')}`;
  console.log('选中节点:', nodes);
};

// 获取选中Keys
const getCheckedKeys = () => {
  const keys = checkTree.value.getCheckedKeys();
  checkedInfo.value = `选中Keys：${keys.join(', ')}`;
  console.log('选中Keys:', keys);
};

// 设置选中节点
const setCheckedNodes = () => {
  // 设置选中二级 3-1 和 二级 3-2
  const nodes = [
    { id: 7, label: '二级 3-1' }, 
    { id: 8, label: '二级 3-2' }
  ];
  checkTree.value.setCheckedNodes(nodes);
  checkedInfo.value = '已设置选中：二级 3-1、二级 3-2';
};

// 设置选中Keys
const setCheckedKeys = () => {
  // 设置选中 1、4、5
  checkTree.value.setCheckedKeys([1, 4, 5]);
  checkedInfo.value = '已设置选中Keys：1、4、5';
};

// 重置选中状态
const resetChecked = () => {
  checkTree.value.setCheckedKeys([]);
  console.log("checkTree.value",checkTree.value);
  
  checkedInfo.value = '已重置选中状态';
};


</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-B">
    <div class="demo-title">多选</div>
    <div class="demo-item">
      <div class="tree-inner">
        <TuiTree 
          ref="checkTree"
          :data="treeData" 
          :props="defaultProps"
          node-key="id"
          show-checkbox
          :default-checked-keys="[4, 5]"
          @check="handleCheck"
          @check-change="handleCheckChange"
        />
      
      </div>
      <div v-if="checkedInfo" class="checked-info">
        {{ checkedInfo }}
      </div>
      <div class="operation-buttons">
        <TuiButton size="small" @click="getCheckedNodes">获取选中节点</TuiButton>
        <TuiButton size="small" @click="getCheckedKeys">获取选中Keys</TuiButton>
        <TuiButton size="small" @click="setCheckedNodes">设置选中节点</TuiButton>
        <TuiButton size="small" @click="setCheckedKeys">设置选中Keys</TuiButton>
        <TuiButton size="small" @click="resetChecked">重置</TuiButton>
      </div>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-B{
  .demo-item{
    .flex(10px); flex-direction: column;
    .tree-inner{flex:1;}
    .operation-buttons{display: flex; flex-wrap: wrap; gap:5px;
      .tui-button{margin:0;}
    }
  }
}

</style>
