//引入三个接口
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
//引入路由器 resetRouter表示重置路由
//不同用户登录系统时就需要回复初始状态，同一用户应该是不用
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),//从cookie中获取token
  name: '',//用户名
  avatar: '',//用户头像
  introduction: '',//简介
  roles: []//当前用户角色
}
//操作状态
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    //从userInfo里取出了账号密码
    return new Promise((resolve, reject) => {
      //通过promise的方式发送一个网络请求
      login({ username: username.trim(), password: password }).then(response => {
        //这个login是别的方法，从@/api/user导入的，api下面做的都是网络请求，axios发送请求，然后response携带返回数据递给data
        const { data } = response
        commit('SET_TOKEN', data.token)
        //commit触发mutation，SET_TOKEN是一个mutation，存储到state最终存在vuex里
        setToken(data.token)
        //setToken是一种方法可以将token传递到本地，state只是在内存
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      //退出登录不需要调接口
      // logout(state.token).then(() => {
        commit('SET_TOKEN', '')//把token设置为空
        commit('SET_ROLES', [])//把roles设置为空
        removeToken()//把cookie中的token删除掉
        resetRouter()//路由重置

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
       // 删除所有的tagsview
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
