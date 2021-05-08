import request from '@/utils/request'

export function getBookshelf(id) {
  return request({
    url: `/get/${id}`,
    method: 'get'
  })
}

export function searchBookshelf(query) {
  return request({
    url: '/search',
    method: 'get',
    params: query
  })
}

export function addBookshelf(data) {
  return request({
    url: '/add',
    method: 'post',
    data: data
  })
}

export function editBookshelf(data) {
  return request({
    url: '/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookshelf(id) {
  return request({
    url: `/delete/${id}`,
    method: 'get'
  })
}

