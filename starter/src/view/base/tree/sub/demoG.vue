<script setup>
import { ref } from 'vue';

// 示例5的数据：组织架构
const treeData5 = ref([
  { id: 1, label: '公司总部', icon: '🏢', count: 120, children: [
      { id: 11, label: '技术部', icon: '💻', count: 45 },
      { id: 12, label: '市场部', icon: '📊', count: 30 },
      { id: 13, label: '人事部', icon: '👥', count: 15 }
    ]
  },
  { id: 2, label: '分公司', icon: '🏭', count: 80, children: [
      { id: 21, label: '销售部', icon: '💰', count: 50 },
      { id: 22, label: '运营部', icon: '📈', count: 30 }
    ]
  }
]);


// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});



</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-G">
    <div class="demo-title">组织架构</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData5" 
        :props="defaultProps"
        node-key="id"
        default-expand-all
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node org-node">
            <span class="org-icon">{{ data.icon }}</span>
            <span class="org-name">{{ data.label }}</span>
            <TuiTag type="primary" size="small">{{ data.count }}人</TuiTag>
          </div>
        </template>
      </TuiTree>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-G{
  .custom-tree-node { display: flex; align-items: center; justify-content: space-between; width: 100%; flex: 1; }
  .org-node { display: flex; align-items: center; gap: 8px; width: 100%; }
  .org-icon { font-size: 18px; }
  .org-name { flex: 1; font-weight: 500; }

}
</style>
