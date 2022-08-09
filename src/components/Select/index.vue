<template>
  <!-- 选择框组件 -->
  <el-select
    v-model="selectValue"
    :clearable="clearable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :filterable ="filterable"
    placeholder="请选择"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    <!-- 分页 -->
    <div :class="{'hidden':hidden}" class="pagination-container pagination">
      <el-pagination
        :small="smallType"
        :background="background"
        :hide-on-single-page="hideOnSinglePage"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-select>
</template>
<script>
export default {
  name: 'Select',
  props:{
    options:{
      type: Array,
      default: ()=>{
        return [];
      }
    },
    selectValue:{
      type:String,
      default:''
    },
    clearable:{
      type:Boolean,
      default:false
    },
    multiple:{
      type:Boolean,
      default:false
    },
    collapseTags:{
      type:Boolean,
      default:false
    },
    filterable:{
      type:Boolean,
      default:false
    },
    hideOnSinglePage:{
      type:Boolean,
      default:true
    },
    total: {
      required: false,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 5
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 15, 20];
      }
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    smallType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit ('update:page', val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit ('update:limit', val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit ('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo (0, 300);
      }
    },
    handleCurrentChange(val) {
      this.$emit ('pagination', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo (0, 300);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .pagination{
    padding:0;
    ::v-deep .el-pagination{
      padding:5px 10px;
    }
  }
</style>
