<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp';

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb ();
    }
  },
  created() {
    this.getBreadcrumb ();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      let matched = this.$store.state.settings.useOneIDSystem && this.$store.state.settings.usePermissionSystem ?
        this.getBreadcrumbRoutes ().filter (item => item.meta && item.meta.title) :
        this.$route.matched.filter (item => item.meta && item.meta.title);
      // let matched = this.getBreadcrumbRoutes().filter(item => item.meta && item.meta.title)
      // const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      // }

      this.levelList = matched.filter (item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    getBreadcrumbRoutes() {
      const first = this.$route.matched[0];
      let last = this.$route.matched[this.$route.matched.length - 1];
      const matched = [];

      // 倒序遍历有meta.parent标识的路由
      for (let i = this.$route.matched.length - 1; i >= 0; i--) {
        const match = this.$route.matched[i],
          meta = match.meta || {};

        matched.unshift (match);
        if (meta.parent) {
          last = match;
          break;
        }
      }

      // 填充降级后缺失的各级路由
      let currentRoutes = {};

      this.$router.options.routes.some (item => {
        if (item.path === first.path) {
          currentRoutes = item.children;
          this.getParentRoute (currentRoutes, last, matched);
          return true;
        }
      });
      matched.unshift (first);
      return matched;
    },
    getParentRoute(currentRoutes, last, matched = []) {
      const meta = last.meta || {};

      currentRoutes.forEach ((item) => {
        if (item.path === meta.parent) {
          matched.unshift (item);
          this.getParentRoute (currentRoutes, item, matched);
        }
      });
      return matched;
    },
    isDashboard(route) {
      const name = route && route.name;

      if (!name) {
        return false;
      }
      return name.trim ().toLocaleLowerCase () === 'Dashboard'.toLocaleLowerCase ();
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      let toPath = pathToRegexp.compile (path);

      return toPath (params);
    },
    handleLink(item) {
      const { redirect, path } = item;

      if (redirect) {
        this.$router.push (redirect);
        return;
      }
      this.$router.push (this.pathCompile (path));
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 62px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
