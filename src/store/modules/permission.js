import Layout from '@/layout';
import { cloneDeep } from 'lodash';
import { constantRoutes } from '@/router';
import { menuConfig } from '@/config';
import path from 'path';

/*
* 构造树形菜单
* @param {Array} data 需要处理的扁平数组
* @param {String} pid 父级id
* @return
* */
const toTreeData = (data, pid) => {
    const tree = (id) => {
      let arr = [];

      data.filter (item => {
        return item.own && (item.parentID === id);
      }).forEach (item => {
        arr.push ({
          id: item.functionID,
          code: item.functionCode,
          title: item.functionName,
          path: item.url,
          key: item.functionCode,
          parentId: item.parentID,
          type: item.functionType,
          children: tree (item.functionID),
          meta: {}
        });
      });
      return arr;
    };

    return tree (pid);
  },

  /*
* 构造路由数据结构
* @param {Array} tree 需要处理的树形数据结构
* @param {Object} config 映射配置
* @return
* */
  toRouteData = (tree, config) => {
    let noLayoutArr = [];

    const refactorTree = (list, parent) => {
      let arr = [];

      list.map (item => {
      // 必须要有config映射关系
        if (config[item.code]) {
          let configObj = {};

          switch (item.type) {
          case 'MENU':
            configObj = {
              ...item,
              component: config[item.code].component || Layout,
              name: config[item.code].name,
              redirect: config[item.code].redirect,
              alwaysShow: Boolean (config[item.code].alwaysShow),
              meta: {
                title: item.title,
                icon: config[item.code].icon,
                watermark: config[item.code].meta&&config[item.code].meta.watermark? config[item.code].meta.watermark : false
              },
              children: item.children ? refactorTree (item.children, item) : [],
              hidden: Boolean (config[item.code].hidden)
            };
            break;
          case 'PAGE':
            configObj = {
              ...item,
              component: config[item.code].component,
              name: config[item.code].name,
              meta: {
                title: item.title,
                activeMenu: parent.path,
                noCache: config[item.code].noCache,
                breadcrumb: config[item.code].breadcrumb,
                btnPermission: item.children.map (button => button.code),
                watermark: config[item.code].meta&&config[item.code].meta.watermark? config[item.code].meta.watermark : false
              },
              children: [],
              hidden: Boolean (config[item.code].hidden)
            };
            break;
          default:
            break;
          }

          // 无Layout配置
          if (config[item.code].noLayout) {
            noLayoutArr.push (configObj);
            return;
          }
          arr.push (configObj);
        }
      });

      return arr;
    };

    let routeData = refactorTree (tree, {});

    routeData.map (item => {
      if (item.children[0] && item.children[0].redirect) {
        item.redirect = item.children[0].redirect;
      }
    });
    routeData.length && routeData.unshift ({ path: '/', redirect: routeData[0].redirect, hidden: true });
    routeData.push ({ path: '*', redirect: '/404', hidden: true });

    return [...routeData, ...noLayoutArr];
  },

  /*
* 构造扁平二级路由
* @param {Array} route 路由
* @return
* */
  toFlatRouteData = (route) => {

    const formatRouter = (routes, basePath = '/', list = [], parent) => {
        routes.map (item => {
          item.path = path.resolve (basePath, item.path);
          const meta = item.meta || {};

          if (!meta.parent && parent) {
            meta.parent = parent.path;
            item.meta = meta;
          }
          if (item.redirect) {
            item.redirect = path.resolve (basePath, item.redirect);
          }
          if (item.children && item.children.length > 0) {
            const arr = formatRouter (item.children, item.path, list, item);

            delete item.children;
            list.concat (arr);
          }
          list.push (item);
        });
        return list;
      },

      getFlatRoutes = (routes) => {
        return routes.map ((child) => {
          if (child.children && child.children.length > 0) {
            child.children = formatRouter (child.children, child.path, [], child);
          }
          return child;
        });
      };

    return getFlatRoutes (cloneDeep (route));
  },

  state = {
    routes: [],
    addRoutes: []
  },

  mutations = {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat (routes);
    }
  },

  actions = {
    generateRoutes({ commit }, pageList) {
      return new Promise (resolve => {
        const treeData = toTreeData (pageList, ''),
          routeData = toRouteData (treeData, menuConfig ()),
          flatRouteData = toFlatRouteData (routeData);

        commit ('SET_ROUTES', routeData);
        resolve (flatRouteData);
      });
    }
  };

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
