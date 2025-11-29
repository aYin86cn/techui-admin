<script setup>
import { ref } from 'vue';
const treeData2 = ref([
  { id: 1, label: '项目 A', status: 'running', children: [
      { id: 11, label: '任务 1', status: 'completed' },
      { id: 12, label: '任务 2', status: 'warning' },
      { id: 13, label: '任务 3', status: 'error' }
  ]},
  { id: 2, label: '项目 B', status: 'paused', children: [
      { id: 21, label: '任务 4', status: 'running' }
  ]}
]);
// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});
// 状态映射
const statusMap = {
  running: { color: '#67c23a', text: '进行中', icon: '⚡' },
  completed: { color: '#909399', text: '已完成', icon: '✔️' },
  warning: { color: '#e6a23c', text: '警告', icon: '⚠️' },
  error: { color: '#f56c6c', text: '错误', icon: '❌' },
  paused: { color: '#409eff', text: '暂停', icon: '⏸️' }
};

</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-D">
    <div class="demo-title">带标识状态的自定义节点</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData2" 
        :props="defaultProps"
        node-key="id"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            
            <span>{{ data.label }}</span>
            <span 
              v-if="data.status" 
              :class="['status-badge', data.status]"
            >

              {{ statusMap[data.status].icon }}
              {{ statusMap[data.status].text }}
            </span>
          </div>
        </template>
      </TuiTree>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-D{
  .custom-tree-node { display: flex; align-items: center; justify-content: space-between; width: 100%; flex: 1; }
  .status-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
  .status-badge.running { color: #67c23a; }
  .status-badge.completed { color: #909399; }
  .status-badge.warning { color: #e6a23c; }
  .status-badge.error { color: #f56c6c; }
  .status-badge.paused { color: #409eff; }
}
</style>
