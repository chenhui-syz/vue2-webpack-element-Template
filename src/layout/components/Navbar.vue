<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="user">
        <!-- <svg-icon icon-class="user" /> -->
        <span><template v-if="realName">{{realName}}，</template>欢迎您！</span>
      </div>
      <!-- <div class="return-btn" @click="logout">
        <svg-icon icon-class="exit" />
        <span>返回门户</span>
      </div> -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <img v-else src="@/assets/avatar.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item >
            <span style="display:block;" @click="logout">返回门户</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters ([
      'sidebar',
      'realName',
      'avatar'
    ])
  },
  created() {
  },
  methods: {
    // 切换side bar
    toggleSideBar() {
      store.dispatch ('app/toggleSideBar');
    },
    // 返回门户
    async logout() {
      window.location.href = store.getters.oneIdHomePage;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  height: 62px;
  background: #F4FAFF;

  .hamburger-container {
    margin-left: 10px;
    line-height: 62px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    float: right;
    margin-right: 30px;
    height: 100%;
    line-height: 62px;
    .cur-system {
      margin-right: 100px;
      font-size: 14px;
      color: #949494;
    }

    .user, .return-btn {
      font-size: 14px;
      color: #949494;
      span {
        padding-left: 5px;
      }
    }

    &:focus {
      outline: none;
    }

    .return-btn {
      margin-left: 30px;
      cursor: pointer;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin: 0 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
