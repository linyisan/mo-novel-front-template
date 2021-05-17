import request from '@/utils/request'

export function getBookshelf(id) {
  return request({
    url: `/bookshelf/get/${id}`,
    method: 'get'
  })
}

export function searchBookshelf(query) {
  return request({
    url: '/bookshelf/search',
    method: 'get',
    params: query
  })
}

export function addBookshelf(data) {
  return request({
    url: '/bookshelf/add',
    method: 'post',
    data: data
  })
}

export function editBookshelf(data) {
  return request({
    url: '/bookshelf/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookshelf(id) {
  return request({
    url: `/bookshelf/delete/${id}`,
    method: 'get'
  })
}

export function recommandByCategoriesPercent(id) {
  return request({
    url: `/bookshelf/recommandByCategoriesPercent/${id}`,
    method: 'get'
  })
}
