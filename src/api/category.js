import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:8089/category/list',
    method: 'get',
    params: query
  })
}

export function fetchCategory(id) {
  return request({
    url: '/category/detail',
    method: 'get',
    params: { id }
  })
}
