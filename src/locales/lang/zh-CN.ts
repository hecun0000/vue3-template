import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import moment from 'moment'
import menu from './zh-CN/menu'
import dashboard from './zh-CN/dashboard'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: moment.locale('zh-cn')
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': '信息',
  'layouts.usermenu.dialog.content': '您确定要注销吗？',

  ...components,
  ...menu,
  ...dashboard
}
