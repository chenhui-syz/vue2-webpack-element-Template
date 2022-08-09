import request from '@/utils/request';

// 获取日志管理列表
export function getLogList(data) {
  return request ({
    url: '/common/log/query',
    method: 'post',
    data
  });
}
