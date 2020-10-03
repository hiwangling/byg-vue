import request from '@/utils/request'
export function cremationlist(query) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/cremation/list',
    method: 'get',
    params: query
  })
}
export function protocolList(query) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/cremation/protocolList',
    method: 'get',
    params: query
  })
}
export function burydslist(query) {
  return request({
    url: 'http://gm.jiayubz.net/api/v1/bury/dslist',
    method: 'get',
    params: query
  })
}
export function canteenlist(query) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/cremation/canteen',
    method: 'get',
    params: query
  })
}

