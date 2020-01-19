import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = "application/json;charset=utf-8";
    config.headers['token'] = Cookies.get('TokenKey') || '';
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      console.log(`错误信息:${res.msg},错误代码:${res.code}` || '响应内容无效')
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('您已注销，您可以取消以停留在此页或重新登录', '确认注销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject('666')
      }
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: "服务器没档期了,请稍后再试~",
      type: 'warning',
      duration: 1000
    })
    return Promise.reject(error)
  }
)

export default service
