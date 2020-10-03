import request from '@/utils/request'
// 业务办理
export function getobituary(query) {
  return request({
    url: '/obituary/common',
    method: 'get',
    params: query
  })
}
export function listobituary(data) {
  return request({
    url: '/obituary/list',
    method: 'post',
    data
  })
}
export function managerlist(query) {
  return request({
    url: '/manager/getlist',
    method: 'get',
    params: query
  })
}
export function performanceInfo(query) {
  return request({
    url: '/protocol/performanceInfo',
    method: 'get',
    params: query
  })
}

export function performanceAdd(data) {
  return request({
    url: '/protocol/performanceAdd',
    method: 'post',
    data
  })
}
export function villagelist(query) {
  return request({
    url: '/village/getlist',
    method: 'get',
    params: query
  })
}

export function getserver(query) {
  return request({
    url: '/servicescombo/services',
    method: 'get',
    params: query
  })
}
