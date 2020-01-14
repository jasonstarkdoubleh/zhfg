import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,constantRouterMap } from '@/router'
import Layout from '@/layout'


const asyncRouterMap = [
  //商品总览
  {
    path: '/secondpage',
    component: Layout,
    redirect: '/secondpage/index',
    children: [{
      path:'index',
      component: () => import('@/views/secondpage'),
      meta: { title: '商品总览', icon: '' },
    }]
  },

  //预警展示
  {
    path: '/warningshow',
    component: Layout,
    redirect: '/warningshow/index',
    children: [{
      path:'index',
      component: () => import('@/views/warningshow'),
      meta: { title: '预警展示', icon: '' },
    }]
  },

  //多维分析
  {
    path: '/analyses',
    component: Layout,
    redirect: '/analyses/index',
    children: [{
      path:'index',
      component: () => import('@/views/analyses'),
      meta: { title: '多维分析', icon: '' },
    }]
  },

  //预测分析
  {
    path: '/divine',
    component: Layout,
    redirect: '/divine/index',
    children: [{
      path:'index',
      component: () => import('@/views/divine'),
      meta: { title: '预测分析', icon: '' },
    }]
  },


  //价格监测系统
  {
    path: '/pricewatch',
    component: Layout,
    redirect: '/pricewatch/pricewarning',
    meta: { title: '价格分析', icon: 'dashboard' },
    children: [
      //价格预警
      {
        path: 'pricewarning',
        component: () => import('@/views/pricewarning'),
        redirect: '/pricewarning/pricewarningconfig',
        meta: { title: '价格预警' },
        children: [
          {
            path: 'pricewarningconfig',
            component: () => import('@/views/pricewarning/pricewarningconfig'),
            meta: { title: '价格预警配置' },
            children:[
              {
                path: 'warningconfig',
                name: 'Warningconfig',
                component: () => import('@/views/pricewarning/pricewarningconfig/warningconfig'),
                meta: { title: '预警配置' },
              },
              {
                path: 'goodsconfig',
                name: 'Goodsconfig',
                component: () => import('@/views/pricewarning/pricewarningconfig/goodsconfig'),
                meta: { title: '商品配置' }
              }
            ]
          },
          {
            path: 'pricewarningresult',
            name: 'Pricewarningresult',
            component: () => import('@/views/pricewarning/pricewarningresult'),
            meta: { title: '价格预警结果' }
          }
        ]
      },

      //价格分析
      {
        path: 'priceanalyse',
        component: () => import('@/views/priceanalyse'),
        redirect: '/priceanalyse/censusanalyse',
        meta: { title: '价格分析' },
        children: [
          {
            path: 'censusanalyse',
            component: () => import('@/views/priceanalyse/censusanalyse'),
            meta: { title: '统计分析' },
            children:[
              {
                path: 'trendanalyse',
                name: 'Trendanalyse',
                component: () => import('@/views/priceanalyse/censusanalyse/trendanalyse'),
                meta: { title: '趋势分析' }
              },
              {
                path: 'multidimensionalanalyse',
                name: 'Multidimensionalanalyse',
                component: () => import('@/views/priceanalyse/censusanalyse/multidimensionalanalyse'),
                meta: { title: '多维分析' }
              },
              {
                path: 'macrographyanalyse',
                name: 'Macrographyanalyse',
                component: () => import('@/views/priceanalyse/censusanalyse/macrographyanalyse'),
                meta: { title: '宏观趋势分析' }
              }
            ]
          },
          {
            path: 'correlationanalyse',
            name: 'Correlationanalyse',
            component: () => import('@/views/priceanalyse/correlationanalyse'),
            meta: { title: '相关性分析' }
          },
          {
            path: 'causeanalyse',
            name: 'Causeanalyse',
            component: () => import('@/views/priceanalyse/causeanalyse'),
            meta: { title: '因果分析' }
          }
        ]
      },

      //价格预测
      {
        path: 'resultshow',
        name: 'Resultshow',
        component: () => import('@/views/forecasting/resultshow'),
        meta: { title: '价格预测' },
      },
    ]
  },


  //舆情系统
  {
    path: '/pubilcsystem',
    component: Layout,
    redirect: '/pubilcsystem/index',
    children: [{
      path:'index',
      component: () => import('@/views/pubilcsystem'),
      meta: { title: '舆情系统', icon: 'example' },
    }]
  },

  //在线调研
  {
    path: '/onlineSurveySystem',
    component: Layout,
    redirect: '/onlineSurveySystem/index',
    children: [{
      path:'index',
      component: () => import('@/views/onlineSurveySystem'),
      meta: { title: '在线调研', icon: 'eye' },
    }]
  },

  //分析报告
  {
    path: '/analysereportconfig',
    component: Layout,
    redirect: '/analysereportconfig/reportproduceconfig',
    meta: { title: '分析报告', icon: 'eye-open' },
    children: [
      //分析报告配置
      {
        path: 'reportproduceconfig',
        name: 'Reportproduceconfig',
        component: () => import('@/views/analysereportconfig/reportproduceconfig'),
        meta: { title: '报告生成配置' },
      },

      //分析报告查看
      {
        path: 'reportsearch',
        name: 'Reportsearch',
        component: () => import('@/views/manualanalysisreportsearch/reportsearch'),
        meta: { title: '报告查询' },
      }
    ]
  },

  //模型设计
  {
    path: '/modeladmin',
    component: Layout,
    redirect: '/modeladmin/datapretreatment',
    meta: { title: '模型设计', icon: 'form' },
    children: [
      {
        path: 'datapretreatment',
        name: 'Datapretreatment',
        component: () => import('@/views/modeladmin/datapretreatment'),
        meta: { title: '数据预处理' },
      },
      {
        path: 'modelcreate',
        name: 'Modelcreate',
        component: () => import('@/views/modeladmin/modelcreate'),
        meta: { title: '模型管理' },
      },
      {
        name: 'createModel',
        path: '/modelDesign/createModel',
        component: () => import('@/models/modelDesign/modelManage/createModel'),
        hidden: true
      },
      {
        name: 'modelMapping',
        path: '/modelDesign/modelMapping',
        component: () => import('@/models/modelDesign/modelManage/modelMapping'),
        hidden: true
      }
    ]
  },

  //数据源管理
  {
    path: '/datasourcemanagement',
    component: Layout,
    redirect: '/datasourcemanagement/index',
    meta: { title: '数据源管理', icon: 'nested' },
    children: [
      {
        path: 'index',
        name: 'Datasourcemanagement',
        component: () => import('@/views/datasourcemanagement'),
        meta: { title: '数据源管理', breadcrumb: false },
      },

      //数据集
      {
        path: 'dataset',
        component: () => import('@/views/dataset'),
        meta: {title: '数据集' },
      },
    ]
  },

  //系统管理
  {
    path:'/sysconfig',
    component: Layout,
    redirect: '/sysconfig/usersconfig',
    meta: { title: '系统管理', icon: 'user' },
    children: [
      {
        path: 'usersconfig',
        component: () => import('@/views/sysconfig/usersconfig'),
        meta: { title: '用户管理' }
      },
      {
        path: 'depconfig',
        name: 'DepManager',
        component: () => import('@/views/sysconfig/depconfig'),
        meta: { title: '部门管理' }
      },
      {
        path: 'roleconfig',
        name: 'RoleManager',
        component: () => import('@/views/sysconfig/roleconfig'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menuconfig',
        name: 'MenuManager',
        component: () => import('@/views/sysconfig/menuconfig'),
        meta: { title: '菜单管理' }
      },

      // 调度管理
      {
        path: 'management',
        name: 'Management',
        component: () => import('@/views/management/index'),
        meta: { title: '调度管理' }
      },
    ]
  },

  // 握手协议
  {
    path: '/woshouxieyi',
    component: Layout,
    redirect: '/woshouxieyi/index',
    children: [{
      path: 'index',
      name: 'woshouxieyi',
      component: () => import('@/views/woShouXieYi/index'),
      meta: { title: '握手协议', icon: 'link' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }
//
// function filterAsyncRoutes(routes, roles) {
//   const res = [];
//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//   return res
// }

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象

  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = eval(`false || ${route.component}`)
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
      let accessedRoutes;
      accessedRoutes = filterAsyncRouter(state.menu)
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

