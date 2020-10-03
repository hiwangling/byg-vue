import request from '@/utils/request'
// 统计
export function statscheck(data) {
  return request({
    url: '/statistics/check',
    method: 'post',
    data
  })
}
export function statscarsend(data) {
  return request({
    url: '/statistics/carsend',
    method: 'post',
    data
  })
}
export function statsobituary(data) {
  return request({
    url: '/statistics/obituary',
    method: 'post',
    data
  })
}
export function statscarmonth(data) {
  return request({
    url: '/statistics/carmonth',
    method: 'post',
    data
  })
}
export function statderate(data) {
  return request({
    url: '/statistics/derate',
    method: 'post',
    data
  })
}

export function statsunknown(data) {
  return request({
    url: '/statistics/unknown',
    method: 'post',
    data
  })
}
export function statservices(data) {
  return request({
    url: '/statistics/services',
    method: 'post',
    data
  })
}
export function statsservicesInfo(data) {
  return request({
    url: '/statistics/servicesInfo',
    method: 'post',
    data
  })
}
export function statsupplies(data) {
  return request({
    url: '/statistics/supplies',
    method: 'post',
    data
  })
}
export function statswreath(data) {
  return request({
    url: '/statistics/wreath',
    method: 'post',
    data
  })
}
export function statswreathList(data) {
  return request({
    url: '/statistics/wreathList',
    method: 'post',
    data
  })
}
export function excelobituary(data) {
  return request({
    url: '/statistics/excelobituary',
    method: 'post',
    data
  })
}

export function excelderateAll(data) {
  return request({
    url: '/statistics/excelderateAll',
    method: 'post',
    data
  })
}

export function excelderate(data) {
  return request({
    url: '/statistics/excelderate',
    method: 'post',
    data
  })
}

export function carsendper(data) {
  return request({
    url: '/carsend/per',
    method: 'post',
    data
  })
}
export function coldobituary(data) {
  return request({
    url: '/cold/obituary',
    method: 'post',
    data
  })
}
export function statisticsgather(data) {
  return request({
    url: '/statistics/gather',
    method: 'post',
    data
  })
}
export function statisticsuid(data) {
  return request({
    url: '/statistics/uid',
    method: 'post',
    data
  })
}
export function statisticspuid(data) {
  return request({
    url: '/statistics/puid',
    method: 'post',
    data
  })
}

export function obituarycount(query) {
  return request({
    url: '/obituary/count',
    method: 'get',
    params: query
  })
}

export function printorderlist(query) {
  return request({
    url: '/obituary/printorderlist',
    method: 'get',
    params: query
  })
}
export function printRenew(query) {
  return request({
    url: '/check/printRenew',
    method: 'get',
    params: query
  })
}
export function printCheck(query) {
  return request({
    url: '/check/printCheck',
    method: 'get',
    params: query
  })
}

export function printList(query) {
  return request({
    url: '/cabinet/printList',
    method: 'get',
    params: query
  })
}
export function financeList(data) {
  return request({
    url: '/statistics/financeList',
    method: 'post',
    data
  })
}
export function mournarrange(query) {
  return request({
    url: '/obituary_record/hall_list',
    method: 'get',
    params: query
  })
}
export function cold_list(query) {
  return request({
    url: '/obituary_record/cold_list',
    method: 'get',
    params: query
  })
}
