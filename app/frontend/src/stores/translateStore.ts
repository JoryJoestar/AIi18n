import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useTranslateStore = defineStore('translate', () => {

  const history = ref<historyItem[]>([]);

  const formatTimestamp = (date: Date) => {
    return date.toISOString(); // 返回 ISO 格式的时间戳
};

  const addHistory = (sourceText: string, targetText: string, sourceLang: string, targetLang: string, timestamp: Date) => {
    history.value.push({ sourceText, targetText, sourceLang, targetLang, timestamp });
  };

  const removeHistory = (index: number) => {
    history.value.splice(index, 1);
  };

  const clearHistory = () => {
    history.value = [];
  };


  return {
    history, addHistory, removeHistory, clearHistory,
    formatTimestamp
  }
})
