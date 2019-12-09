import request from '@/utils/request'

export function getRoleInfo(data) {
  return request({
    url: '/sys/role/list',
    method: 'GET',
    params:data
  })
}

export function getRole() {
  return request({
    url: '/sys/role/getRole',
    method: 'GET'
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role/info',
    method: 'post',
    data
  })
}
