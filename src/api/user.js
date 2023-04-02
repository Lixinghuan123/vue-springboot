import request from '@/utils/request'
//登录接口
export function login(data) {
  return request({
    //request是从'@/utils/request'导入，最终以axios方式发出请求
    url: '/login',
    //向那里发送请求
    method: 'post',
    data
    //所有的请求都会被mock拦截下来
  })
}
//获取用户信息接口
export function getInfo(token) {
  return request({
    //request是从'@/utils/request'导入，最终以axios方式发出请求
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}
//退出登录接口
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
