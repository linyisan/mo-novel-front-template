import request from '@/utils/request'

export function getNotice(id) {
  return request({
    url: `/notice/get/${id}`,
    method: 'get'
  })
}

export function searchNotice(query) {
  return request({
    url: '/notice/search',
    method: 'get',
    params: query
  })
}

