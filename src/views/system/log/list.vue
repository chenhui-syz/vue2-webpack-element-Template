<template>
  <div class="app-container log-container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="操作时间1">
          <el-date-picker v-model="pickerTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
                          start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" border stripe
              highlight-current-row :header-cell-style="{background:'#F2F9FF'}" style="width: 100%;">
      <el-table-column label="操作内容" prop="message" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column label="操作人" prop="operator" align="center" width="200">
      </el-table-column>
      <el-table-column label="操作时间" align="center" width="200">
        <template slot-scope="{row}">
          {{ row.operateTime | parseTime }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { getLogList } from '@/api/log';

export default {
  name: 'SystemLogList',
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: false,
      list: [],
      listQuery: {
        pagination: true,
        pageIndex: 1,
        pageSize: 15,
        startOperateTime: '',
        endOperateTime: ''
      },
      total: 0,
      pickerTime: ''
    };
  },
  created() {
    // this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.getList ();
    },
    // 获取列表
    getList() {
      this.listQuery.startOperateTime = this.pickerTime ? this.pickerTime[0] + ' 00:00:00' : '';
      this.listQuery.endOperateTime = this.pickerTime ? this.pickerTime[1] + ' 23:59:59' : '';

      this.listLoading = true;
      getLogList (this.listQuery).then (res => {
        this.list = res.item.logList || [];
        this.total = res.item.total || 0;
        this.listLoading = false;
      }).catch (() => {
        this.listLoading = false;
      });
    },
    // 搜索
    handleSearch() {
      this.listQuery.pageIndex = 1;
      this.getList ();
    },
    // 重置
    handleReset() {
      this.pickerTime = '';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
