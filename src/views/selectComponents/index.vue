<template>
  <div class="oxInputComponents app-container">
    <el-form>
      <el-form-item>
        <div>分页功能</div>
        <dossen-select
          :selectValue="selectValue"
          :options="options"
          :filterable="true"
          :total="total"
          :hideOnSinglePage="false"
          :page.sync="listQuery.pageIndex"
          :limit.sync="listQuery.pageSize"
          @pagination="getHotelList"
        />
      </el-form-item>
    </el-form>
    <!--选择框组件 -->
    <!-- <dossen-select
      :selectValue="selectValue"
      :options="options"
      :total="total"
      :multiple="true"
      :collapseTags="true"
      :hideOnSinglePage="false"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getHotelList"
    /> -->
  </div>
</template>
<script>
import dossenSelect  from '@/components/Select';
import { getHotelList } from '@/api/hotel';
export default {
  components:{
    dossenSelect
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      selectValue:'',
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
  methods:{
    // 初始化数据
    initData() {
      this.getHotelList ();
    },
    // 获取酒店列表
    getHotelList() {
      this.listLoading = true;
      getHotelList (this.listQuery).then (res => {
        this.list = this.options;
        this.total = 11;
        this.listLoading = false;
      }).catch (() => {
        this.listLoading = false;
      });
    }
  }
};
</script>
