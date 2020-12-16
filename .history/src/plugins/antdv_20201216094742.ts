// base library
import Vue, { App } from 'vue'
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
    .use(Layout)
    .use(Input)
    .use(InputNumber)
    .use(Button)
    .use(Switch)
    .use(Radio)
    .use(Checkbox)
    .use(Select)
    .use(Card)
    .use(Form)
    .use(Row)
    .use(Col)
    .use(Modal)
    .use(Table)
    .use(Tabs)
    .use(Icon)
    .use(Badge)
    .use(Popover)
    .use(Dropdown)
    .use(List)
    .use(Avatar)
    .use(Breadcrumb)
    .use(Steps)
    .use(Spin)
    .use(Menu)
    .use(Drawer)
    .use(Tooltip)
    .use(Alert)
    .use(Tag)
    .use(Divider)
    .use(DatePicker)
    .use(TimePicker)
    .use(Upload)
    .use(Progress)
    .use(Skeleton)
    .use(Popconfirm)
    .use(PageHeader)
    .use(Result)
    .use(Statistic)
    .use(Descriptions)
    .use(Space)
    use.prototype.$confirm = Modal.confirm
    use.prototype.$message = message
    use.prototype.$notification = notification
    use.prototype.$info = Modal.info
    use.prototype.$success = Modal.success
    use.prototype.$error = Modal.error
    use.prototype.$warning = Modal.warning
  return app
}

// Vue.use(Viser)
// Vue.use(Dialog) // this.$dialog func
// Vue.use(MultiTab)
// Vue.use(PageLoading)
// Vue.use(PermissionHelper)
// Vue.use(VueCropper)
