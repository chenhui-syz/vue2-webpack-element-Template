<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="isCollapse ? '#2495FF' : 'transparent'"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { mapGetters } from 'vuex';
import variables from '@/styles/variables.scss';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters (['sidebar']),
    routes() {
      return this.$store.state.settings.useOneIDSystem &&
        this.$store.state.settings.usePermissionSystem ?
        this.$store.getters.routes :
        this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route,
        { meta, path } = route;
      // if set path, the sidebar will highlight the path you set

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    showSkeleton() {
      return this.$store.state.settings.showSkeleton;
    }
  },
  mounted() {
    // 当菜单加载完毕，移除骨架屏
    // if (this.showSkeleton) {
    //   this.$store.dispatch('settings/removeSkeleton')
    // }
  }
};
</script>
