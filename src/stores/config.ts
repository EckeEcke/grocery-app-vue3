import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Meal } from '@/types/meal'
import { Tab } from '@/types/tabs'
import type { ListItem } from '@/types/listitem'

export const useConfigStore = defineStore('config', () => {
  const showDetailPage = ref(false)
  const mealToShow = ref<undefined | Meal>(undefined)
  const showQuantityInput = ref(false)
  const itemToShow = ref<undefined | ListItem>(undefined)
  const showNavMenu = ref(false)
  const displayedTab = ref(Tab.cookbook)
  const showUserIdModal = ref(false)
  const userId = ref<undefined | string>(undefined)
  const userName = ref<undefined | string>(undefined)

  const setShowDetailPage = (bool: boolean) => {
    showDetailPage.value = bool
    setOverflow()
  }
  const setMealToShow = (meal: Meal) => {
    mealToShow.value = meal
  }
  const setShowQuantityInput = (bool: boolean) => {
    showQuantityInput.value = bool
    setOverflow()
  }
  const setItemToShow = (item: ListItem) => {
    itemToShow.value = item
  }
  const setShowNavMenu = (bool: boolean) => {
    showNavMenu.value = bool
  }

  const setDisplayedTab = (tab: Tab) => {
    displayedTab.value = tab
  }

  const setOverflow = () => {
    document.documentElement.style.overflow =
      showDetailPage.value || showQuantityInput.value || showUserIdModal.value ? 'hidden' : 'auto'
  }

  const setShowUserIdModal = (bool: boolean) => {
    showUserIdModal.value = bool
    setOverflow()
  }

  const setUserId = (someString: string | undefined) => {
    userId.value = someString
  }

  const setUserName = (someString: string | undefined) => {
    userName.value = someString
  }

  return {
    showDetailPage,
    mealToShow,
    showQuantityInput,
    itemToShow,
    showNavMenu,
    displayedTab,
    showUserIdModal,
    userId,
    userName,
    setShowDetailPage,
    setMealToShow,
    setShowQuantityInput,
    setItemToShow,
    setShowNavMenu,
    setDisplayedTab,
    setShowUserIdModal,
    setUserId,
    setUserName
  }
})
