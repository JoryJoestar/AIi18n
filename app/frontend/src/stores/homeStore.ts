import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const csvData = ref([])

  return { csvData }
})
