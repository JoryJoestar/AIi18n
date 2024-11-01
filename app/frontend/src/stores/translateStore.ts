import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useTranslateStore = defineStore('translate', () => {

  const translate_languages = ref<any[]>([]);

  const source_language = ref<string>('');
  const translate_language = ref<string>('');

  const history = ref<HistoryItem[]>([]);

  const formatTimestamp = (date: Date) => {
    return date.toISOString(); // 返回 ISO 格式的时间戳
  };

  const addHistory = (data: HistoryItem) => {
    history.value.push(data);
  };

  const removeHistory = (index: number) => {
    history.value.splice(index, 1);
  };

  const clearHistory = () => {
    history.value = [];
  };


  return {
    history, addHistory, removeHistory, clearHistory,
    formatTimestamp,
    source_language, translate_languages, translate_language
  }
})
