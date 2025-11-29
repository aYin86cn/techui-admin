<script setup>
import { ref } from 'vue';

// 初始数据 - 只包含根节点（1级）
const treeData = ref([
  { id: 1, label: '根节点 1', leaf: false },// 注意这里不需要设置 children，但需要标记不是叶子节点
  { id: 2, label: '根节点 2', leaf: false },
  { id: 3, label: '根节点 3（叶子）', leaf: true } // 这是一个叶子节点，不会触发懒加载
]);

// 配置属性
const props = {
  label: 'label',
  children: 'children',
  isLeaf: 'leaf'
};

// 懒加载函数 - 只负责加载子节点
const loadNode = (node, resolve) => {
  // 由于根节点已经通过 data 属性提供，这里只处理子节点加载
  console.log('加载节点：', node.data.label, 'level:', node.level);
  
  // 模拟异步加载
  setTimeout(() => {
    // 根据节点层级生成不同的子节点
    let children = [];
    
    if (node.level === 1) {
      // 第二级节点
      children = [
        {
          id: `${node.data.id}-1`,
          label: `${node.data.label} - 子节点 1`,
          leaf: false  // 还可以继续展开
        },
        {
          id: `${node.data.id}-2`,
          label: `${node.data.label} - 子节点 2`,
          leaf: false
        },
        {
          id: `${node.data.id}-3`,
          label: `${node.data.label} - 子节点 3（叶子）`,
          leaf: true  // 叶子节点
        }
      ];
    } else if (node.level === 2) {
      // 第三级节点
      children = [
        {
          id: `${node.data.id}-1`,
          label: `${node.data.label} - 子节点 1（叶子）`,
          leaf: true  // 第三级都是叶子节点
        },
        {
          id: `${node.data.id}-2`,
          label: `${node.data.label} - 子节点 2（叶子）`,
          leaf: true
        }
      ];
    }
    
    // 返回子节点数据
    resolve(children);
  }, 1000); // 模拟网络延迟
};
</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-A">
    <div class="demo-title">懒加载 默认存在1级</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData" 
        :props="props"
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
    margin-bottom: 20px;
    color: #303133;
  }
}
</style>