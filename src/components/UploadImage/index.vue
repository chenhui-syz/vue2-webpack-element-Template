<template>
  <div>
    <el-upload :show-file-list="false" action="xxxx/xxx" :http-request="fnUploadRequest" :on-success="handleSuccess" :before-upload="handleUpload" class="watermark">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus watermark-icon"></i>
    </el-upload>
    <!-- 图片上传水印 -->
    <div id="markImg" class="markImg">
      <div class="logo">
        <img src="@/assets/logo.png" />
      </div>
      <p>{{fileDate}}</p>
    </div>
  </div>
</template>
<script>
import { addWaterMarker, compressor } from "@/utils/imageWatermark";
export default {
  name: "index",
  props: {
    needWaterMark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageUrl: '',
      fileDate: '',
    };
  },
  created() {

  },
  computed: {

  },
  methods: {
    // 上传图片判断
    handleUpload(file) {},
    handleExceed(files) {},
    // 上传图片
    async fnUploadRequest(options) {
      let file = options.file;
      this.fileDate = this.dayjs(file.lastModifiedDate || file.lastModified).format('YYYY-MM-DD HH:mm:ss');
      const res = await addWaterMarker(file, "#markImg");
      this.imageUrl = URL.createObjectURL(res);
    },
    //图片上传成功回调
    handleSuccess(response, file) {},
  },
};

</script>
<style lang="scss">
.watermark .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.watermark .el-upload:hover {
  border-color: #409EFF;
}

.watermark-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 350px;
  height: 350px;
  display: block;
}


.markImg {
  position: absolute;
  left: -9999999px;
  text-align: right;
  padding: 2px 7px;

  .logo {
    font-weight: 600;
    font-size: 15px;
    color: #ffffff;

    display: flex;
    height: 21px;
    align-items: center;
    justify-content: flex-end;

    img {
      height: 21px;
      margin-right: 5px;
    }
  }

  p {
    margin: 0 0 3px 0;
    // color: #ffffff;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;
  }
}

</style>
