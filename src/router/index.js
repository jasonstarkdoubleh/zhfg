import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
let system = 'priceSystem'
let priceSystem = true        //价格监测
let analysisSystem = true     //分析
let lyricalSystem = true      //舆情
let onlineSystem = true       //在线调研
let modelSystem = true        //模型管理
let dataSystem = true         //数据
let adminSystem = true        //管理

switch(system){
  case "priceSystem":
    priceSystem = false
    break
  case "analysisSystem":
    analysisSystem = false
    break
  case "lyricalSystem":
    lyricalSystem = false
    break
  case "onlineSystem":
    onlineSystem = false
    break
  case "modelSystem":
    modelSystem = false
    break
  case "dataSystem":
    dataSystem = false
    break
  case "adminSystem":
    adminSystem = false
    break
}

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    // redirect: '/pricewarning/pricewarningconfig/warningconfig',
    component: () => import('@/views/dashboard'),
    hidden: true
  },

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

  //价格监测系统
  //价格预警
  {
    path: '/pricewarning',
    component: Layout,
    redirect: '/pricewarning/pricewarningconfig',
    meta: { title: '价格预警', icon: 'example' },
    hidden: priceSystem,
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
    path: '/priceanalyse',
    component: Layout,
    redirect: '/priceanalyse/censusanalyse',
    meta: { title: '价格分析', icon: 'example' },
    hidden: priceSystem,
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
    path: '/forecasting',
    component: Layout,
    redirect: '/forecasting/resultshow',
    meta: { title: '价格预测', icon: 'example' },
    hidden: priceSystem,
    children: [
      {
        path: 'resultshow',
        name: 'Resultshow',
        component: () => import('@/views/forecasting/resultshow'),
        meta: { title: '价格预测' },
      }
    ]
  },

  //分析报告配置
  {
    path: '/analysereportconfig',
    component: Layout,
    redirect: '/analysereportconfig/reportproduceconfig',
    meta: { title: '分析报告配置', icon: 'example' },
    hidden: analysisSystem,
    children: [
      {
        path: 'reportproduceconfig',
        name: 'Reportproduceconfig',
        component: () => import('@/views/analysereportconfig/reportproduceconfig'),
        meta: { title: '报告生成配置' },
      }
    ]
  },

  //分析报告查看
  {
    path: '/manualanalysisreportsearch',
    component: Layout,
    redirect: '/manualanalysisreportsearch/reporttaskwatch',
    meta: { title: '分析报告查看', icon: 'example' },
    hidden: analysisSystem,
    children: [
      {
        path: 'reportsearch',
        name: 'Reportsearch',
        component: () => import('@/views/manualanalysisreportsearch/reportsearch'),
        meta: { title: '报告查询' },
      }
    ]
  },

  //模型管理
  {
    path: '/modeladmin',
    component: Layout,
    redirect: '/modeladmin/datapretreatment',
    meta: { title: '模型管理', icon: 'example' },
    hidden: modelSystem,
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
        meta: { title: '模型创建' },
      }
    ]
  },

  //数据源管理
  {
    path: '/datasourcemanagement',
    component: Layout,
    redirect: '/datasourcemanagement/index',
    meta: { title: '数据源管理', icon: 'example' },
    hidden: dataSystem,
    children: [
      {
        path: 'index',
        name: 'Datasourcemanagement',
        component: () => import('@/views/datasourcemanagement'),
        meta: { title: '数据源管理', breadcrumb: false },
      }
    ]
  },

  //数据集
  // {
  //   path: '/dataset',
  //   component: Layout,
  //   redirect: '/dataset/index',
  //   meta: { title: '数据集', icon: 'example' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Datasourcemanagement',
  //       component: () => import('@/views/dataset'),
  //       meta: { title: '数据源管理' },
  //     }
  //   ]
  // },





  //自动报告调度配置
  // {
  //   path: '/ziDongBaoGao',
  //   component: Layout,
  //   redirect: '/ziDongBaoGao/index',
  //   children: [{
  //     path: 'index',
  //     name: 'ziDongBaoGao',
  //     component: () => import('@/views/ziDongBaoGao/index'),
  //     meta: { title: '自动报告调度配置', icon: 'dashboard' }
  //   }]
  // },

  //调度配置
  // {
  //   path: '/diaoDuPeiZhi',
  //   component: Layout,
  //   redirect: '/diaoDuPeiZhi/index',
  //   children: [{
  //     path: 'index',
  //     name: 'diaoDuPeiZhi',
  //     component: () => import('@/views/diaoDuPeiZhi/index'),
  //     meta: { title: '调度配置', icon: 'dashboard' }
  //   }]
  // },

  //握手协议
  // {
  //   path: '/woshouxieyi',
  //   component: Layout,
  //   redirect: '/woshouxieyi/index',
  //   children: [{
  //     path: 'index',
  //     name: 'woshouxieyi',
  //     component: () => import('@/views/woShouXieYi/index'),
  //     meta: { title: '握手协议', icon: 'dashboard' }
  //   }]
  // },


  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
