import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { lazyAntd } from './plugins/antdv'
// import VueI18n from './locales'
// import { App as AppT } from '@types'

const app = createApp(App)

lazyAntd(app)

app
  .use(store)
  // .use(VueI18n)
  .use(router)
  .mount('#app')
