<template>
  <div class="oxinputLength50">
    <el-input v-bind="$props" @input="inputFn" :placeholder="placeholder?placeholder:'请输入内容'" @change="changeFn" clearable maxlength="50" show-word-limit></el-input>
  </div>
</template>
<script>
export default {
  props:{
    value:{
      type: String,
      default: () => {
        return '';
      }
    },
    placeholder:{
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data () {
    return {
      searchValue:''
    };
  },
  methods:{
    //输入内容 
    inputFn (v) {
      this.$emit ('input',v);
    },
    //内容改变
    changeFn (v) {
      this.$emit ('change',v);
    }
  }
};
</script>
<style lang="scss" scoped>
.oxinputLength50{
  display:inline-block;
}
</style>