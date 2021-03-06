import request from '@/utils/request'

export function getRoleInfo(data) {
  return request({
    url: '/sys/role/list',
    method: 'GET',
    params:data
  })
}
export function getRoleById(data) {
  return request({
    url: '/sys/role/roleInf',
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

export function deleteRoles(data) {
  return request({
    url: '/sys/role/delete',
    method: 'POST',
    data
  })
}

//菜单信息
export function rolePerm(data) {
  return request({
    url: `/sys/role/rolePerm?roleId=${data}`,
    method: 'GET'
  })
}

//保存菜单信息
export function authority(data) {
  return request({
    url: `/sys/role/authority`,
    method: 'post',
    data
  })
}

