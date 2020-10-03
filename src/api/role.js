import request from '@/utils/request'

export function listRole(query) {
  return request({
    url: '/branch/list',
    method: 'post',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/branch/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/branch/edit',
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/branch/del',
    method: 'get',
    params: data
  })
}

export function getPermission(query) {
  return request({
    url: '/auth_rule/all',
    method: 'get',
    params: query
  })
}
export function getPermissions(query) {
  return request({
    url: '/auth_rule/alls',
    method: 'get',
    params: query
  })
}
export function updatePermission(data) {
  return request({
    url: '/branch/auth',
    method: 'post',
    data
  })
}

export function roleOptions(query) {
  return request({
    url: '/branch/all_name',
    method: 'post',
    params: query
  })
}
export function auth_rulelist(data) {
  return request({
    url: '/auth_rule/list',
    method: 'post',
    data
  })
}
export function auth_ruleadd(data) {
  return request({
    url: '/auth_rule/add',
    method: 'post',
    data
  })
}
export function auth_ruleedit(data) {
  return request({
    url: '/auth_rule/edit',
    method: 'post',
    data
  })
}
export function auth_ruledel(query) {
  return request({
    url: '/auth_rule/del',
    method: 'get',
    params: query
  })
}
export function deptdel(query) {
  return request({
    url: '/dept/del',
    method: 'get',
    params: query
  })
}
export function deptlist(data) {
  return request({
    url: '/dept/list',
    method: 'post',
    data
  })
}
export function deptadd(data) {
  return request({
    url: '/dept/add',
    method: 'post',
    data
  })
}
export function deptedit(data) {
  return request({
    url: '/dept/edit',
    method: 'post',
    data
  })
}
