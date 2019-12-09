import request from '@/utils/request'

export function getUserDepInfo() {
  return request({
    url: '/sys/dep/userDepInfo',
    method: 'GET'
  })
}

export function getDepInfo(data) {
  return request({
    url: '/sys/dep/list',
    method: 'GET',
    params:data
  })
}
