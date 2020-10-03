import request from '@/utils/request'

export function institutionlist(data) {
  return request({
    url: 'http://gm.jiayubz.net/weixin/v1/institution/list',
    method: 'post',
    data
  })
}
export function institutionadd(data) {
  return request({
    url: 'http://gm.jiayubz.net/weixin/v1/institution/add',
    method: 'post',
    data
  })
}
export function institutionedit(data) {
  return request({
    url: 'http://gm.jiayubz.net/weixin/v1/institution/edit',
    method: 'post',
    data
  })
}
export function institutiondel(query) {
  return request({
    url: 'http://gm.jiayubz.net/weixin/v1/institution/del',
    method: 'get',
    params: query
  })
}
