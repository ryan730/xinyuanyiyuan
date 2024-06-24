<template>
  <div class="user-page w-full flex h-full">
    <div class="user-table w-[calc(100%-15rem)] ml-5" v-loading="searchForm.loading">
      <div class="p-2 bg-white">
        <div class="table-header flex">
          <div class="table-header-title w-40 text-left">  {{
            i18nRouter('distributionTestList')
          }}</div>
          <!-- <el-button type="primary" :loading="false" @click="handleDownLoad">下载</el-button> -->
          <!-- <div class="block">
            <span class="demonstration">选择开始和结束时间</span>
            <el-date-picker v-model="timerValue" type="datetimerange" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" @change="handlerDateChange" start-placeholder="Start Date" end-placeholder="End Date" :default-time="defaultTime1" />
          </div> -->
        </div>

        <el-table :data="userTable" ref="multipleTableRef" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :selectable="canBeSelect" />

          <el-table-column width="100" show-overflow-tooltip label="⽤⼾id" prop="user_id" />
          <el-table-column show-overflow-tooltip label="⽤⼾名称" prop="nick_name" />
          <el-table-column show-overflow-tooltip label="猫测试的订单总数" prop="cat_order_total" />
          <el-table-column show-overflow-tooltip label="猫测试的⽀付订单总数" prop="cat_order_paid" />
          <el-table-column show-overflow-tooltip label="猫测试的订单收⼊" prop="cat_order_income" />
          <el-table-column show-overflow-tooltip label="狗测试的订单总数" prop="dog_order_total" />
          <el-table-column show-overflow-tooltip label="狗测试的⽀付订单总数" prop="dog_order_paid" />
          <el-table-column show-overflow-tooltip label="狗测试的订单收⼊" prop="dog_order_income" />
          <el-table-column class-name="colum-elm" show-overflow-tooltip label="时间" prop="created_at" />
        </el-table>

        <pagination :total="searchForm.total" :page="searchForm.pageNum" :size="searchForm.pageSize" @pagination="onChangePagination" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { statisticsService } from "@/apis";
import { reactive, ref, toRaw, onMounted, nextTick } from "vue";
import { User } from "@/types";
import type { ElForm, ElTable } from "element-plus";
import { i18nRouter } from "@/utils";
import { sexFilter } from "@/filter";
import { Dept } from "@/types";

// searchForm 的 ref 引用 用来校验和重置表单
const searchFormRef = ref<InstanceType<typeof ElForm>>();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([]);
const timerValue = ref<[Date, Date]>([new Date(), new Date()]);
const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
const dateChangeBool = ref(false);

const getTestComplate = (row: any, column: any) => {
  return row[column.property] == 1 ? "已完成" : "未完成";
};

const getTestGender = (row: any, column: any) => {
  return row[column.property] == 1 ? "男" : "女";
};

const getCecurityMobile = (row: any, column: any) => {
  return row[column.property].replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};

// 搜索的表单
const searchForm = reactive({
  name: "",
  account: "",
  deptId: 1,
  pageNum: 1,
  pageSize: 20,
  total: 0,
  loading: true,
});
const deptTree = ref<Dept[]>([]);
const userTable = ref<User[]>([]);

const resetForm = () => {
  if (!searchFormRef.value) return;
  searchFormRef.value.resetFields();
  searchForm.pageNum = 1;
  getUserList();
};
const handleNodeClick = () => {};

const getUserList = async (date: any = {}) => {
  searchForm.loading = true;
  let timer = {};
  let { time_start, time_end } = date;
  if (time_start && time_end) {
    timer = { time_start, time_end };
  }
  const res = (await statisticsService.test({ page: searchForm.pageNum, ...timer })) as any;

  console.log("statisticsService-----", searchForm.pageNum, res);
  const { data, cur_page } = res;
  userTable.value = data;
  searchForm.total = data?.total;
  searchForm.pageNum = Number(searchForm.pageNum);
  searchForm.pageSize = searchForm.pageSize || 20;
  searchForm.loading = false;
  nextTick(() => {
    dateChangeBool.value = false;
  });
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const canBeSelect = (row: any) => {
  // if (row?.t1 == 1 && row?.t2 == 1 && row?.t3 == 1) {
  //   return true; // 返回true 可以选择
  // } else {
  //   return false; // 返回false 禁止选择
  // }
  return true;
};

const onChangePagination = (val: any) => {
  if (!dateChangeBool.value) {
    searchForm.pageNum = val.page;
    getUserList();
  }
};

const handlerDateChange = (val: any) => {
  console.log("handlerDateChange======", val, timerValue);
  dateChangeBool.value = true;
  searchForm.pageNum = 1;
  getUserList({
    time_start: val?.[0],
    time_end: val?.[1],
  });
  // }
};

onMounted(() => {
  getUserList();
});
</script>
<style lang="scss">
.user-page {
  border-radius: 5px;
  padding: 10px;

  :deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-tree-node) {
    .el-tree-node__content:hover {
      background-color: var(--el-color-primary-light-5);
      color: #000;

      .el-tree-node__expand-icon {
        color: #000;

        &.is-leaf {
          color: transparent;
        }
      }
    }

    &.is-current {
      & > .el-tree-node__content {
        background-color: var(--el-color-primary-light-5);
        color: #000;

        .el-tree-node__expand-icon {
          &.is-leaf {
            color: transparent;
          }

          color: #000;
        }
      }

      & > .el-tree-node__children {
        background: #fff;
      }
    }
  }

  .user-table {
    margin: 0;
    width: 100%;
  }

  .colum-elm {
    & > .cell {
      white-space: unset !important;
    }
  }

  .table-header {
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }
}
</style>
<style scoped>
.block {
  /*padding: 30px 0;*/
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
  width: 500px;
  flex-grow: unset;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin: 5px 0;
}
</style>
<script lang="ts">
export default { name: "systemUser" };
</script>
