import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  const settingsSwitch = ref<boolean>(false);

  const settingsApiKeyStatus = ref<string[]>([])

  const setApiKeyStatus = (apikeyStatus: string[]) => {
    settingsApiKeyStatus.value = apikeyStatus
  }

  const getApiKeyStatus = () => {
    return settingsApiKeyStatus.value
  }

  return {
    settingsSwitch,
    setApiKeyStatus, getApiKeyStatus
  }
})
