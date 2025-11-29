<script setup>
import { tStr } from "@techui/utils";
import { ref } from 'vue';
// 示例1的数据
const treeData1 = ref([
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
// 方法
const append = (data) => {
  const newChild = {
    id: Date.now(),
    label: `新节点 ${tStr.rdm(4)}`
  };
  
  if (!data.children) {
    data.children = [];
  }
  data.children.push(newChild);
};

const remove = (node, data) => {
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.findIndex(d => d.id === data.id);
  children.splice(index, 1);
};

</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-C">
    <div class="demo-title">自定义节点 添加删除</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData1" 
        :props="defaultProps"
        node-key="id"
        show-checkbox
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span class="node-label">{{ data.label }}</span>
            <div class="node-actions">
              <TuiButton type="primary" link size="small" @click.stop="append(data)" >
                添加
              </TuiButton>
              <TuiButton type="danger" link size="small" @click.stop="remove(node, data)" >
                删除
              </TuiButton>
            </div>
          </div>
        </template>
      </TuiTree>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-C{
  .custom-tree-node { display: flex; align-items: center; justify-content: space-between; width: 100%; flex: 1;
    .node-label{ flex: 1; width: 1px; .truncate}
  }
  .tui-button-link{ font-weight: normal;}
}

</style>
