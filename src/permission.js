import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getPermission } from '@/api/user'
import Cookies from 'js-cookie'
import fa from "element-ui/src/locale/lang/fa"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

let once = true

let urlParse = function() {
  let url = window.location.href;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg)
  let tempArr
  if (arr) {
    arr.forEach((item) => {
      tempArr = item.substring(1).split('=');
    })
  }
  getPermission(tempArr[1]).then(res => {
    Cookies.set('permission', res.token)
    store.dispatch('user/login', {username: 'fgw', password: '99ec41f1dc48f4c6a018b688411b456d'}).then(() => {
      router.push('/')
    })
  }).catch(() => {
    console.log('error')
  })
}

router.beforeEach(async (to, from, next) => {
  // if(once){
  //   once = false
  //   urlParse()
  // }
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if(store.getters.addRoutes) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        next()
      }
    }else {
      store.dispatch('user/generateRoutes').then(data => {
        router.addRoutes(data)
        next({ ...to, replace: true })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
