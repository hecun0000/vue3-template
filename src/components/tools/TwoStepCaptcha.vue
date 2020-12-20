<template>
  <!-- 两步验证 -->
  <a-modal
    centered
    v-model="visible"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <div :style="{ textAlign: 'center' }">两步验证</div>
    {{ visible }} {{ pvisible }}
    <template v-slot:footer>
      <div :style="{ textAlign: 'center' }">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="stepLoading" @click="handleStepOk">
          继续
        </a-button>
      </div>
    </template>

    <a-spin :spinning="stepLoading">
      <a-form layout="vertical" :auto-form-create="(form)=>{this.form = form}">
        <div class="step-form-wrapper">
          <p style="text-align: center" v-if="!stepLoading">请在手机中打开 Google Authenticator 或两步验证 APP<br />输入 6 位动态码</p>
          <p style="text-align: center" v-else>正在验证..<br/>请稍后</p>
          <a-form-item
            :style="{ textAlign: 'center' }"
            hasFeedback
            fieldDecoratorId="stepCode"
          >
            <a-input :style="{ textAlign: 'center' }" @keyup.enter="handleStepOk" placeholder="000000" />
          </a-form-item>
          <p style="text-align: center">
            <a @click="onForgeStepCode">遗失手机?</a>
          </p>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useForm } from '@ant-design-vue/use'
export default defineComponent({
  props: {
    pvisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['success', 'cancel'],
  setup (props, context) {
    const stepLoading = ref<boolean>(false)
    const visible = ref<boolean>(props.pvisible)
    console.log(visible)
    const form = ref<any>(null)

    const rules = reactive({
      stepCode: [
        { required: true, message: '请输入 6 位动态码!', trigger: 'blur', pattern: /^\d{6}$/, len: 6 }
      ]
    })

    const { validate, validateInfos } = useForm(form, rules)

    const handleStepOk = () => {
      stepLoading.value = true
      validate(['stepCode']).then((values) => {
        console.log('values', values)
        setTimeout(() => {
          stepLoading.value = false
          context.emit('success', { values })
        }, 2000)
      })
    }

    const handleCancel = () => {
      console.log('sssssssssss')
      visible.value = false
      context.emit('cancel')
    }

    return {
      stepLoading,
      visible,
      rules,
      validateInfos,
      form,
      handleStepOk,
      handleCancel
    }
  }
})
</script>
<style lang="less" scoped>
  .step-form-wrapper {
    margin: 0 auto;
    width: 80%;
    max-width: 400px;
  }
</style>
