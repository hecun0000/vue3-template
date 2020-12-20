import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { Commit } from 'vuex'
import { AppState } from './app'

export interface UserState {
  token: string;
  name: string;
  welcome: string;
  avatar: string;
  roles: string[];
  info: any;
}

const state: UserState = {
  token: '',
  name: '',
  welcome: '',
  avatar: '',
  roles: [],
  info: {}
}

const mutations = {
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token
  },
  SET_NAME: (state: UserState, { name, welcome }: UserState) => {
    state.name = name
    state.welcome = welcome
  },
  SET_AVATAR: (state: UserState, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state: UserState, roles: string[]) => {
    state.roles = roles
  },
  SET_INFO: (state: UserState, info: any) => {
    state.info = info
  }
}

const actions = {
  // 登录
  Login (ctx: { commit: Commit }, userInfo: any) {
    return new Promise((resolve: Function, reject) => {
      login(userInfo).then((response: any) => {
        const result = response.result
        storage.set(ACCESS_TOKEN, result.token)
        ctx.commit('SET_TOKEN', result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo (ctx: { commit: Commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((response: any) => {
        const result = response.result

        if (result.role && result.role.permissions.length > 0) {
          const role = result.role
          role.permissions = result.role.permissions
          role.permissions.map((per: any) => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map((action: any) => { return action.action })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map((permission: any) => { return permission.permissionId })
          ctx.commit('SET_ROLES', result.role)
          ctx.commit('SET_INFO', result)
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }

        ctx.commit('SET_NAME', { name: result.name, welcome: welcome() })
        ctx.commit('SET_AVATAR', result.avatar)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  Logout (ctx: { commit: Commit; state: UserState }) {
    return new Promise((resolve: Function) => {
      logout().then(() => {
        ctx.commit('SET_TOKEN', '')
        ctx.commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        resolve()
      }).catch(() => {
        resolve()
      })
    })
  }

}

export default {
  state,
  actions,
  mutations
}
