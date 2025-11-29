<script setup>
import { ref } from 'vue';
// 示例3的数据
const treeData3 = ref([
  { id: 1, label: '购物清单', children: [
      { id: 11, label: '苹果' },
      { id: 12, label: '面包' }
  ]},
  { id: 2, label: '待办事项', children: [
      { id: 21, label: '完成报告' }
  ]}
]);

// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

// 编辑状态
const editingNode = ref(null);
const editingLabel = ref('');


const startEdit = (data) => {
  editingNode.value = data.id;
  editingLabel.value = data.label;
};

const saveEdit = (data) => {
  data.label = editingLabel.value;
  cancelEdit();
};

const cancelEdit = () => {
  editingNode.value = null;
  editingLabel.value = '';
};
</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-E">
    <div class="demo-title">E可编辑的节点</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData3" 
        :props="defaultProps"
        node-key="id"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <template v-if="editingNode !== data.id">
              <span class="tree-label">{{ data.label }}</span>
              <TuiButton size="small" link class="mini-btn primary" @click.stop="startEdit(data)" > 编辑 </TuiButton>
            </template>
            <template v-else>
              <TuiInput size="small" v-model="editingLabel" class="edit-input" @click.stop @keyup.enter="saveEdit(data)" />
              <TuiButton size="small" link class="mini-btn success" @click.stop="saveEdit(data)" > 保存 </TuiButton>
              <TuiButton size="small" link class="mini-btn" @click.stop="cancelEdit" > 取消 </TuiButton>
            </template>
          </div>
        </template>
      </TuiTree>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-E{
  .custom-tree-node{.flex(5px); width: 100%;
    .tui-input{width: 120px; min-width:50px; flex:1;
      .tui-input-inner{font-size: 14px;}
    }
    .tui-button-link{margin:0;}
    .tree-label{flex:1;}
  }
}
</style>
