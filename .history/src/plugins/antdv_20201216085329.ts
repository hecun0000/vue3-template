// base library
import { App } from 'vue'
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Space,
  message,
  notification
} from 'ant-design-vue'
// import Viser from 'viser-vue'

// ext library
// import VueCropper from 'vue-cropper'
// import Dialog from '@/components/Dialog'
// import MultiTab from '@/components/MultiTab'
// import PageLoading from '@/components/PageLoading'
// import PermissionHelper from '@/core/permission/permission'
// import './directives/action'

export const lazyAntd = (app: App): App => {
  app.use(ConfigProvider)
  app.use(Layout)
  app.use(Input)
  app.use(InputNumber)
  app.use(Button)
  app.use(Switch)
  app.use(Radio)
  app.use(Checkbox)
  app.use(Select)
  app.use(Card)
  app.use(Form)
  app.use(Row)
  app.use(Col)
  app.use(Modal)
  app.use(Table)
  app.use(Tabs)
  app.use(Icon)
  app.use(Badge)
  app.use(Popover)
  app.use(Dropdown)
  app.use(List)
  app.use(Avatar)
  app.use(Breadcrumb)
  app.use(Steps)
  app.use(Spin)
  app.use(Menu)
  app.use(Drawer)
  app.use(Tooltip)
  app.use(Alert)
  app.use(Tag)
  app.use(Divider)
  app.use(DatePicker)
  app.use(TimePicker)
  app.use(Upload)
  app.use(Progress)
  app.use(Skeleton)
  app.use(Popconfirm)
  app.use(PageHeader)
  app.use(Result)
  app.use(Statistic)
  app.use(Descriptions)
  app.use(Space)

  return app
}

// Vue.prototype.$confirm = Modal.confirm
// Vue.prototype.$message = message
// Vue.prototype.$notification = notification
// Vue.prototype.$info = Modal.info
// Vue.prototype.$success = Modal.success
// Vue.prototype.$error = Modal.error
// Vue.prototype.$warning = Modal.warning

// Vue.use(Viser)
// Vue.use(Dialog) // this.$dialog func
// Vue.use(MultiTab)
// Vue.use(PageLoading)
// Vue.use(PermissionHelper)
// Vue.use(VueCropper)
