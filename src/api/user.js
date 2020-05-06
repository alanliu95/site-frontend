import request from '@/utils/request'
const ACCOUNT_PREFIX = '/account'
const AUTH_PREFIX = '/auth'

const grant_type='password'
const client_id='client1'
const client_secret='123123'
// export function login(data) {
//   data.grant_type=grant_type
//   data.client_id=client_id
//   data.client_secret=client_secret
//   return request({
//     url: AUTH_PREFIX + '/oauth/token',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: ACCOUNT_PREFIX + '/login',
    method: 'post',
    data
  })
}

// export function login(data) {
//   return new Promise((resolve, reject) => {
//     console.info('login')
//     resolve({code:200,msg:null,data:"123456"})
//   })
// }

export function getInfo(token) {
  return request({
    url: ACCOUNT_PREFIX + '/user/detail',
    method: 'get',
    params: { token }
  })
}
export function getUsersByPage(page) {
  return request({
    url: ACCOUNT_PREFIX + '/user/all',
    method: 'get',
    params: page
  })
}

export function logout() {
  // return request({
  //   url: URL_PREFIX + '/user/logout',
  //   method: 'post'
  // })
  return new Promise((resolve, reject) => {
    console.info('logout')
    resolve()
  })
}
