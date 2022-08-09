import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import getters from './getters';
import permission from './modules/permission';
import settings from './modules/settings';
import tagsView from './modules/tagsView';
import user from './modules/user';

Vue.use (Vuex);

const store = new Vuex.Store ({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  getters
});

export default store;
