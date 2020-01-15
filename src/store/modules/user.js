import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,constantRouterMap,asyncRouterMap } from '@/router'
import Layout from '@/layout'

const _import = require('../../router/_import_' + process.env.NODE_ENV)

const test = [{
  path: '/secondpage',
  component: 'Layout',
  redirect: '/secondpage/index',
  children: [{
    path:'index',
    component: 'secondpage',
    meta: { title: '商品总览', icon: '' },
  }]
}]

function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  menu: [],
  routes: constantRouterMap
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRouterMap.concat(routes)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  generateRoutes({ commit, state }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRouter(state.menu)
      commit('SET_ROUTES',accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password ).then(response => {
        commit('SET_TOKEN', response.token)
        commit('SET_MENU',response.menu)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }, name) {
    return new Promise((resolve => {
      commit('SET_NAME', name)
      resolve()
    }))
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

