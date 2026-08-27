import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  function toggleUnit() {
    if (unit.value === 'celsius') unit.value = 'fahrenheit'
    else if (unit.value === 'fahrenheit') unit.value = 'celsius'
  }

  return { unit, unitSymbol, toggleUnit }
})
