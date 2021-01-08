import { computed } from 'vue'
import store from '@/store'

const isMobile = computed(_ => store.getters.isMobile)

export { isMobile }
