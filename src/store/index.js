import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// LJohn [打造一款适合自己的快速开发框架-前端篇之字典组件设计与实现](https://juejin.cn/post/6844904198539395079)
import dict from './modules/dict'
import readingSetting from './modules/readingSetting'

// LJohn [打造一款适合自己的快速开发框架-前端篇之字典组件设计与实现](https://juejin.cn/post/6844904198539395079)
// 自动注册vuex模块
const files = require.context('./modules', true, /\.js$/)
var modules = {}
files.keys().forEach((routerPath) => {
  const name = routerPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = files(routerPath)
  const fileModule = value.default
  modules[name] = fileModule
}, {})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    dict,
    readingSetting
  },
  getters
})

export default store
