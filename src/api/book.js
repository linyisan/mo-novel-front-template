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

export function listClickRank() {
  return request({
    url: '/book/listClickRank',
    method: 'get'
  })
}

export function listNewRank() {
  return request({
    url: '/book/listNewRank',
    method: 'get'
  })
}

export function listUpdateRank() {
  return request({
    url: '/book/listUpdateRank',
    method: 'get'
  })
}
