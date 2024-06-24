<template>
  <div class="user-page w-full flex h-full">
    <div class="user-table w-[calc(100%-15rem)] ml-5" v-loading="searchForm.loading">
      <div class="p-2 bg-white">
        <div class="table-header flex">
          <div class="table-header-title w-40 text-left">{{
            i18nRouter('productList')
          }}</div>
          <!-- <el-button type="primary" :loading="false" @click="handleDownLoad">下载</el-button> -->
        </div>

        <el-table :data="userTable" 
          :class="'hover-row'"
          ref="multipleTableRef" border @selection-change="handleSelectionChange" @row-click="handleRowClick">
          <el-table-column type="selection" width="55" :selectable="canBeSelect" />

          <el-table-column width="60" show-overflow-tooltip label="商品id" prop="id"/>
          <el-table-column show-overflow-tooltip label="产品名" prop="name"/>
          <el-table-column show-overflow-tooltip label="产品详情" prop="describe"/>
          <el-table-column show-overflow-tooltip label="售价" prop="price"/>
          <el-table-column show-overflow-tooltip label="价格" prop="price_show"/>
          <el-table-column class-name="colum-elm" show-overflow-tooltip label="时间" prop="created_at"/>

          <!-- <el-table-column width="60" show-overflow-tooltip :label="i18nSystemUser('table.status')" prop="status">
          </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.name')" prop="name"> </el-table-column>
          <el-table-column class-name="colum-elm" show-overflow-tooltip :label="i18nSystemUser('table.mobile')"
            prop="mobile" :formatter="getCecurityMobile"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.gender')" :formatter="getTestGender"
            prop="gender" width="55"> </el-table-column>
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
          </el-table-column> -->
        </el-table>

        <pagination :total="searchForm.total" :page="searchForm.pageNum" :size="searchForm.pageSize"
          @pagination="onChangePagination" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ListService } from "@/apis";
import { reactive, ref, toRaw } from "vue";
import { User } from "@/types";
import type { ElForm, ElTable } from "element-plus";
import { i18nRouter } from "@/utils";
import { sexFilter } from "@/filter";
import { Dept } from "@/types";
import { useRouter, useRoute } from "vue-router";

// searchForm 的 ref 引用 用来校验和重置表单
const searchFormRef = ref<InstanceType<typeof ElForm>>();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([])
const router = useRouter();
const route = useRoute();

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
  const res = (await ListService.productList({ page: searchForm.pageNum })) as any;

  console.log('ListService-----', searchForm.pageNum, res);
  const { data, count, cur_page } = res;
  userTable.value = data;
  searchForm.total = count;
  searchForm.pageNum = Number(cur_page);
  searchForm.pageSize = searchForm.pageSize || 20;
  searchForm.loading = false;
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
 console.log('multipleSelection======', val);
}

const handleRowClick = (row: any, column: any, event: MouseEvent)=> {
      console.log('点击了行', row, column, event);
      // 在这里处理点击行的逻辑，例如导航、显示详情等
      router.push(`/system/testList/${row.id}`); // 跳转到商品详情页，假设URL模式是'/product/detail/:id'
}

const canBeSelect = (row: any) => {
  // if (row?.t1 == 1 && row?.t2 == 1 && row?.t3 == 1) {
  //   return true; // 返回true 可以选择
  // } else {
  //   return false; // 返回false 禁止选择
  // }
  return true;
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

  .hover-row {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.025); /* 自定义背景颜色 */
    /* 可以添加其他CSS样式，如边框、文字颜色变化等 */
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
