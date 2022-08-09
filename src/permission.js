import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import { getAccessToken } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';
import { goLoginPage } from '@/utils';
import router from './router';
import store from './store';
import stringify from 'qs-stringify';

NProgress.configure ({ showSpinner: false });

// 移除多余的query参数
const removeUselessQuery = (query) => {
    let uselessKeys = ['code', 'responseStatus', 'state'],
      querys = JSON.parse (JSON.stringify (query));

    uselessKeys.map (key => delete querys[key]);
    return stringify (querys) ? `?${stringify (querys)}` : '';
  },

  // 判断是否有页面权限
  checkUrlPermission = (path, pageList) => {
    let hasPermission = true;

    pageList.map (item => {
      if (item.url === path && !item.own) {
        hasPermission = false;
      }
    });
    return hasPermission;
  },

  // 白名单
  WHITE_LIST = ['/401'];

router.beforeEach (async (to, from, next) => {
  NProgress.start ();

  document.title = getPageTitle (to.meta.title);

  // 路由白名单直接渲染
  if (WHITE_LIST.indexOf (to.path) !== -1) {
    // 白名单
    next ();
    return;
  }

  // 不接入OneID系统
  if (!store.state.settings.useOneIDSystem) {
    next ();
    return;
  }

  // 如果没有AppID，则先获取配置信息
  if (!store.getters.oneIdAppId) {
    await store.dispatch ('user/getConfig', {});
  }

  if (to.query) {
    if (to.query.responseStatus == 100181) {
      // 权限审批中
      next ({ path: '/401' });
      return;
    } else if (to.query.code) {
      // 如果url上带有code，则需要生成token
      const query = removeUselessQuery (to.query),
        sData = {
          appID: store.getters.oneIdAppId,
          code: to.query.code,
          redirectUri: window.location.origin + window.location.pathname + query,
          timestamp: new Date ().getTime (),
          version: '1.0'
        },
        result = await store.dispatch ('user/generateToken', sData);

      if (result.item.accessToken) {
        router.replace (to.path + query); // 去掉url上的多余参数
      }
      return;
    }
  }

  const token = getAccessToken ();

  if (token) {
    // 记录上一页路径
    store.dispatch ('user/setPrePage', from.fullPath);
    // 有token
    if (!store.state.settings.usePermissionSystem) {
      // 不接入权限系统
      next ();
    } else if (store.getters.routes && store.getters.routes.length > 0) {
      // 已经生成路由
      next ();
    } else {
      // 获取用户信息
      try {
        const { loginInformation } = await store.dispatch ('user/getUserInfo', {}),
          pageList = loginInformation.functionList;

        if (pageList.length) {
          const accessRoutes = await store.dispatch ('permission/generateRoutes', pageList);

          router.options.routes = accessRoutes;
          router.addRoutes (accessRoutes);

          if (checkUrlPermission (to.path, pageList)) {
            next ({ ...to, replace: true });
          } else {
            next ({ path: '/401' });
          }
        } else {
          next ({ path: '/401' });
        }
      } catch (error) {
        Message.error (error || '服务器异常');
        NProgress.done ();
      }
    }
  } else {
    // 无token
    goLoginPage ();
    NProgress.done ();
  }
});

router.afterEach (() => {
  NProgress.done ();
  // 移除骨架屏
  if (store.state.settings.showSkeleton) {
    store.dispatch ('settings/removeSkeleton');
  }
});
