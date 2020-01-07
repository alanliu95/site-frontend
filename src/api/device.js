import request from '@/utils/request'

const ASSET_URL_PREFIX = '/asset'
const EVENT_URL_PREFIX = '/event'

export function getTarSiteDevices(siteId) {
  return request({
    url: ASSET_URL_PREFIX + '/devices/detail',
    method: 'get',
    params: {
      siteId: siteId
    }
  })
}

export function getTarSiteDeviceStatus(siteId) {
  return request({
    url: EVENT_URL_PREFIX + '/online',
    method: 'get',
    params: {
      siteId: siteId
    }
  })
}


