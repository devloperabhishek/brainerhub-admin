import request from '../utils/request'

export function loginByEmail(data) {
    return request({
      url: '/admin/auth/signin',
      method: 'post',
      data
    })
  }
  