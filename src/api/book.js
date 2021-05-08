import request from '@/utils/request'

export function searchBook(query) {
  return request({
    url: '/book/search',
    method: 'get',
    params: query
  })
}

export function getBook(id) {
  return request({
    url: `/book/get/${id}`,
    method: 'get'
  })
}
