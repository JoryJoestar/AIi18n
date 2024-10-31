import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  const settingsSwitch = ref<boolean>(false);

  const settingsApiKeyStatus = ref<string[]>([])

  const messageVisible = ref(false);
  const messageContent = ref(''); // 用于存储消息内容
  const messageDuration = ref(0);
  const messageType = ref<string>('info');
  const messageCloseButtonVisible = ref<boolean>(false);

  const showMessage = (msg: string, duration: number, type: string) => {
    messageContent.value = msg;
    messageDuration.value = duration;
    messageType.value = type;
    messageVisible.value = true;
    messageCloseButtonVisible.value = false;
  };

  const setApiKeyStatus = (apikeyStatus: string[]) => {
    settingsApiKeyStatus.value = apikeyStatus
  }

  const getApiKeyStatus = () => {
    return settingsApiKeyStatus.value
  }

  return {
    settingsSwitch,
    setApiKeyStatus, getApiKeyStatus,
    messageVisible, messageContent, messageDuration, messageType, messageCloseButtonVisible, showMessage
  }
})
