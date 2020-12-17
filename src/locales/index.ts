import { createI18n } from 'vue-i18n'
import storage from 'store'
import moment from 'moment'
import type { I18n, I18nOptions } from 'vue-i18n'

// default lang
import enUS from './lang/en-US'

export const defaultLang = 'en-US'

const messages: any = {
  'en-US': {
    ...enUS
  }
}

const config: I18nOptions = {
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
}
const i18n: any = createI18n(config)

const loadedLanguages = [defaultLang]

function setI18nLanguage (lang: string) {
  i18n.locale = lang
  // request.headers['Accept-Language'] = lang
  const html = document.querySelector('html')
  if (html) {
    html.setAttribute('lang', lang)
  }
  return lang
}

export function loadLanguageAsync (lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          const locale = msg.default
          i18n.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          moment.updateLocale(locale.momentName, locale.momentLocale)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender (key: any) {
  return i18n.t(`${key}`)
}

export default i18n
