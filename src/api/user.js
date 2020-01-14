import request from '@/utils/request'

export function login(data1,data2) {
  return request({
    url: `/zhjg/login/${data1}?userPass=${data2}`,
    method: 'get',
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserInfo(data) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params:data
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
