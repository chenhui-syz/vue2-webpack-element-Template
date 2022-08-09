<template>
  <section class="app-main" id="homeContent">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import  {setWatermark} from '@/utils/watermark.js';

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route() {
      this.addTags ();
    }
  },
  mounted() {
    this.addTags ();
    setWatermark (this,{parentId:'homeContent',watermarkText:'632544_小明_2022-06-06',isAllPage:false});
  },
  methods: {
    addTags() {
      const { name } = this.$route;

      if (name) {
        this.$store.dispatch ('tagsView/addView', this.$route);
      }
      return false;
    }
  }
};
</script>

<style scoped>
.app-main {
  padding: 0 0 0 24px;
  min-height: calc(100vh - 62px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 62px;
}
.fixed-header.has-tags+.app-main {
  padding-top: 90px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
