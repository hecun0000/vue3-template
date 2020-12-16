/*
 * @Author: your name
 * @Date: 2020-12-16 08:30:37
 * @LastEditTime: 2020-12-16 14:56:52
 * @LastEditors: hecun
 * @Description: 
 * @FilePath: \vue3-1\src\store\index.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import { createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

export default createStore({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
