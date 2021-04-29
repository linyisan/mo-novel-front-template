const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // LJohn [打造一款适合自己的快速开发框架-前端篇之字典组件设计与实现](https://juejin.cn/post/6844904198539395079)
  // 这里追加dictMap的get方法，可以使用mapGetters，详见src/components/m/Dict/index.vue
  dictMap: state => state.dict.dictMap
}
export default getters
