import request from '@/utils/request'

export function getAllBookSetting() {
  return request({
    url: '/booksetting/getAll',
    method: 'get'
  })
}
