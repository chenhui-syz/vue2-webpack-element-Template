<template>
  <div class="tags-view-container">
    <div class="tags-view">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.fullPath"
        :class="['tag', isActive(tag)?'active':'']"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
      >
        {{tag.title}}
        <span v-if="visitedViews.length > 1" class="el-icon-close" @click.prevent.stop="closeTag(tag)"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    }
  },
  methods: {
    isActive(tag) {
      return this.$route.path === tag.path;
    },
    closeTag(tag) {
      this.$store.dispatch ('tagsView/delView', tag).then (({ visitedViews }) => {
        if (this.isActive (tag)) {
          this.toLastView (visitedViews);
        }
      });
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice (-1)[0];

      if (latestView) {
        this.$router.push (latestView.fullPath);
      } else {
        this.$router.push ('/');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  margin-bottom: 20px;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 21, 41, 0.2);
  .tags-view {
    display: flex;
    align-items: center;
    padding-top: 2px;
    height: 40px;
    background-color: #F4FAFF;
    overflow-x: auto;
    .tag {
      position: relative;
      flex-shrink: 0;
      display: inline-block;
      margin-right: 5px;
      padding: 0 8px;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      color: #495060;
      background: #fff;
      border: 1px solid #d8dce5;
      cursor: pointer;
      &.active {
        color: #fff;
        background-color: #42b983;
        border-color: #42b983;
        &::before {
          content: "";
          position: relative;
          margin-right: 2px;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
      }
      .el-icon-close {
        margin-left: 4px;
      }
    }
  }
}
</style>
