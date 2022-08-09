<template>
  <div class="waterMark-panel">
    <UploadImage></UploadImage>
  </div>
</template>
<script>
import UploadImage from '@/components/UploadImage';
export default {
  name: 'waterMark',
  components: {
    UploadImage,
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
}

</script>
<style>
.waterMark-panel {
  background-color: #fff;
  padding: 40px;
}

</style>
