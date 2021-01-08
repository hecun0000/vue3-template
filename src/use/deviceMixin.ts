import { computed } from 'vue'
import store from '@/store'

const isMobile = computed(() => store.getters.isMobile)

export { isMobile }
