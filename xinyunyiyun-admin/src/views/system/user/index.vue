<template>
  <div class="user-page w-full flex h-full">
    <!-- <el-scrollbar class="dept-tree w-60 bg-white">
      <el-tree :data="deptTree" class="h-full" :props="{ children: 'children', label: 'name' }" default-expand-all @node-click="handleNodeClick" />
    </el-scrollbar> -->
    <div class="user-table w-[calc(100%-15rem)] ml-5" v-loading="searchForm.loading">
      <!-- <el-form inline :model="searchForm" ref="searchFormRef" label-width="120px"
        class="bg-white mb-4 flex items-center pt-4 pb-4">
        <el-form-item :label="i18nSystemUser('table.account')" prop="account">
          <el-input v-model="searchForm.account" clearable
            :placeholder="i18nSystemUser('search.accountPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemUser('table.name')">
          <el-input v-model="searchForm.name" clearable
            :placeholder="i18nSystemUser('search.nicknamePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="ml-4" @click="getUserList">{{ i18nGlobal("search") }}</el-button>
          <el-button @click="resetForm">{{ i18nGlobal("reset") }}</el-button>
        </el-form-item>
      </el-form> -->
      <div class="p-2 bg-white">
        <div class="table-header flex">
          <div class="table-header-title w-40 text-left">用户列表</div>
          <!-- <div class="table-header-actives flex-1 flex justify-end">
            <el-button type="primary">新增</el-button>
          </div> -->
          <el-button type="primary" :loading="false" @click="handleDownLoad">下载</el-button>
        </div>

        <el-table :data="userTable" ref="multipleTableRef" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :selectable="canBeSelect" />
          <el-table-column width="60" show-overflow-tooltip :label="i18nSystemUser('table.uid')" prop="uid">
          </el-table-column>
          <el-table-column width="60" show-overflow-tooltip :label="i18nSystemUser('table.status')" prop="status">
          </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.name')" prop="name"> </el-table-column>
          <el-table-column class-name="colum-elm" show-overflow-tooltip :label="i18nSystemUser('table.mobile')"
            prop="mobile" :formatter="getCecurityMobile"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.gender')" :formatter="getTestGender"
            prop="gender"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.position')" prop="position">
          </el-table-column>
          <el-table-column class-name="colum-elm" show-overflow-tooltip :label="i18nSystemUser('table.created_at')"
            prop="created_at">
          </el-table-column>
          <el-table-column width="80" show-overflow-tooltip :label="i18nSystemUser('table.t1')" prop="t1"
            :formatter="getTestComplate">
          </el-table-column>
          <el-table-column width="80" show-overflow-tooltip :label="i18nSystemUser('table.t2')" prop="t2"
            :formatter="getTestComplate">
          </el-table-column>
          <el-table-column width="80" show-overflow-tooltip :label="i18nSystemUser('table.t3')" prop="t3"
            :formatter="getTestComplate">
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.sex')">
            <template #default="{ row }">{{ sexFilter(row.sex) }}</template>
          </el-table-column> -->
        </el-table>
        <pagination :total="searchForm.total" :page="searchForm.pageNum" :size="searchForm.pageSize"
          @pagination="onChangePagination" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserService } from "@/apis";
import { reactive, ref, toRaw } from "vue";
import { User } from "@/types";
import type { ElForm, ElTable } from "element-plus";
import { i18nSystemUser, i18nGlobal } from "@/utils";
import { sexFilter } from "@/filter";
import { Dept } from "@/types";

// searchForm 的 ref 引用 用来校验和重置表单
const searchFormRef = ref<InstanceType<typeof ElForm>>();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([])

const getTestComplate = (row: any, column: any) => {
  return row[column.property] == 1 ? '已完成' : '未完成';
}

const getTestGender = (row: any, column: any) => {
  return row[column.property] == 1 ? '男' : '女';
}

const getCecurityMobile = (row: any, column: any) => {
  return row[column.property].replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

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
const handleNodeClick = () => { };

const getUserList = async () => {
  searchForm.loading = true;
  const res = (await UserService.getList({ page: searchForm.pageNum })) as any;

  console.log('UserService-----', searchForm.pageNum, res);
  const { users, count, cur_page } = res.data;
  userTable.value = users;
  searchForm.total = count;
  searchForm.pageNum = Number(cur_page);
  searchForm.pageSize = searchForm.pageSize || 20;
  searchForm.loading = false;
};

const handleDownLoad = async () => {
  ///multipleTableRef.value!.toggleRowSelection(row, undefined)
  const sendParams = toRaw(multipleSelection.value).map((item: any) => {
    return item.uid;
  })
  console.log('multipleSelection======', JSON.stringify(sendParams));
  const res = (await UserService.downLoad({ uids: JSON.stringify(sendParams) })) as any;
}

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;

}

const canBeSelect = (row: any) => {
  if (row?.t1 == 1 && row?.t2 == 1 && row?.t3 == 1) {
    return true; // 返回true 可以选择
  } else {
    return false; // 返回false 禁止选择
  }
}


const onChangePagination = (val: any) => {
  searchForm.pageNum = val.page;
  getUserList();
};
getUserList();
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
      &>.el-tree-node__content {
        background-color: var(--el-color-primary-light-5);
        color: #000;

        .el-tree-node__expand-icon {
          &.is-leaf {
            color: transparent;
          }

          color: #000;
        }
      }

      &>.el-tree-node__children {
        background: #fff;
      }
    }
  }

  .user-table {
    margin: 0;
    width: 100%;
  }

  .colum-elm {
    &>.cell {
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
<script lang="ts">
export default { name: "systemUser" };
</script>
