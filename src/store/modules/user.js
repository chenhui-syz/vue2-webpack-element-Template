import { clearTokenAndTTL, getAccessToken, getRefreshToken, setAccessToken, setAccessTokenTTL, setRefreshToken } from '@/utils/auth';
import { generateToken, getConfig, getUserInfo, refreshToken } from '@/api/user';

const state = {
    accessToken: getAccessToken (),
    refreshToken: getRefreshToken (),
    accessTokenTTL: '',
    realName: '',
    avatar: '',
    userMenu: '',
    config: {},
    prePage: ''
  },

  mutations = {
    SET_ACCESS_TOKEN: (state, token) => {
      state.accessToken = token;
    },
    SET_REFRESH_TOKEN: (state, token) => {
      state.refreshToken = token;
    },
    SET_ACCESS_TOKEN_TTL: (state, ttl) => {
      state.accessTokenTTL = ttl;
    },
    SET_NAME: (state, realName) => {
      state.realName = realName;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_USER_MENU: (state, menu) => {
      state.userMenu = menu;
    },
    SET_CONFIG: (state, item) => {
      state.config = item;
    },
    SET_PRE_PAGE: (state, prePage) => {
      state.prePage = prePage;
    }
  },

  actions = {
  // 生成token
    generateToken({ commit }, data) {
      return new Promise ((resolve, reject) => {
        generateToken (data).then ((res) => {
          if (res.item.accessToken) {
            commit ('SET_ACCESS_TOKEN', res.item.accessToken);
            commit ('SET_REFRESH_TOKEN', res.item.refreshToken);
            commit ('SET_ACCESS_TOKEN_TTL', new Date ().getTime () + (res.item.accessTokenTTL / 2) * 1000);
            setAccessToken (res.item.accessToken);
            setRefreshToken (res.item.refreshToken);
            setAccessTokenTTL (new Date ().getTime () + (res.item.accessTokenTTL / 2) * 1000);
          }
          resolve (res);
        }).catch (error => {
          reject (error);
        });
      });
    },

    // 刷新token
    refreshToken({ commit }, data) {
      return new Promise ((resolve, reject) => {
        refreshToken (data).then ((res) => {
          if (res.item.accessToken) {
            commit ('SET_ACCESS_TOKEN', res.item.accessToken);
            commit ('SET_REFRESH_TOKEN', res.item.refreshToken);
            commit ('SET_ACCESS_TOKEN_TTL', new Date ().getTime () + (res.item.accessTokenTTL / 2) * 1000);
            setAccessToken (res.item.accessToken);
            setRefreshToken (res.item.refreshToken);
            setAccessTokenTTL (new Date ().getTime () + (res.item.accessTokenTTL / 2) * 1000);
          }
          resolve (res);
        }).catch (error => {
          reject (error);
        });
      });
    },

    // 移除token
    resetToken({ commit }) {
      return new Promise (resolve => {
        commit ('SET_ACCESS_TOKEN', '');
        commit ('SET_REFRESH_TOKEN', '');
        commit ('SET_ACCESS_TOKEN_TTL', '');
        clearTokenAndTTL ();
        resolve ();
      });
    },

    // 获取配置
    getConfig({ commit }, data) {
      return new Promise ((resolve, reject) => {
        getConfig (data).then (response => {
          commit ('SET_CONFIG', response.item || {});
          resolve (response.item);
        }).catch (error => {
          reject (error);
        });
      });
    },

    // 获取用户信息
    getUserInfo({ commit }, data) {
      return new Promise ((resolve, reject) => {
        getUserInfo (data).then (response => {
          const { loginInformation } = response.item;

          if (!loginInformation) {
            reject ('验证失败，请重新登录');
          }

          const { realName, avatarUrl, functionList } = loginInformation;

          commit ('SET_NAME', realName);
          commit ('SET_AVATAR', avatarUrl);
          commit ('SET_USER_MENU', functionList);
          resolve (response.item);
        }).catch (error => {
          reject (error);
        });
      });
    },

    // 记录上一页url
    setPrePage({ commit }, data) {
      return new Promise (resolve => {
        commit ('SET_PRE_PAGE', data);
        resolve ();
      });
    }
  };

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
