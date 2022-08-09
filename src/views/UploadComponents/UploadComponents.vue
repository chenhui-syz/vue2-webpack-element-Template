<template>
  <div class="BreadNavComponents app-container">
    <div class="upload-container">
      <!-- <Upload
      ref="upload"
      :tips="'支持文件格式：.rar .zip .doc .docx .pdf ，单个文件不能超过50mb'"
      :fileType="'pic'"
      :action="'/xxx/xxxx'"
      :fileList="uploadFileBeans"
      :limit="6"
      :drag-type="false"
      @success-callback="fileChange"
      @remove-callback="fileChange"
    /> -->
      <Upload
        ref="upload"
        :fileList="uploadFileBeans"
        @success-callback="fileChange"
        @remove-callback="fileChange"
      />
    </div>
  </div>
</template>
<script>
// 传参：
// 1.action：文件上传路径
// 2.fileList：文件数组
// 3.success-callback：上传事件回调函数
// 4.remove-callback：删除事件回调函数
// 5.fileType：文件类型，默认是除了exe文件外的其他所有格式，可选传输pic，默认情况下文件大小限制为最大50MB，pic情况下最大为2MB
// 6.listType：默认为picture-card，可选参数text
import Upload from '@/components/Upload';
export default {
  components: { Upload },
  data() {
    return {
      uploadFileBeans: []
    };
  },
  methods: {
    fileChange(UploadObject) {
      const fileList = Object.values(UploadObject);

      this.uploadFileBeans.value = fileList;
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-container {
  width: 146px;
}
</style>
>
