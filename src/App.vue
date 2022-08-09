<template>
  <div id="app">
    <router-view />

    <!-- 全局Loading，在菜单组件触发隐藏，目前没想到好的方式处理移除逻辑 -->
    <common-skeleton v-if="showSkeleton" />
  </div>
</template>

<script>
import CommonSkeleton from './components/Skeleton/common';

export default {
  name: 'App',
  components: {
    CommonSkeleton
  },
  computed: {
    showSkeleton() {
      return this.$store.state.settings.showSkeleton;
    }
  }
};
</script>
