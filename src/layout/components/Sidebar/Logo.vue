<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="@/assets/mini-logo.png" class="sidebar-mini-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/logo.png" class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '标题'
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  padding: 40px 0 30px 0;
  width: 100%;
  background: transparent;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 140px;
      height: 34px;
    }

    & .sidebar-mini-logo {
      width: 34px;
      height: 34px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

    & .svg-icon {
      margin-right: 5px !important;
      font-size: 25px;
      color: #fff;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
    .svg-icon {
      margin-right: 0 !important;
    }
  }
}
</style>
