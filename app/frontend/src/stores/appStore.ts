import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  const settingsSwitch = ref<boolean>(false);

  return { settingsSwitch }
})
