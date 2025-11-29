<script setup>
// import { tInterval } from "@techui/utils";
// import { $c } from "@techui/colors";
// import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

//-------------------------------------
import { ref } from 'vue';

// 基础树数据
const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
]);

// 懒加载树数据
const lazyTreeData = ref([
  {
    id: 'root1',
    label: '懒加载 1',
    leaf: false
  },
  {
    id: 'root2',
    label: '懒加载 2',
    leaf: false
  }
]);

// 属性配置
const defaultProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled'
});

const lazyProps = ref({
  children: 'children',
  label: 'label',
  isLeaf: 'leaf'
});

// 引用
const basicTree = ref(null);
const filterTree = ref(null);
const checkTree = ref(null);
const checkedInfo = ref('');

// 筛选方法
const filterNode = (value, data, node) => {
  if (!value) return true;
  
  // 通过node对象获取label，而不是直接从data中获取
  const label = node.label || '';
  return label.toLowerCase().includes(value.toLowerCase());
};

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

// 懒加载方法
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve(lazyTreeData.value);
  }
  
  // 模拟异步加载
  setTimeout(() => {
    const data = [
      {
        id: `${node.data.id}-1`,
        label: `${node.data.label}-1`,
        leaf: node.level >= 2
      },
      {
        id: `${node.data.id}-2`,
        label: `${node.data.label}-2`,
        leaf: node.level >= 2
      }
    ];
    
    resolve(data);
  }, 500);
};

// 示例1的数据
const treeData1 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  }
]);

// 示例2的数据：任务管理
const treeData2 = ref([
  {
    id: 1,
    label: '项目 A',
    status: 'running',
    children: [
      {
        id: 11,
        label: '任务 1',
        status: 'completed'
      },
      {
        id: 12,
        label: '任务 2',
        status: 'warning'
      },
      {
        id: 13,
        label: '任务 3',
        status: 'error'
      }
    ]
  },
  {
    id: 2,
    label: '项目 B',
    status: 'paused',
    children: [
      {
        id: 21,
        label: '任务 4',
        status: 'running'
      }
    ]
  }
]);

// 示例3的数据
const treeData3 = ref([
  {
    id: 1,
    label: '购物清单',
    children: [
      {
        id: 11,
        label: '苹果'
      },
      {
        id: 12,
        label: '面包'
      }
    ]
  },
  {
    id: 2,
    label: '待办事项',
    children: [
      {
        id: 21,
        label: '完成报告'
      }
    ]
  }
]);

// 示例4的数据：文件系统
const treeData4 = ref([
  {
    id: 1,
    label: '项目文件夹',
    type: 'folder',
    children: [
      {
        id: 11,
        label: '源代码',
        type: 'folder',
        children: [
          {
            id: 111,
            label: 'index.js',
            type: 'file',
            size: '2.4KB'
          },
          {
            id: 112,
            label: 'app.vue',
            type: 'file',
            size: '5.1KB'
          }
        ]
      },
      {
        id: 12,
        label: '文档',
        type: 'folder',
        children: [
          {
            id: 121,
            label: 'README.md',
            type: 'file',
            size: '3.2KB'
          }
        ]
      },
      {
        id: 13,
        label: 'package.json',
        type: 'file',
        size: '1.8KB'
      }
    ]
  }
]);

// 示例5的数据：组织架构
const treeData5 = ref([
  {
    id: 1,
    label: '公司总部',
    icon: '🏢',
    count: 120,
    children: [
      {
        id: 11,
        label: '技术部',
        icon: '💻',
        count: 45
      },
      {
        id: 12,
        label: '市场部',
        icon: '📊',
        count: 30
      },
      {
        id: 13,
        label: '人事部',
        icon: '👥',
        count: 15
      }
    ]
  },
  {
    id: 2,
    label: '分公司',
    icon: '🏭',
    count: 80,
    children: [
      {
        id: 21,
        label: '销售部',
        icon: '💰',
        count: 50
      },
      {
        id: 22,
        label: '运营部',
        icon: '📈',
        count: 30
      }
    ]
  }
]);

// 状态映射
const statusMap = {
  running: { color: '#67c23a', text: '进行中', icon: '⚡' },
  completed: { color: '#909399', text: '已完成', icon: '✔️' },
  warning: { color: '#e6a23c', text: '警告', icon: '⚠️' },
  error: { color: '#f56c6c', text: '错误', icon: '❌' },
  paused: { color: '#409eff', text: '暂停', icon: '⏸️' }
};

// 编辑状态
const editingNode = ref(null);
const editingLabel = ref('');

// 方法
const append = (data) => {
  const newChild = {
    id: Date.now(),
    label: `新节点 ${Date.now()}`
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
  <div class="progress-3d-demo-wrap">
    <div class="operat-bar">
      
      
    </div>
    <div class="demo-inner">
      
      <div :class="[
          'demo-box',
          `demo-box-col${state.col}`,
          
        ]" >
        <div class="demo-title"></div>
        <div class="demo-item" :style="`height:${state.height}px`" >
          
        </div>
      </div>

    </div>

    <div class="demo-inner">
      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">圆柱体 队列初始化 (延时5秒播放)</div>
        <div class="demo-item" >
        </div>
      </div>

      <div class="demo-box demo-box-col2 demo-box-group">
        <div class="demo-title">方柱体 非队列初始化 (延时5秒播放)</div>
        <div class="demo-item" >
        </div>
      </div>
        <!--  -->
        <div class="tree-example">
          <h2>Tree 树形控件示例</h2>
          
          <div class="example-section">
            <h3>基础用法</h3>
            <TuiTree 
              ref="basicTree"
              :data="treeData" 
              :props="defaultProps"
              node-key="id"
              :default-expanded-keys="[2, 3]"
              highlight-current
              @node-click="handleNodeClick"
            />
          </div>
          
          <div class="example-section">
            <h3>可选择</h3>
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
            <div class="operation-buttons">
              <button @click="getCheckedNodes">获取选中节点</button>
              <button @click="getCheckedKeys">获取选中Keys</button>
              <button @click="setCheckedNodes">设置选中节点</button>
              <button @click="setCheckedKeys">设置选中Keys</button>
              <button @click="resetChecked">重置</button>
            </div>
            <div v-if="checkedInfo" class="checked-info">
              {{ checkedInfo }}
            </div>
          </div>
          
          <div class="example-section">
            <h3>示例 1: 带操作按钮的自定义节点</h3>
            <TuiTree 
              :data="treeData1" 
              :props="defaultProps"
              node-key="id"
              show-checkbox
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <span>{{ data.label }}</span>
                  <div class="node-actions">
                    <button
                      class="mini-btn primary"
                      @click.stop="append(data)"
                    >
                      添加
                    </button>
                    <button
                      class="mini-btn danger"
                      @click.stop="remove(node, data)"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </template>
            </TuiTree>
          </div>
          
          <div class="example-section">
            <h3>示例 2: 带状态标识的自定义节点</h3>
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
                    {{ statusMap[data.status].text }}
                  </span>
                </div>
              </template>
            </TuiTree>
          </div>
          
          <div class="example-section">
            <h3>示例 3: 可编辑的节点</h3>
            <TuiTree 
              :data="treeData3" 
              :props="defaultProps"
              node-key="id"
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <template v-if="editingNode !== data.id">
                    <span>{{ data.label }}</span>
                    <button
                      class="mini-btn primary"
                      @click.stop="startEdit(data)"
                    >
                      编辑
                    </button>
                  </template>
                  <template v-else>
                    <input
                      v-model="editingLabel"
                      class="edit-input"
                      @click.stop
                      @keyup.enter="saveEdit(data)"
                    />
                    <button
                      class="mini-btn success"
                      @click.stop="saveEdit(data)"
                    >
                      保存
                    </button>
                    <button
                      class="mini-btn"
                      @click.stop="cancelEdit"
                    >
                      取消
                    </button>
                  </template>
                </div>
              </template>
            </TuiTree>
          </div>
          
          <div class="example-section">
            <h3>示例 4: 文件管理系统</h3>
            <TuiTree 
              :data="treeData4" 
              :props="defaultProps"
              node-key="id"
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node file-node">
                  <span :class="['file-icon', data.type]">
                    {{ data.type === 'folder' ? '📁' : '📄' }}
                  </span>
                  <span class="file-name">{{ data.label }}</span>
                  <span v-if="data.size" class="file-size">{{ data.size }}</span>
                  <div class="node-actions">
                    <button
                      v-if="data.type === 'file'"
                      class="mini-btn primary"
                      @click.stop="downloadFile(data)"
                    >
                      下载
                    </button>
                    <button
                      class="mini-btn info"
                      @click.stop="viewDetails(data)"
                    >
                      详情
                    </button>
                  </div>
                </div>
              </template>
            </TuiTree>
          </div>

          <div class="example-section">
            <h3>示例 5: 组织架构</h3>
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
                  <span class="org-count">{{ data.count }}人</span>
                </div>
              </template>
            </TuiTree>
          </div>



          
          <div class="example-section">
            <h3>可筛选</h3>
            <TuiTree 
              ref="filterTree"
              :data="treeData" 
              :props="defaultProps"
              node-key="id"
              :filter-node-method="filterNode"
            />
          </div>
          
          <div class="example-section">
            <h3>手风琴模式</h3>
            <TuiTree 
              :data="treeData" 
              :props="defaultProps"
              node-key="id"
              accordion
            />
          </div>
          
          <div class="example-section">
            <h3>懒加载</h3>
            <TuiTree 
              :data="lazyTreeData" 
              :props="lazyProps"
              node-key="id"
              lazy
              :load="loadNode"
            />
          </div>
        </div>
      <!--  -->

    </div>
  </div>
</template>
<style lang="less">
.progress-3d-demo-wrap{  min-height:100%; width:1400px; margin:0 auto; padding:20px 20px 100px 20px; .por;
  .operat-bar{.flex(20px); padding:0 20px; margin-bottom:20px; flex-wrap: wrap;
    .form-group{
      .label{margin:10px 0;}
      &.group-number{width: 120px;}
    }
  }
  .demo-inner{ .flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0; 
    .demo-box{ .centerFlex; .por; .bd(var(--common-bd)); .bdra(5px); min-height:100px; padding:70px 20px 40px 20px;
      .demo-title{.poa; left:10px; top:10px;}
      .demo-item{width: 100%;  .centerFlex;}
      &.demo-box-mark-varColor{
        --tui-pgspol-gad_A:@pul5;
        --tui-pgspol-gad_B:@vil3;
      }
      &.demo-box-col2{width:calc(50% - 27px); }
      &.demo-box-col3{width:calc(33.3333% - 27px); }
      &.demo-box-col4{width:calc(25% - 30px); }
      &.demo-box-col5{width:calc(20% - 32px); }
      &.demo-box-col6{width:calc(16.666% - 34px); }
      &.demo-box-group{ height:350px;
        .demo-item{height: 100%;}
      }

      
    }
  }
}



.tree-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.example-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #606266;
}

.filter-container {
  margin-bottom: 15px;
}

.filter-input {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #409eff;
}

.custom-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.custom-label {
  font-size: 14px;
}

.custom-buttons {
  display: none;
  margin-left: 10px;
}

.el-tree-node__content:hover .custom-buttons {
  display: inline-block;
}

.custom-button {
  padding: 0 5px;
  margin-left: 5px;
  font-size: 12px;
  background-color: #f0f2f5;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  cursor: pointer;
}

.custom-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.slot-example {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #303133;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
}

.node-actions {
  display: none;
  gap: 8px;
  margin-left: 20px;
}

.el-tree-node__content:hover .node-actions {
  display: flex;
}

/* 按钮样式 */
.mini-btn {
  padding: 2px 8px;
  font-size: 12px;
  background-color: #f0f2f5;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
}

.mini-btn:hover {
  background-color: #e6e9ec;
  border-color: #d0d3d6;
}

.mini-btn.primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.mini-btn.primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.mini-btn.success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.mini-btn.success:hover {
  background-color: #85ce61;
  border-color: #85ce61;
}

.mini-btn.danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

.mini-btn.danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

.mini-btn.info {
  background-color: #909399;
  border-color: #909399;
  color: #fff;
}

.mini-btn.info:hover {
  background-color: #a6a9ad;
  border-color: #a6a9ad;
}

/* 状态徽章样式 */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
}

.status-badge.running {
  background-color: #f0f9eb;
  color: #67c23a;
}

.status-badge.completed {
  background-color: #f5f7fa;
  color: #909399;
}

.status-badge.warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.status-badge.error {
  background-color: #fef0f0;
  color: #f56c6c;
}

.status-badge.paused {
  background-color: #ecf5ff;
  color: #409eff;
}

/* 编辑输入框样式 */
.edit-input {
  padding: 2px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 8px;
  min-width: 200px;
}

.edit-input:focus {
  border-color: #409eff;
  outline: none;
}

/* 文件节点样式 */
.file-node {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.file-icon {
  font-size: 16px;
}

.file-name {
  flex: 1;
}

.file-size {
  color: #909399;
  font-size: 12px;
  margin-left: 10px;
}

/* 组织架构样式 */
.org-node {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.org-icon {
  font-size: 18px;
}

.org-name {
  flex: 1;
  font-weight: 500;
}

.org-count {
  background-color: #409eff;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}
</style>
