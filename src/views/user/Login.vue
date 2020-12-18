<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            message="账户或密码错误（admin/ant.design )"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户: admin"
              v-model="form.username"
            >
              <template v-slot:prefix>
                <UserOutlined :style="{ color: 'rgba(0,0,0,.25)'}"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              placeholder="密码: admin or ant.design"
              v-model="form.password"
            >
              <template v-slot:prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </template>
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-model="form.mobile"
            >
              <template v-slot:prefix>
                <MobileOutlined :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </template>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  v-model="form.captcha"
                  placeholder="验证码"
                >
                  <template v-slot:prefix>
                    <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox>自动登录</a-checkbox>
        <!-- <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right"
          >忘记密码</router-link> -->
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >确定</a-button
        >
      </a-form-item>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, ref, reactive, onUpdated, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { notification, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'

import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha, get2step } from '@/api/login'
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    TwoStepCaptcha
  },
  setup () {
    const router = useRouter()

    const store = useStore()
    const Login = () => store.dispatch('Login')
    const Logout = () => store.dispatch('Logout')

    const requiredTwoStepCaptcha = ref(false)

    onMounted(() => {
      console.log('mounted!')
      get2step({}).then((res) => {
        console.log(res)
        requiredTwoStepCaptcha.value = res.result.stepCode
      }).catch(() => {
        requiredTwoStepCaptcha.value = false
      })
    })

    const customActiveKey = ref('tab1')

    const handleTabClick = (key) => {
      customActiveKey.value = key
    }

    const state = reactive({
      time: 60,
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      smsSendBtn: false
    })

    const handleUsernameOrEmail = (rule, value, callback) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    }

    const isLoginError = ref(false)
    const requestFailed = (err) => {
      isLoginError.value = true
      notification.error({
        message: '错误',
        description:
            ((err.response || {}).data || {}).message ||
            '请求出现错误，请稍后再试',
        duration: 4
      })
    }
    const loginSuccess = (res) => {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
        this.$router.push({ name: 'analysis' }, () => {
          console.log('onComplete')
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        })
        */
      router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      isLoginError.value = false
    }

    const loginBtn = ref(false)
    const stepCaptchaVisible = ref(false)
    const stepCaptchaCancel = () => {
      Logout().then(() => {
        loginBtn.value = false
        stepCaptchaVisible.value = false
      })
    }

    const stepCaptchaSuccess = () => loginSuccess()

    const passRules = {
      username: [
        { required: true, message: '请输入帐户名或邮箱地址', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }
    const captchaRules = {
      mobile: [
        { required: true, message: '请输入正确的手机号', trigger: 'blur' }
      ],
      captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ]
    }

    const form = reactive({})
    const rules = reactive({
      ...passRules,
      ...captchaRules
    })

    const handleSubmit = (e) => {
      e.preventDefault()

      state.loginBtn = true

      const validateFieldsKey =
          customActiveKey.value === 'tab1'
            ? ['username', 'password']
            : ['mobile', 'captcha']

      this.$refs.formLogin.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] =
              values.username
          loginParams.password = md5(values.password)
          Login(loginParams)
            .then((res) => loginSuccess(res))
            .catch((err) => requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    }

    const getCaptcha = (e) => {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then((res) => {
              setTimeout(hide, 2500)
              notification.success({
                message: '提示',
                description:
                    '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              requestFailed(err)
            })
        }
      })
    }

    return {
      form,
      loginBtn,
      stepCaptchaVisible,
      requiredTwoStepCaptcha,
      customActiveKey,
      isLoginError,
      state,
      handleTabClick,
      stepCaptchaSuccess,
      stepCaptchaCancel,
      handleSubmit,
      getCaptcha,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
  /deep/ .ant-col {
    width: 100%;
  }
}
</style>
