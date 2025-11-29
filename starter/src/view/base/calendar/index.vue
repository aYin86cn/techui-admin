<script setup>
import { ref } from 'vue'

const selectedDate = ref(new Date())
const todoData = ref({
  '2025-06-06': 3,
  '2025-06-07': 3,
  '2025-06-10': 1,
  '2025-06-15': 2,
  '2025-07-02': 2,
})

function handleDateChange(date) {
  console.log('选中日期:', date)
}
</script>
<template>
  <div class="calendar-demo-wrap">
    <div class="demo-inner">
      <div class="demo-box">
        <div class="demo-title">默认</div>
        <TuiCalendar
          v-model="selectedDate"
          :todos="todoData"
          @change="handleDateChange"
        >
        </TuiCalendar>
      </div>
      
      <div class="demo-box">
        <div class="demo-title">自定义单元格 一为始</div>
        <TuiCalendar
          v-model="selectedDate"
          :buttons="['month', 'today',]"
          :todos="todoData"
          weekStartsOn="monday"
          @change="handleDateChange"
        >
          <template #date-cell="{ data }">
            <div class="custom-cell">
              <div class="custom-day">{{ data.day }}</div>
              <div class="custom-count" v-if="data.todoCount > 0">
                <i class="tui-icon ti-bell"></i>
                <span class="number">{{ data.todoCount }}条待办</span>
              </div>
            </div>
          </template>
        </TuiCalendar>
      </div>
      <div class="demo-box">
        <div class="demo-title">居中显示</div>
        <TuiCalendar
          v-model="selectedDate"
          :todos="todoData"
          @change="handleDateChange"
          titleAlign="center"
          buttonSize="small"
          cellAlign="center"
          :tagConfig="{round:true}"
        >
        </TuiCalendar>
      </div>
      
      
    </div>
  </div>
  
</template>
<style lang="less">
.calendar-demo-wrap{ min-height:100%; width:1400px; margin:0 auto ; padding:20px; 
  .demo-inner{.flex(40px); padding:20px; flex-wrap: wrap; margin:0 0 50px 0;
    .demo-box{width:calc(50% - 20px); padding:10px; .por; .bgc(var(--common-bg)); .bd(var(--common-bd)); .bdra(10px); min-height:300px;
      &.demo-box-v{width:calc(33.33% - 28px); min-height:500px;}
      .demo-title{padding:0 0 10px 0; font-size: 16px; .fc(var(--font-weak)); .bdb(var(--common-bd));}
    }
  }
  .custom-cell{
    .custom-day{}
    .custom-count{.flex(2px);}
  }
}
</style>