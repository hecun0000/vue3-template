import storage from 'store'
import { Commit } from 'vuex'
import {
  SIDEBAR_TYPE,
  TOGGLE_MOBILE_TYPE,
  TOGGLE_NAV_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_HIDE_HEADER,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  TOGGLE_MULTI_TAB,
  // i18n
  APP_LANGUAGE
} from '@/store/mutation-types'
import { loadLanguageAsync } from '@/locales'

type themeProps = 'dark' | 'light'

export interface AppState {
  sideCollapsed: boolean;
    isMobile: boolean;
    theme: themeProps;
    layout: string;
    contentWidth: string;
    fixedHeader: boolean;
    fixedSidebar: boolean;
    autoHideHeader: boolean;
    color: string;
    weak: boolean;
    multiTab: boolean;
    lang: string;
    _antLocale: any;
}

const state: AppState = {
  sideCollapsed: false,
  isMobile: false,
  theme: 'dark',
  layout: '',
  contentWidth: '',
  fixedHeader: false,
  fixedSidebar: false,
  autoHideHeader: false,
  color: '',
  weak: false,
  multiTab: true,
  lang: 'en-US',
  _antLocale: {}
}
const mutations = {
  [SIDEBAR_TYPE]: (state: AppState, type: boolean) => {
    state.sideCollapsed = type
    storage.set(SIDEBAR_TYPE, type)
  },
  [TOGGLE_MOBILE_TYPE]: (state: AppState, isMobile: boolean) => {
    state.isMobile = isMobile
  },
  [TOGGLE_NAV_THEME]: (state: AppState, theme: themeProps) => {
    state.theme = theme
    storage.set(TOGGLE_NAV_THEME, theme)
  },
  [TOGGLE_LAYOUT]: (state: AppState, mode: string) => {
    state.layout = mode
    storage.set(TOGGLE_LAYOUT, mode)
  },
  [TOGGLE_FIXED_HEADER]: (state: AppState, mode: boolean) => {
    state.fixedHeader = mode
    storage.set(TOGGLE_FIXED_HEADER, mode)
  },
  [TOGGLE_FIXED_SIDEBAR]: (state: AppState, mode: boolean) => {
    state.fixedSidebar = mode
    storage.set(TOGGLE_FIXED_SIDEBAR, mode)
  },
  [TOGGLE_CONTENT_WIDTH]: (state: AppState, type: string) => {
    state.contentWidth = type
    storage.set(TOGGLE_CONTENT_WIDTH, type)
  },
  [TOGGLE_HIDE_HEADER]: (state: AppState, type: boolean) => {
    state.autoHideHeader = type
    storage.set(TOGGLE_HIDE_HEADER, type)
  },
  [TOGGLE_COLOR]: (state: AppState, color: string) => {
    state.color = color
    storage.set(TOGGLE_COLOR, color)
  },
  [TOGGLE_WEAK]: (state: AppState, mode: boolean) => {
    state.weak = mode
    storage.set(TOGGLE_WEAK, mode)
  },
  [APP_LANGUAGE]: (state: AppState, lang: any, antd = {}) => {
    state.lang = lang
    state._antLocale = antd
    storage.set(APP_LANGUAGE, lang)
  },
  [TOGGLE_MULTI_TAB]: (state: AppState, bool: boolean) => {
    storage.set(TOGGLE_MULTI_TAB, bool)
    state.multiTab = bool
  }
}

const actions = {
  setLang (ctx: { commit: Commit }, lang: string) {
    return new Promise((resolve, reject) => {
      ctx.commit(APP_LANGUAGE, lang)
      loadLanguageAsync(lang).then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
