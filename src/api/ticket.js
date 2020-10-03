import request from '@/utils/request'
// 花圈列表
// export function listwreath(data) {
//   return request({
//     url: 'http://byg.jiayubz.net/dp/v1/selfservice/list',
//     method: 'post',
//     data
//   })
// }

export function listwreath(query) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/selfservice/list',
    method: 'get',
    params: query
  })
}
export function setup(data) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/selfservice/setup',
    method: 'post',
    data
  })
}
export function selfservice(query) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/selfservice/info',
    method: 'get',
    params: query
  })
}
export function saveorder(data) {
  return request({
    url: 'http://byg.jiayubz.net/dp/v1/selfservice/order',
    method: 'post',
    data
  })
}

