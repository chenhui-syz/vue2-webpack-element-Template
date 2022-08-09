import defaultSettings from '@/settings';

const { useOneIDSystem, usePermissionSystem, showSkeleton, showTags, fixedHeader, sidebarLogo } = defaultSettings,

  state = {
    useOneIDSystem,
    usePermissionSystem,
    showSkeleton,
    showTags,
    fixedHeader,
    sidebarLogo
  },

  mutations = {
    REMOVE_SKELENTON: (state) => {
      state.showSkeleton = false;
    },
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty (key)) {
        state[key] = value;
      }
    }
  },

  actions = {
    removeSkeleton({ commit }) {
      commit ('REMOVE_SKELENTON');
    },
    changeSetting({ commit }, data) {
      commit ('CHANGE_SETTING', data);
    }
  };

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
