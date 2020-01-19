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

export function getInfo(data) {
  return request({
    url: '/sys/dep/info',
    method: 'GET',
    params:data
  })
}

export function updateDepInfo(data) {
  return request({
    url: '/sys/dep/save',
    method: 'POST',
    data
  })
}

export function deleteDep(data) {
  return request({
    url: '/sys/dep/delete',
    method: 'POST',
    data
  })
}

