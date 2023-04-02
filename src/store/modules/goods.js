
import { getAllCates } from "@/api/goods"
const state = {
  cates: [],
}

const mutations = {
  set_cates(state,list){
    state.cates=list;
  }
}
//ajax 异步代码都要放在这
const actions = {
    getCates({commit}){
        getAllCates().then(res => {
           // console.log("res:",res); 
           if(res.data.list){
            commit("set_cates",res.data.list)
           }
        })
    }
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

