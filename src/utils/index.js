
import router from '@/router';
import store from '@/store';

/**
 * 跳转OneID登录页
 * @returns {null}
 */
export function goLoginPage() {
  window.location.href = store.getters.oneIdOauthUrl + '?appID=' + store.getters.oneIdAppId + '&redirectUri=' + encodeURIComponent (window.location.href) + '&responseType=code&state=';
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (!time || arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}';
  let date;

  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && /^[0-9]+$/.test (time)) {
      time = parseInt (time);
    }
    if ((typeof time === 'number') && (time.toString ().length === 10)) {
      time = time * 1000;
    }
    date = new Date (time);
  }
  const formatObj = {
      y: date.getFullYear (),
      m: date.getMonth () + 1,
      d: date.getDate (),
      h: date.getHours (),
      i: date.getMinutes (),
      s: date.getSeconds (),
      a: date.getDay ()
    },
    timeStr = format.replace (/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      // Note: getDay() returns 0 on Sunday

      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      return value.toString ().padStart (2, '0');
    });

  return timeStr;
}


// 返回上一页
export const goPreviousPage = (level = -1) => {
  if (!store.state.user.prePage || store.state.user.prePage === '/') {
    router.replace ('/');
  } else {
    router.go (level);
  }
};
