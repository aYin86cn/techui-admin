<script setup>
import { ref } from 'vue';

// 示例4的数据：文件系统
const treeData4 = ref([
  { id: 1, label: '项目文件夹', type: 'folder', children: [
    { id: 11, label: '源代码', type: 'folder', children: [
      { id: 111, label: 'index.js', type: 'file', size: '2.4KB' },
      { id: 112, label: 'app.vue', type: 'file', size: '5.1KB' }
    ]},
    { id: 12, label: '文档', type: 'folder', children: [
      { id: 121, label: 'README.md', type: 'file', size: '3.2KB' }
    ]},
    { id: 13, label: 'package.json', type: 'file', size: '1.8KB' }
  ]}
]);

// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

const downloadFile = (data) => {
  console.log('下载文件:', data.label);
  alert(`下载文件: ${data.label}`);
};

const viewDetails = (data) => {
  console.log('查看详情:', data);
  alert(`查看详情:\n${JSON.stringify(data, null, 2)}`);
};

</script>
<template>
  <div class="demo-box demo-box-col4 demo-box-tree-F">
    <div class="demo-title">文件管理系统</div>
    <div class="demo-item">
      <TuiTree 
        :data="treeData4" 
        :props="defaultProps"
        node-key="id"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node file-node">
            <span :class="['file-icon', data.type]">
              <i :class="[
                `tui-icon`,
                {
                  'ti-file':(data.type=='file'),
                  'tis-folder':(data.type =='folder'&&!node.expanded),
                  'tis-folder-open':(data.type =='folder'&&node.expanded),
                }
              ]"></i>
            </span>
            <span class="file-name">{{ data.label }}</span>
            <span v-if="data.size" class="file-size">{{ data.size }}</span>
            <div class="node-actions">
              <TuiButton type="primary" size="small" link v-if="data.type === 'file'" class="mini-btn primary" @click.stop="downloadFile(data)" > 下载 </TuiButton>
              <TuiButton size="small" link class="mini-btn info" @click.stop="viewDetails(data)" > 详情 </TuiButton>
            </div>
          </div>
        </template>
      </TuiTree>
      
    </div>
  </div>
</template>
<style lang="less">
.demo-box-tree-F{

  .custom-tree-node { display: flex; align-items: center; justify-content: center; width: 100%; flex: 1;
  
  }
  .file-node { 
    display: flex; 
    align-items: center; 
    gap: 3px; 
    width: 100%; 
    
    .file-name { flex: 1; width: 1px; .truncate; }
    
    .file-icon {
      .centerFlex;
      flex-shrink: 0; /* 防止图标被压缩 */
      .tui-icon {font-size: 16px;}
      .tis-folder,
      .tis-folder-open {
        .fc(@bll4);
      }
    }
    
    .node-actions { flex-shrink: 0; 
    }
  }
  
}

</style>
