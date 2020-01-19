const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menu:state => state.user.menu,
  loadingEdit: state => state.warning.loadingEdit,
  pageValue: state => state.warning.pageValue,
  routes: state => state.user.routes,
  addRoutes: state => state.user.addRoutes,
}
export default getters
