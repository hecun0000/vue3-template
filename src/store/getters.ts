// import { StoreOptions } from 'vuex'
// import { AppState } from './modules/app'
const getters = {
  isMobile: (state: any) => state.app.isMobile,
  lang: (state: any) => state.app.lang,
  theme: (state: any) => state.app.theme,
  color: (state: any) => state.app.color,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.avatar,
  nickname: (state: any) => state.user.name,
  welcome: (state: any) => state.user.welcome,
  roles: (state: any) => state.user.roles,
  userInfo: (state: any) => state.user.info,
  addRouters: (state: any) => state.permission.addRouters,
  multiTab: (state: any) => state.app.multiTab
}

export default getters
