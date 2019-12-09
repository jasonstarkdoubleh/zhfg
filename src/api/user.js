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

export function getUrl(url) {
  return request({
    url: `http://10.1.1.137:8081/fagaiwei_api/zhjg/login?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc4MzU2MzU1ODg3NTk5ODk3MTkifQ.eyJlbWFpbCI6bnVsbCwibmFtZSI6bnVsbCwibW9iaWxlIjpudWxsLCJvcGVuSWQiOm51bGwsImV4cCI6MTU2OTMzNTk2NCwianRpIjoiT2g4RHNybUg1dU9OZngyU1pXdG1kUSIsImlhdCI6MTU2OTMzNTM2NCwibmJmIjoxNTY5MzM1MzA0LCJzdWIiOiJmZ3cifQ.S5GsNzvasui-NS0Y3SLtN6Fz3bubB0lJuv8bzKFJvoh5fHdTwaER4y34k3d18bVOBq0St0N3ITmQVX7KF6zsAkTbx_7e2kuMP4T_CGyMRGAdF2eNh_4zgsNzEm3cXMXMgZ4yuzD-fFRqSGH7ip2kkt5-mhWb3sCOkosVrO8swO6VkPc5LNSvXbN0HRnvzh95cu8cfwEC8QHbMZ_EWoprCIQDEh4dLVDEv3RYiGFhthqCdH1nUPu3bUzuP_8s7qAWqH7N2l4oPr7CvIpSqNyY8u87tu7sBU4IF69fLj1nqR_y6sA6jV9L0zNsf3YEPUGsdl23voZNWvAcbHG-BGPUIQ`,
    method: 'get'
  })
}
