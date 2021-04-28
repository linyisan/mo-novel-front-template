import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:8089/book/searchByPage',
    method: 'get',
    params: query
  })
}

export function fetchBook(id) {
  return request({
    url: '/book/detail',
    method: 'get',
    params: { id }
  })
}
