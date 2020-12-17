<!--
 * @Author: your name
 * @Date: 2020-12-16 08:30:37
 * @LastEditTime: 2020-12-16 14:12:47
 * @LastEditors: hecun
 * @Description:
 * @FilePath: \vue3-1\src\App.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup () {
    const handleMessage = () => message.info('This is a normal message')
    return {
      handleMessage
    }
  }
})
</script>
