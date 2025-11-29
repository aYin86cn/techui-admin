<script setup>
import { ref } from 'vue';
const treeProps = {
  label: 'label',
  children: 'children',
  isLeaf: 'leaf'
};

// 加载计数器，用于调试
const loadCount = ref(0);

// 懒加载函数
const loadNode = (node, resolve) => {
  loadCount.value++;
  console.log(`第 ${loadCount.value} 次加载，节点级别: ${node.level}`);
  
  // 模拟异步加载
  setTimeout(() => {
    let children = [];
    
    if (node.level === 0) {
      // 加载根节点
      console.log('正在加载根节点...');
      children = [
        {
          id: 'root-1',
          label: '部门管理',
          leaf: false
        },
        {
          id: 'root-2', 
          label: '用户管理',
          leaf: false
        },
        {
          id: 'root-3',
          label: '权限管理',
          leaf: false
        },
        {
          id: 'root-4',
          label: '系统配置',
          leaf: true
        }
      ];
    } else if (node.level === 1) {
      // 加载第二级
      console.log(`正在加载二级节点: ${node.data.label}`);
      
      switch (node.data.id) {
        case 'root-1':
          children = [
            { id: `${node.data.id}-1`, label: '技术部', leaf: false },
            { id: `${node.data.id}-2`, label: '产品部', leaf: false },
            { id: `${node.data.id}-3`, label: '运营部', leaf: true }
          ];
          break;
        case 'root-2':
          children = [
            { id: `${node.data.id}-1`, label: '管理员', leaf: false },
            { id: `${node.data.id}-2`, label: '普通用户', leaf: true }
          ];
          break;
        case 'root-3':
          children = [
            { id: `${node.data.id}-1`, label: '菜单权限', leaf: true },
            { id: `${node.data.id}-2`, label: '按钮权限', leaf: true },
            { id: `${node.data.id}-3`, label: '数据权限', leaf: true }
          ];
          break;
      }
    } else {
      // 加载第三级
      console.log(`正在加载三级节点: ${node.data.label}`);
      children = [
        { id: `${node.data.id}-1`, label: `${node.data.label} - 成员1`, leaf: true },
        { id: `${node.data.id}-2`, label: `${node.data.label} - 成员2`, leaf: true }
      ];
    }
    
    console.log(`加载完成，返回 ${children.length} 个子节点`,children);
    resolve(children);
  }, 800);
};
</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-A">
    <div class="demo-title">懒加载 默认无1级</div>
    <div class="demo-item">
      <TuiTree 
        :props="treeProps"
        node-key="id"
        lazy
        :load="loadNode"
      />
      
    </div>
  </div>
</template>
<style lang="less">
.lazy-example {
  padding: 20px;
  
  h3 {
    margin-bottom: 10px;
    color: #303133;
  }
  
  .description {
    margin-bottom: 20px;
    color: #606266;
    font-size: 14px;
  }
}
</style>