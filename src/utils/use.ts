import { computed } from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const NumberFormat = computed((value) => {
  if (!value) return '0'
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

export const dayFormat = computed((dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

export const momentFormat = computed((dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})
