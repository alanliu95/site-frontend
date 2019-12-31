import request from '@/utils/request'

const URL_PREFIX = '/asset'

export function getAllSites() {
  return request({
    url: URL_PREFIX + '/sites',
    method: 'get'
  })
}
