import warning from '@/api/warning'

const state = {
  loadingEdit: false
};

const mutations = {
  CHANGE_LOADING: (state, data) => {
    state.loadingEdit = data
  },
};

const actions = {

  changeLoading({ commit }, data) {
    commit('CHANGE_LOADING', data)
  },

  async queryPageList({ commit }, data){
    try {
      return await warning.queryPageList(data)
    }catch (e) {
      console.log(e);
    }
  },

  async handleGoods({ commit }) {
    try {
      return await warning.getGoodsData()
    }catch (e) {
      console.log(e);
    }
  },

  async save({commit}, data) {
    try {
      return await warning.save(data)
    }catch (e) {
      console.log(e);
    }
  },

  async warnType({commit}, data) {
    try {
      return await warning.warnType(data)
    }catch (e) {
      console.log(e);
    }
  },

  async delete({commit}, data) {
    try {
      return await warning.delete(data)
    }catch (e) {
      console.log(e);
    }
  },

  async getCommType({commit}) {
    try {
      return await warning.getCommType()
    }catch (e) {
      console.log(e);
    }
  },

  async goodsQueryPageList({commit}, data) {
    try {
      return await warning.goodsQueryPageList(data)
    }catch (e) {
      console.log(e);
    }
  },

  async queryList({commit}, data) {
    try {
      return await warning.queryList(data)
    }catch (e) {
      console.log(e);
    }
  },

  async wpbaseindexinfo({commit}, data) {
    try {
      return await warning.wpbaseindexinfo(data)
    }catch (e) {
      console.log(e);
    }
  },

  async queryAll({commit}) {
    try {
      return await warning.queryAll()
    }catch (e) {
      console.log(e);
    }
  },

  async view({commit}) {
    try {
      return await warning.view()
    }catch (e) {
      console.log(e);
    }
  }



};

export default {
  state,
  mutations,
  actions
}
