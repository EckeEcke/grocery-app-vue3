import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Meal } from '../types/meal'
import { Tab } from '../types/tabs'

export const useConfigStore = defineStore('config', () => {
  const showDetailPage = ref(false)
  const mealToShow = ref<undefined | Meal>(undefined)
  const showNavMenu = ref(false)
  const displayedTab = ref(Tab.groceries)

  const setShowDetailpage = (bool: boolean) => {
    document.documentElement.style.overflow = bool ? 'overflow' : 'auto'
    showDetailPage.value = bool
  }
  const setMealToShow = (meal: Meal) => {
    mealToShow.value = meal
  }
  const setShowNavMenu = (bool: boolean) => {
    showNavMenu.value = bool
  }

  const setDisplayedTab = (tab: Tab) => {
    displayedTab.value = tab
  }

  return {
    showDetailPage,
    mealToShow,
    showNavMenu,
    displayedTab,
    setShowDetailpage,
    setMealToShow,
    setShowNavMenu,
    setDisplayedTab
  }
})
