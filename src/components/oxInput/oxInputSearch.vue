<template>
  <div class="oxSearchInput">
    <el-input v-model.trim="searchValue" @input="inputFn" :placeholder="placeholder?placeholder:'请输入内容'" clearable maxlength="50" show-word-limit></el-input>
  </div>
</template>
<script>
export default {
  props:{
    placeholder:{
      type: String,
      default: () => {
        return '';
      }
    },
    delay:{
      type: Number,
      default: () => {
        return 800;
      }
    }
  },
  data () {
    return {
      timer: null,
      searchValue:''
    };
  },
  methods: {
    //输入值
    inputFn (v) {  
      let delay = this.delay;

      this.debounce (function () {
        this.$emit ('input',v);
      }, delay);
    },
    debounce(fn, delay) {
      if (this.timer) {
        clearTimeout (this.timer);
      }

      this.timer = setTimeout (() => {
        fn.apply (this);
      }, delay);
    } 
  }
};
</script>
<style lang="scss" scoped>
.oxSearchInput{
  display:inline-block;
}
</style>