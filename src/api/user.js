import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}
export function updatePwd(data) {
  return request({
    url: '/auth/updatePwd',
    method: 'post',
    data: data
  })
}

export function getCodeImg() {
  return request({
    url: '/auth/code',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: data
  })
}

export function getUser(id) {
  return request({
    url: `/user/get/${id}`,
    method: 'get'
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: data
  })
}
