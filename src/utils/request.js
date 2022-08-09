import { getAccessToken, getAccessTokenTTL, getRefreshToken } from '@/utils/auth';
import { Message } from 'element-ui';
import axios from 'axios';
import { goLoginPage } from '@/utils';
import store from '@/store';

let isRefreshing = false, // 是否正在刷新token
  requests = []; // 请求队列

const exculdeUrls = ['/oneid/authorize/generateToken', '/oneid/authorize/refreshToken', '/oneid/authorize/config/get'];

function checkExculdeUrls(url) {
  let flag = false;

  exculdeUrls.map (item => {
    if (url.indexOf (item) >= 0) {
      flag = true;
    }
  });
  return flag;
}

function noTokenData() {
  return !getAccessToken () || !getRefreshToken () || !getAccessTokenTTL ();
}

const service = axios.create ({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 10000
});

service.interceptors.request.use (
  config => {
    // 不需要验证token的接口
    if (checkExculdeUrls (config.url)) {
      return config;
    }

    // 接入oneID系统
    if (store.state.settings.useOneIDSystem) {
      // token数据丢失
      if (noTokenData ()) {
        goLoginPage ();
      }

      if (new Date ().getTime () >= getAccessTokenTTL ()) {
        // accessToken失效，接口放入队列，并刷新token
        if (!isRefreshing) {
          isRefreshing = true;
          const sData = {
            appID: store.getters.oneIdAppId,
            refreshToken: getRefreshToken (),
            timestamp: new Date ().getTime (),
            version: '1.0'
          };

          store.dispatch ('user/refreshToken', sData).then (res => {
            isRefreshing = false;
            return res.item.accessToken;
          }).then (token => {
            requests.forEach (cb => cb (token));
            requests = [];
          }).catch (err => {
            isRefreshing = false;
          });
        }
        const retryOriginalRequest = new Promise ((resolve) => {
          requests.push ((token) => {
            config.headers['Authorization'] = token;
            resolve (config);
          });
        });

        return retryOriginalRequest;
      }
      // accessToken有效
      const token = getAccessToken ();

      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;

    }

    return config;
  },
  error => {
    return Promise.reject (error);
  }
);

service.interceptors.response.use (
  response => {
    // 返回100209 无角色权限
    if (response.data.code === 100209) {
      window.location.href = '/401';
      return Promise.reject (response.data.message || '服务器异常');
    }
    // 处理文件下载
    const disposition = response.headers['content-disposition'];

    if (disposition && disposition.indexOf ('attachment') !== -1) {
      return response;
    }
    return response.data;
  },
  error => {
    if (error.response && error.response.data) {
      // 接入oneID系统
      if (store.state.settings.useOneIDSystem) {
        switch (error.response.data.code) {
        case 910005: // 返回910005 缺失accessToken
        case 910006: // 返回910006 获取SESSIONID失败
        case 910007: // 返回910007 accessToken过期
        case 910008: // 返回910008 找不到ONEID用户信息
        case 910009: // 返回910007 refreshToken过期
          goLoginPage ();
          break;
        default:
          Message.error (error.response.data.message || error.message);
        }
      } else {
        Message.error (error.response.data.message || error.message);
      }
    } else {
      Message.error (error.message);
    }

    return Promise.reject (error);
  }
);

export default service;
