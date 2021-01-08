<template>
  <div class="main user-layout-register">
    <h3><span>注册</span></h3>
    <a-form ref="formRegister" :model="form" :rules="rules" id="formRegister">
      <a-form-item v-bind="validateInfos.email">
        <a-input
          size="large"
          type="text"
          v-model.value="form.email"
          placeholder="邮箱"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model.value="state.passwordLevelChecked"
      >
        <template v-slot:content>
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：<span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item v-bind="validateInfos.password">
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            placeholder="至少6位密码，区分大小写"
            v-model.value="form.password"
            autocomplete="off"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item v-bind="validateInfos.password2">
        <a-input-password
          size="large"
          placeholder="确认密码"
          autocomplete="off"
          v-model.value="form.password2"
        ></a-input-password>
      </a-form-item>

      <a-form-item v-bind="validateInfos.mobile">
        <a-input size="large" placeholder="11 位手机号" v-model.value="form.mobile">
          <template v-slot:addonBefore>
            <a-select size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
          </a-input-group>-->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item v-bind="validateInfos.captcha">
            <a-input size="large" type="text" placeholder="验证码"  v-model.value="form.captcha">
              <template v-slot:prefix>
                <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
          ></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
          >注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }"
          >使用已有账户登录</router-link
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getSmsCaptcha } from '@/api/login'
import { isMobile } from '@/use/deviceMixin'
import { useForm } from '@ant-design-vue/use'
import { notification, message } from 'ant-design-vue'
import { MailOutlined } from '@ant-design/icons-vue'

const levelNames = ['低', '低', '中', '强']
const levelClass = ['error', 'error', 'warning', 'success']
const levelColor = ['#ff0000', '#ff0000', '#ff7e05', '#52c41a']

interface StateParams {
  time: number;
  smsSendBtn: boolean;
  passwordLevel: number;
  passwordLevelChecked: boolean;
  percent: number;
  progressColor: string;
}

export default defineComponent({
  name: 'Register',
  components: {
    MailOutlined
  },
  setup () {
    const state: StateParams = reactive({
      time: 60,
      smsSendBtn: false,
      passwordLevel: 0,
      passwordLevelChecked: false,
      percent: 10,
      progressColor: '#FF0000'
    })
    const passwordLevelClass = computed(() => levelClass[state.passwordLevel])
    const passwordLevelName = computed(() => levelNames[state.passwordLevel])
    const passwordLevelColor = computed(() => levelColor[state.passwordLevel])

    // 验证密码等级
    const handlePasswordLevel = (rule: [], value: any) => {
      return new Promise((resolve, reject) => {
        let level = 0
        // 判断这个字符串中有没有数字
        if (/[0-9]/.test(value)) {
          level++
        }
        // 判断字符串中有没有字母
        if (/[a-zA-Z]/.test(value)) {
          level++
        }
        // 判断字符串中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level++
        }
        state.passwordLevel = level
        state.percent = level * 30
        if (level >= 2) {
          if (level >= 3) {
            state.percent = 100
          }
          return resolve(true)
        } else {
          if (level === 0) {
            state.percent = 10
          }
          return reject(new Error('密码强度不够'))
        }
      })
    }

    const handlePhoneCheck = (rule: [], value: any) => {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      return Promise.resolve()
    }

    const form = reactive({
      email: '',
      password: '',
      password2: '',
      captcha: '',
      mobile: ''
    })

    const passwordRules = reactive({
      password: [
        {
          required: true,
          message: '至少6位密码，区分大小写',
          validator: handlePasswordLevel,
          validateTrigger: ['change', 'blur']
        }
      ]
    })

    const handlePasswordCheck = (rule: [], value: any) => {
      // const { validate } = useForm(form, passwordRules)
      const password = form.password
      console.log('value', value)
      if (value === undefined) {
        return Promise.reject(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        return Promise.reject(new Error('两次密码不一致'))
      }
      return Promise.resolve(true)
    }
    const rules = reactive({
      email: [{ required: true, type: 'email', message: '请输入邮箱地址' }],
      ...passwordRules,
      password2: [
        {
          required: true,
          message: '至少6位密码，区分大小写',
          validator: handlePasswordCheck
        }
      ],
      mobile: [
        {
          required: true,
          message: '请输入正确的手机号',
          validator: handlePhoneCheck,
          validateTrigger: ['change', 'blur']
        }
      ],
      captcha: [
        { required: true, message: '请输入验证码' }
      ]
    })
    const { validate, validateInfos } = useForm(form, rules)

    const handlePasswordInputClick = () => {
      if (!isMobile) {
        state.passwordLevelChecked = true
        return
      }
      state.passwordLevelChecked = false
    }
    const registerBtn = ref(false)
    const requestFailed = (err: any) => {
      notification.error({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
      registerBtn.value = false
    }

    const router = useRouter()

    const handleSubmit = () => {
      validate().then(() => {
        state.passwordLevelChecked = false
        router.push({ name: 'registerResult', params: { ...form } })
      })
    }

    const getCaptcha = (e: Event) => {
      e.preventDefault()

      validate(['mobile']).then(() => {
        state.smsSendBtn = true

        const interval = window.setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60
            state.smsSendBtn = false
            window.clearInterval(interval)
          }
        }, 1000)

        const hide = message.loading('验证码发送中..', 0)

        getSmsCaptcha({ mobile: form.mobile })
          .then((res: any) => {
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
      })
    }

    return {
      registerBtn,
      isMobile,
      state,
      form,
      rules,
      passwordLevelClass,
      passwordLevelName,
      passwordLevelColor,
      validateInfos,
      handlePasswordLevel,
      handlePasswordCheck,
      handlePhoneCheck,
      handlePasswordInputClick,
      handleSubmit,
      getCaptcha
    }
  }
})
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  :deep(.ant-col) {
    width: 100%;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
