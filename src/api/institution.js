import request from '@/utils/request'

export function institutionlist(data) {
  return request({
    url: '/institution/list',
    method: 'post',
    data
  })
}
export function institutionadd(data) {
  return request({
    url: '/institution/add',
    method: 'post',
    data
  })
}
export function institutionedit(data) {
  return request({
    url: '/institution/edit',
    method: 'post',
    data
  })
}
export function institutiondel(query) {
  return request({
    url: '/institution/del',
    method: 'get',
    params: query
  })
}
