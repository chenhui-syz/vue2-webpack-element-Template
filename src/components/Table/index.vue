<template>
  <el-table
    ref="dosTable"
    :data="tableList"
    stripe
    fit
    :row-key="rowKey"
    v-loading="loading"
    :header-cell-style="{
      height: '40px',
      'font-size': '14px',
      'font-weight': '600',
      background: '#EFEFF6',
      color: '#36395C',
    }"
    :row-style="{ height: '40px', 'font-size': '12px', color: '#36465D' }"
    style="width: 100%"
    highlight-current-row
    :height="height"
    :tree-props="{ children: 'children' }"
    @selection-change="selectionChange"
    @select-all="selectAll"
    @select="selectItem"
    @row-click="rowClick"
    @sort-change="sortChange"
  >
    <template v-for="(itm, idx) in tableHeader">
      <!-- 复选框 -->
      <el-table-column
        :key="idx"
        v-if="itm.type === 'selection'"
        type="selection"
        :reserve-selection="itm.reserveSelection || false"
        :selectable="selectable"
        :fixed="itm.fixed ? itm.fixed : null"
        width="55"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        :key="idx"
        v-else-if="itm.type === 'index'"
        type="index"
        width="50"
        label="序号"
        :fixed="itm.fixed ? itm.fixed : null"
      ></el-table-column>
      <!-- 特殊处理列 -->
      <el-table-column
        v-else
        :key="idx"
        :prop="itm.prop ? itm.prop : null"
        :label="itm.label ? itm.label : null"
        :width="itm.width ? itm.width : null"
        :sortable="itm.sortable ? itm.sortable : false"
        :align="itm.align ? itm.align : 'center'"
        :show-overflow-tooltip="itm.tooltip ? itm.tooltip : true"
        :fixed="itm.fixed ? itm.fixed : null"
        min-width="50"
      >
        <template slot-scope="scope">
          <slot v-if="itm.slot" :name="itm.slot" :scope="scope"></slot>
          <span v-else>{{
            scope.row[tableHeader[idx].prop]
              ? scope.row[tableHeader[idx].prop]
              : '--'
          }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    // 表格数据
    tableList: {
      type: Array,
      default: () => []
    },
    // 表格头部
    tableHeader: {
      type: Array,
      default: () => []
    },
    // 固定高度
    height: {
      type: [Number, String, Function],
      default: () => null
    },
    // 加载动画
    loading: {
      type: Boolean
    },
    // 跟:reserve-selection="true"结合，保证模态框内的客户列表数据翻页依然选中之前选择的
    rowKey: {
      type: String,
      default: function () {
        return 'id';
      }
    }
  },
  methods: {
    /**
   * 是否可选
   */
    selectable (row, index) {
      // 默认是可选的
      // 如果将 $selectable 属性设置为了 false 就不可选
      return row.$selectable !== false;
    },
    /**
     * 选择框选择后更改,事件分发
     */
    selectionChange (selection) {
      this.$emit('selection-change', selection);
    },
    /**
     * 点击事件
     */
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event);
    },
    /**
    * 单选时触发
    */
    selectItem (selection, row) {
      this.$emit('selectItem', selection, row);
    },
    /**
    * 当用户手动勾选全选 Checkbox 时触发的事件
    */
    selectAll (selection) {
      this.$emit('select-all', selection);
    },
    /**
     * 清除全选事件
     */
    _clearSelection () {
      this.$refs.dynamicTable.clearSelection();
    },
    // 排序
    sortChange (column) {
      this.$emit('sort-change', column);
    }
  }
};
</script>
<style></style>