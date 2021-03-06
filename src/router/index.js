import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    component: () => import('@/views/dashboard'),
    hidden: true
  },

]

export const asyncRouterMap = [
  //商品总览
  {
    path: '/secondpage',
    component: Layout,
    redirect: '/secondpage/index',
    children: [{
      path:'index',
      component: () => import('@/views/secondpage'),
      meta: { title: '商品总览', icon: 'table' },
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
      meta: { title: '预警展示', icon: 'tree' },
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
      meta: { title: '多维分析', icon: 'eye' },
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
      meta: { title: '预测分析', icon: 'example' },
    }]
  },


  //价格监测系统
  {
    path: '/pricewatch',
    component: Layout,
    redirect: '/pricewatch/pricewarning',
    meta: { title: '价格分析', icon: 'dashboard' },
    children: [
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
      meta: { title: '舆情系统', icon: 'link' },
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
      meta: { title: '在线调研', icon: 'password' },
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
    redirect: '/datasourcemanagement/datasourcemanagement',
    meta: { title: '数据源管理', icon: 'nested' },
    children: [
      {
        path: 'datasourcemanagement',
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
        component: () => import('@/views/management'),
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

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
