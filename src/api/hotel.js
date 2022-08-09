import request from '@/utils/request';

// 查询酒店列表
export function getHotelList(data) {
  return request ({
    url: '/hotel/basis/query',
    method: 'post',
    data
  });
}
