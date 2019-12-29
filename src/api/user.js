import request from '@/utils/request'
const URL_PREFIX = '/account'
export function login(data) {
  return request({
    url: URL_PREFIX + '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: URL_PREFIX + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: URL_PREFIX + '/user/logout',
    method: 'post'
  })
}
