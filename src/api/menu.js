import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/sys/menu/userMenuInfo',
    method: 'GET'
  })
}

export function getMenuInfo(data) {
  return request({
    url: '/sys/menu/list',
    method: 'GET',
    params:data
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/sys/menu/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function deleteMenus(data) {
  return request({
    url: '/sys/menu/delete',
    method: 'POST',
    data
  })
}

export function getMenuById(data) {
  return request({
    url: '/sys/menu/info',
    method: 'GET',
    params:data
  })
}
