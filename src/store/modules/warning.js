import warning from '@/api/warning'

const state = {
  loadingEdit: false,
  pageValue: {}
};

const mutations = {
  CHANGE_LOADING: (state, data) => {
    state.loadingEdit = data
  },
  CHANGE_PAGEVALUE: (state, data) => {
    state.pageValue = data
  }
};

const actions = {

  changePageValue({ commit }, data) {
    commit('CHANGE_PAGEVALUE', data)
  },

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
  },

  async confSave({commit}, data) {
    try {
      return await warning.confSave(data)
    }catch (e) {
      console.log(e);
    }
  },

  async trendQueryList({commit}) {
    try {
      return await warning.trendQueryList()
    }catch (e) {
      console.log(e);
    }
  },

  async secondView({commit}, data) {
    try {
      return await warning.secondView(data)
    }catch (e) {
      console.log(e);
    }
  },

  async bussType({commit}, data) {
    try {
      return await warning.bussType(data)
    }catch (e) {
      console.log(e);
    }
  },

  async listAll({commit}) {
    try {
      return await warning.listAll()
    }catch (e) {
      console.log(e);
    }
  },

  async getDataSetList({commit}) {
    try {
      return await warning.getDataSetList()
    }catch (e) {
      console.log(e);
    }
  },

  async pssanalyinfoList({commit}, data1,data2,data3) {
    try {
      return await warning.pssanalyinfoList(data1,data2,data3)
    }catch (e) {
      console.log(e);
    }
  },

  async detailV2({commit}, data) {
    try {
      return await warning.detailV2(data)
    }catch (e) {
      console.log(e);
    }
  },

  async getSubCommByCommId({commit}, data) {
    try {
      return await warning.getSubCommByCommId(data)
    }catch (e) {
      console.log(e);
    }
  },

  async getTopUrlInfo({commit}) {
    try {
      return await warning.getTopUrlInfo()
    }catch (e) {
      console.log(e);
    }
  },

  async deleteGoods({commit}, data) {
    try {
      return await warning.deleteGoods(data)
    }catch (e) {
      console.log(e);
    }
  },

  async warnQueryList({commit}) {
    try {
      return await warning.warnQueryList()
    }catch (e) {
      console.log(e);
    }
  },

  async detail({commit}, data) {
    try {
      return await warning.detail(data[0], data[1])
    }catch (e) {
      console.log(e);
    }
  },

  async runGeneral({commit}, data) {
    try {
      return await warning.runGeneral(data)
    }catch (e) {
      console.log(e);
    }
  },

  async confUpdate({commit}, data) {
    try {
      return await warning.confUpdate(data)
    }catch (e) {
      console.log(e);
    }
  },

  async queryResult({commit}, data) {
    try {
      return await warning.queryResult(data)
    }catch (e) {
      console.log(e);
    }
  },

  async getHeatTop({commit}, data) {
    try {
      return await warning.getHeatTop(data)
    }catch (e) {
      console.log(e);
    }
  },


};

export default {
  state,
  mutations,
  actions
}
