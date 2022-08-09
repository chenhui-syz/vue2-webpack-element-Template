import request from '@/utils/request';

// 生成token
export function generateToken(data) {
  return request ({
    url: '/oneid/authorize/generateToken',
    method: 'post',
    data
  });
}

// 刷新token
export function refreshToken(data) {
  return request ({
    url: '/oneid/authorize/refreshToken',
    method: 'post',
    data
  });
}

// 获取配置信息
export function getConfig(data) {
  return request ({
    url: '/oneid/authorize/config/get',
    method: 'post',
    data
  });
}

// 获取用户信息
export function getUserInfo(data) {
  return request ({
    url: '/authorization/user/get',
    method: 'post',
    data
  });
}

// 查询用户列表
export function getUserList(data) {
  return request ({
    url: '/user/query',
    method: 'post',
    data
  });
}

// 查询组织架构列表
export function getOrganizationList(data) {
  return request ({
    url: '/organization/query',
    method: 'post',
    data
  });
}
