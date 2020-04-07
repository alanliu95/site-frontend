import request from '@/utils/request'

const URL_PREFIX = '/account'
// export function login(data) {
//   return request({
//     url: URL_PREFIX + '/login',
//     method: 'post',
//     data
//   })
// }

// export const findPage = (data) => {
//   return axios({
//     url: '/user/findPage',
//     method: 'post',
//     data
//   })
// }

// export function userFindPage(RequestPage) {
//   return request({
//     url: URL_PREFIX + '/user/info',
//     method: 'get',
//     params: { RequestPage }
//   })
// }
/*
* {"pageNum":1,"pageSize":10,"totalSize":60,"content":[{"id":1,"name":"kitty1","password":"9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d","salt":"YzcmCZNvbXocrsz9dm8e","email":"kitty1@qq.com","mobile":"18688982323","status":1,"deptId":13,"deptName":"市场部","createBy":"admin","createTime":"2018-09-14 12:12:12"},
*
* */
let template = {
  "pageNum": 1,
  "pageSize": 10,
  "totalSize": 60,
  "content": [{
    "id": 1,
    "name": "kitty1",
    "password": "9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d",
    "salt": "YzcmCZNvbXocrsz9dm8e",
    "email": "kitty1@qq.com",
    "mobile": "18688982323",
    "status": 1,
    "deptId": 13,
    "deptName": "市场部",
    "createBy": "admin",
    "createTime": "2018-09-14 12:12:12"
  }]
}

export function userFindPage(params) {
  let findPageData = {
    "code": 200,
    "msg": null,
    "data": {}
  }
  let pageNum = 1
  let pageSize = 10
  if (params !== null) {
    // pageNum = params.pageNum
  }
  if (params !== null) {
    // pageSize = params.pageSize
  }
  let content = getContent(pageNum, pageSize)
  findPageData.data.pageNum = pageNum
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = 60
  findPageData.data.content = content
  return findPageData;
}

export function getContent(pageNum, pageSize) {
  let content = []
  for (let i = 0; i < pageSize; i++) {
    let obj = {}
    let index = ((pageNum - 1) * pageSize) + i + 1
    obj.id = index
    obj.name = 'kitty' + index
    obj.password = '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d'
    obj.salt = 'YzcmCZNvbXocrsz9dm8e'
    obj.email = 'kitty' + index + '@qq.com'
    obj.mobile = '18688982323'
    obj.status = 1
    obj.deptId = 12
    obj.deptName = '技术部'
    obj.status = 1
    if (i % 2 === 0) {
      obj.deptId = 13
      obj.deptName = '市场部'
    }
    obj.createBy = 'admin'
    obj.createTime = '2018-08-14 11:11:11'
    obj.createBy = 'admin'
    obj.createTime = '2018-09-14 12:12:12'
    content.push(obj)
  }
  return content
}
