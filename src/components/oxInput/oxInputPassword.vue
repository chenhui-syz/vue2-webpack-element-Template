<template>
  <div  class="oxInputPassword">
    <div class="passwordParent">
      <el-input v-bind="$props" ref="password" v-trim @change="changeFn" :type="inputType" @input="inputFn"  :placeholder="placeholder?placeholder:'请输入账号密码'" ></el-input>
      <i class="el-input__icon el-icon-view" @click="typeChangeFn"></i>
      <i class="el-input__icon el-icon-circle-close" @click="clearFn"></i>
    </div>
    <ul class="verifications" v-if="verifyShow" @mouseover="mouseoverFn" @mouseout="mouseoutFn">
      <li>
        <i class="el-icon-success" v-if="isLength"></i>
        <i class="el-icon-error" v-else></i>    
        密码长度限制8~32位
      </li>
      <li>
        <i class="el-icon-success" v-if="isNumber"></i>
        <i class="el-icon-error" v-else></i>
        必须包含数字
      </li>
      <li>
        <i class="el-icon-success" v-if="isCapitalize"></i>
        <i class="el-icon-error" v-else></i>
        必须包含小写字母
      </li>
      <li>
        <i class="el-icon-success" v-if="isLowercase"></i>
        <i class="el-icon-error" v-else></i>
        必须包含大写字母
      </li>
    </ul>
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
      verifyShow:false,
      inputType:'password',
      isLength: false,
      isNumber: false,
      isCapitalize: false,
      isLowercase: false,
      timer:null
    };
  },
  mounted () {
    this.$refs.password.$el.querySelector ('.el-input__inner').style = 'padding-right:55px;';
  },
  methods:{
    //离开
    mouseoutFn () {
      this.timer  = setTimeout (() => {
        this.verifyShow = false;
      },3000);
    },
    //停留
    mouseoverFn () {
      this.verifyShow = true;
      clearTimeout (this.timer); 
    },
    //清除内容
    clearFn () {
      this.$emit ('update:clear','');
    },
    //改变input类型
    typeChangeFn () {
      if (this.inputType === 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }    
    },
    //值改变
    changeFn (v) {
      this.$emit ('change',v);
      this.timer  = setTimeout (() => {
        this.verifyShow = false;
      },3000);
    },
    //输入值
    inputFn (v) {
      let len = v.length,
        numRex = /[0-9]/g,
        capitalizeRex = /[a-z]/g,
        lowercase = /[A-Z]/g,
        verify = true;

      if (len>= 8 && len <= 32) {
        this.isLength = true;
      } else {
        this.isLength = false;
        verify = false;
      }
      if (v.search (numRex)>=0) {
        this.isNumber = true;
      } else {
        this.isNumber = false;
        verify = false;
      }
      if (v.search (capitalizeRex)>=0) {
        this.isCapitalize = true;
      } else {
        this.isCapitalize = false;
        verify = false;
      }
      if (v.search (lowercase)>=0) {
        this.isLowercase = true;
      } else {
        this.isLowercase = false;
        verify = false;
      }
      this.verifyShow = true;     
      this.$emit ('update:verify',verify);
      this.$emit ('input',v); 
    }
  }
};
</script>
<style lang="scss" scoped>
.oxInputPassword{
  li{
    list-style: none;
  }
  position:relative;
  display: inline-block;
  .passwordParent{
    position: relative;
    
    .el-input__inner{
      padding-right:45px;
    }
    .el-icon-view {
      position:absolute;
      right:10px;
      top:1px;
      line-height: 0;
      cursor: pointer;
    }
    .el-icon-circle-close{
      position:absolute;
      right:35px;
      top:1px;
      line-height: 0;
      cursor: pointer;
      display: none;
    }
  }
  .passwordParent:hover{
    .el-icon-circle-close{
      display: block;
    }
  }
  .verifications{
    padding:0;
    position:absolute;
    left:0;
    top:20px;
    background: #fff;
    width:100%;
    border-radius: 5px;
    font-size:14px;
    line-height:30px;
    box-shadow: 0px  4px  8px 0 #00000050;
    color:rgb(172, 172, 172);
    z-index: 1;
    .el-icon-success{
      color:#67C23A;
    }
    .el-icon-error{
      color:#F56C6C;
    }
    li {
      margin-left:10px;
    }
    i{
      margin-right:10px;
    }
  }
}
</style>
