<template>
  <div class="oxInputComponents app-container">
    <!-- <input type="text"  v-trim v-model="text" @change="huFn"/> -->
    <el-form>
      <!-- 密码填写组件 -->
      <el-form-item>
        <div>密码填写组件</div>
        <oxInputPassword v-model="text1" @update:clear="text1 = $event" @update:verify="verifyRes = $event"  style="width:300px;"  @change="change1Fn"></oxInputPassword>
      </el-form-item>

      <!-- 防抖搜索组件 -->
      <el-form-item>
        <div>防抖搜索组件</div>
        <oxInputSearch  v-model="text2" @input="inputFn" style="width:300px;" placeholder="防抖输入"></oxInputSearch>
      </el-form-item>

      <!-- 限制50长度组件 -->
      <el-form-item>
        <div>限制50长度组件</div>
        <oxInputLength50 v-model="text3" @input="inputFn"  style="width:300px;"></oxInputLength50>
      </el-form-item>

      <!-- 限制300长度组件 -->
      <el-form-item>
        <div>限制300长度组件</div>
        <oxInputLength300 v-model="text4" @input="inputFn"  style="width:300px;"></oxInputLength300>
      </el-form-item>

      <!-- 整数设置 -->
      <el-form-item>
        <div>整数设置</div>
        <el-input type="text" v-model="text5" placeholder="整数设置" v-inputNumber="{'key':'text5','isInteger':true}"  style="width:300px;"></el-input>
      </el-form-item>

      <!-- 小数设置  digit不设置默认为两位小数-->
      <el-form-item>
        <div>小数设置  digit不设置默认为两位小数</div>
        <el-input type="text" v-model="text6" v-inputNumber="{'key':'text6', 'digit': 4}"  placeholder="小数设置"  style="width:300px;" @change="cfn"></el-input>
      </el-form-item>

      <!-- 数字输入设置默认只能输入两位小数-->
      <el-form-item>
        <div>数字输入设置默认只能输入两位小数</div>
        <el-input type="text" v-model="text8" v-inputNumber="{'key':'text8'}"  style="width:300px;" @change="cfn" placeholder="数字输入设置默认两位"></el-input>
      </el-form-item>

      <!-- 清空两端 -->
      <el-form-item>
        <div>清空两端</div>
        <el-input type="text" v-model="text7" v-trim  style="width:300px;" placeholder="清空两端"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import oxInputLength300 from '@/components/oxInput/oxInputLength300.vue';
import oxInputLength50 from '@/components/oxInput/oxInputLength50.vue';
import oxInputPassword from '@/components/oxInput/oxInputPassword.vue';
import oxInputSearch from '@/components/oxInput/oxInputSearch.vue';


export default {
  components:{
    oxInputPassword,
    oxInputSearch,
    oxInputLength50,
    oxInputLength300
  },
  data () {
    return {
      text1:'',
      text2:'',
      text3:'',
      text4:'',
      text5:'',
      text6:'',
      text7:'',
      text8:'',
      //返回验证密码是否通过
      verifyRes:false,
      confirmLoading:false

    };
  },
  methods:{
    tow () {
      this.$router.push ({
        path:'testNoWaterk'
      });
    },
    change1Fn () {
      // console.log (this.text1, this.verifyRes);
    },
    inputFn () {
      // console.log (this.text2);
    },
    cfn () {
      setTimeout (() => {
        //console.log (this.text6);
      },100);
    },
    handleSubmit(){
      this.confirmLoading = true;
      setTimeout(()=>{
        this.confirmLoading = false;
      },5000);
    }
  }
};
</script>
