import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getPermission(token) {
  return request({
    url: `/zhjg/login/?id_token=${token}`,
    method: 'get'
  })
}

export function goPublic(url) {
  return request({
    url: `/zhjg/goToService/?urlParm=${url}`,
    method: 'get'
  })
}

