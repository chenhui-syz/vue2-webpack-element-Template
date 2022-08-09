import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/directive'; // 全局自定义指令
import '@/permission'; // 权限控制
import '@/icons'; // icon图标
import '@/styles/index.scss'; // 全局样式

import * as filters from './filters'; // 全局过滤器

import App from './App';
import ElementUI from 'element-ui';
import Vue from 'vue';
import dayjs from 'dayjs'; // 处理时间和日期的库
import router from './router';
import store from './store';

// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV !== 'production') {
//   mockXHR()
// }

Vue.use (ElementUI, {
  size: 'small' // [medium / small / mini]
});

// 注册全局过滤器filters
Object.keys (filters).forEach (key => {
  Vue.filter (key, filters[key]);
});

Vue.config.productionTip = false;

Vue.prototype.dayjs = dayjs;

new Vue ({
  el: '#app',
  router,
  store,
  render: h => h (App)
});
