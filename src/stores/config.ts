import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Meal } from '../types/meal'

export const useConfigStore = defineStore('config', () => {
  const showDetailPage = ref(false)
  const mealToShow = ref<undefined | Meal>(undefined)

  const setShowDetailpage = (bool: boolean) => {
    document.documentElement.style.overflow = bool ? 'overflow' : 'auto'
    showDetailPage.value = bool
  }
  const setMealToShow = (meal: Meal) => {
    mealToShow.value = meal
  }

  return {
    showDetailPage,
    mealToShow,
    setShowDetailpage,
    setMealToShow
  }
})
