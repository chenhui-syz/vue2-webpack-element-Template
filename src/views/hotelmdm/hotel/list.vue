<template>
  <div class="app-container hotel-container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="酒店名称">
          <el-input v-model="listQuery.hotelName" clearable placeholder="请输入酒店名称"
                    style="width: 200px;" @keyup.enter.native="handleSearch" />
        </el-form-item>
        <el-form-item label="酒店ID">
          <el-input v-model="listQuery.hotelId" clearable placeholder="请输入酒店ID"
                    style="width: 200px;" @keyup.enter.native="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 工具栏 -->
    <div class="util-container">
      <router-link to="/hotelmdm/hotel/detail">
        <el-button v-permission="'BUTTON_ADD'" class="filter-item" type="primary">新增酒店</el-button>
      </router-link>
    </div>

    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" border stripe
              highlight-current-row :header-cell-style="{background:'#F2F9FF'}" style="width: 100%;">
      <el-table-column label="酒店ID" prop="hotelId" align="center">
      </el-table-column>
      <el-table-column label="酒店名称" prop="hotelName" align="center">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getHotelList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { getHotelList } from '@/api/hotel';

export default {
  name: 'HotelList',
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
        hotelName: '',
        hotelId: ''
      },
      total: 0
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      this.getHotelList ();
    },
    // 获取酒店列表
    getHotelList() {
      this.listLoading = true;
      getHotelList (this.listQuery).then (res => {
        this.list = [
          { hotelId: 1, hotelName: 'aaa' },
          { hotelId: 2, hotelName: 'bbb' }
        ];
        this.total = 22;
        this.listLoading = false;
      }).catch (() => {
        this.listLoading = false;
      });
    },
    // 搜索
    handleSearch() {
      this.listQuery.pageIndex = 1;
      this.getHotelList ();
    },
    // 重置搜索表单
    handleReset() {
      this.listQuery.hotelName = '';
      this.listQuery.hotelId = '';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
