import request from '@/utils/request'

export function getRating(id) {
  return request({
    url: `/rating/get/${id}`,
    method: 'get'
  })
}

export function searchRating(query) {
  return request({
    url: '/rating/search',
    method: 'get',
    params: query
  })
}

export function addRating(data) {
  return request({
    url: '/rating/add',
    method: 'post',
    data: data
  })
}

export function editRating(data) {
  return request({
    url: '/rating/edit',
    method: 'post',
    data: data
  })
}

export function deleteRating(id) {
  return request({
    url: `/rating/delete/${id}`,
    method: 'get'
  })
}

