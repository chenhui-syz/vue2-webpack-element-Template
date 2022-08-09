<template>
  <div class="app-container">
    <Table
      :tableList="tableList"
      rowKey="id"
      @row-click="rowClick"
      :tableHeader="tableHeader"
    >
      <template slot="a" slot-scope="{ scope }">
        {{ scope.row.a ? '通过' : '不通过' }}
      </template>
      <template slot="operates" slot-scope="{ scope }">
        <span class="pointer mr">查看</span>
        <span class="pointer delbtn">删除</span>
      </template>
    </Table>
  </div>
</template>
<script>
import Table from '@/components/Table';

export default {
  components: { Table },
  data () {
    return {
      tableList: [
        { 'id': 1, age: 16, name: '11', $selectable: false, children: [{ 'id': 13, age: 16, name: '11' }], a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 2, age: 16, name: '11', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 3, age: 16, name: '11', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 4, age: 16, name: '11', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 5, age: 16, name: '11', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 6, age: 12, name: '11', a: 0, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 7, age: 16, name: '11', a: 0, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 8, age: 14, name: '11', a: 0, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 9, age: 11, name: '11', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 },
        { 'id': 11, age: 13, name: 'Hello, worldHello, worldHello, world', a: 123, b: 5555, c: 89, d: 89, e: 89, f: 89, g: 89 }
      ],
      tableHeader: [
        { type: 'selection', fixed: 'left', reserveSelection: true },
        { type: 'index' },
        { prop: 'age', label: '年龄', sortable: true, width: '200px' },
        { prop: 'name', label: '姓名', width: '100px' },
        { slot: 'a', label: 'a', width: '200px' },
        { prop: 'b', label: 'b', width: '200px' },
        { prop: 'c', label: 'c', width: '200px' },
        { prop: 'd', label: 'd', width: '200px' },
        { prop: 'e', label: 'e', width: '200px' },
        { prop: 'f', label: 'f', width: '200px' },
        { prop: 'g', label: 'g', width: '200px' },
        {
          label: '操作',
          slot: 'operates',
          width: '200px'
        }
      ]
    };
  },
  methods: {
    rowClick (row, column, event) {
      // console.log(row, column, event, 888);
    }
  }

};
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.mr {
  margin: 20px;
}
.delbtn {
  color: red;
}
</style>
