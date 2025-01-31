<template>
  <div id="app" ref="app">
    <ModalUserId v-if="showUserIdModal" @id-generated="showToast"/>
    <Header />
    <div class="container pb-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6 px-0 mx-auto bg-white box-shadow">
          <div class="rounded no-br-mobile pb-4 border-0 card mb-0 mb-sm-5">
            <ToggleTabs />
            <transition-group name="fade">
              <template v-if="displayedTab === Tab.cookbook">
                <CookBook key="component" />
                <RandomRecipe key="random" />
              </template>
              <GroceryList v-if="displayedTab === Tab.groceries" key="component" />
            </transition-group>
          </div>
        </div>
        <div class="col-12 col-md-10 col-lg-6 col-xl-5 mx-auto bg-white box-shadow">
          <AboutContent />
        </div>
      </div>
    </div>
    <DetailPage v-if="showDetailpage" />
    <NavbarComponent v-if="showNavMenu" class="container" />
    <transition name="fade">
      <ScrollTopButton />
    </transition>
  </div>
</template>

<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import ToggleTabs from './components/ToggleTabs.vue'
import RandomRecipe from './components/RandomRecipe.vue'
import AboutContent from './components/AboutContent.vue'
import NavbarComponent from './components/NavigationComponent.vue'
import CookBook from './components/CookBookComponent.vue'
import GroceryList from './components/GroceryList.vue'
import DetailPage from './components/DetailPageComponent.vue'
import ScrollTopButton from './components/ScrollTopButton.vue'
import supplyListData from './static/supplyListData.json'
import cookBookData from './static/cookBookData.json'
import runMario from 'running-mario'
import Konami from 'konami'
import { computed, onMounted, ref, watch } from 'vue'
import { useListsStore } from './stores/lists'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from './stores/config'
import { Tab } from './types/tabs'
import ModalUserId from '@/components/ModalUserId.vue'
import { toast } from 'vue3-toastify'

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()

const touchstartX = ref(0)
const touchstartY = ref(0)
const app = ref<HTMLElement | null>(null)

const listStore = useListsStore()
const configStore = useConfigStore()

const showNavMenu = computed(() => configStore.showNavMenu)

const displayedTab = computed(() => configStore.displayedTab)

const showUserIdModal = computed(() => configStore.showUserIdModal)

const showToast = (newId: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set('id', newId)
  window.history.replaceState(null, '', url)
  setTimeout(() => toast.success(t('userModal.success'), {
    autoClose: 1000
  }), 100)
}

onMounted(() => {
  locale.value = (route.query.locale as string) || 'de'
  const hasFaultyLocalStorageEntryItemList =
    localStorage.getItem('grocerylist') === 'undefined' ||
    localStorage.getItem('grocerylist') === undefined ||
    localStorage.getItem('grocerylist') === 'null' ||
    localStorage.getItem('grocerylist') === null
  if (hasFaultyLocalStorageEntryItemList) {
    localStorage.removeItem('grocerylist')
  }
  const groceryListToPush = hasFaultyLocalStorageEntryItemList
    ? supplyListData
    : JSON.parse(localStorage.getItem('grocerylist') as string)
  listStore.setGroceryList(groceryListToPush)
  const hasFaultyLocalStorageEntryMealPlan =
    localStorage.getItem('mealPlan') === 'undefined' ||
    localStorage.getItem('mealPlan') === undefined ||
    localStorage.getItem('mealPlan') === 'null' ||
    localStorage.getItem('mealPlan') === null
  if (hasFaultyLocalStorageEntryMealPlan) {
    localStorage.removeItem('mealPlan')
  }
  const mealPlanToPush = hasFaultyLocalStorageEntryMealPlan
    ? cookBookData
    : JSON.parse(localStorage.getItem('mealPlan') as string)
  listStore.setMealPlan(mealPlanToPush)
  new Konami(() => {
    runMario()
  })
  app.value!.addEventListener('touchstart', handleTouchStart, false)
  app.value!.addEventListener('touchend', handleTouchEnd, false)
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('view') === Tab.cookbook) configStore.setDisplayedTab(Tab.cookbook)
})

const showDetailpage = computed(() => configStore.showDetailPage)

const handleTouchStart = (event: TouchEvent) => {
  touchstartX.value = event.changedTouches[0].screenX
  touchstartY.value = event.changedTouches[0].screenY
}
const handleTouchEnd = (event: TouchEvent) => {
  const touchendX = event.changedTouches[0].screenX
  const touchendY = event.changedTouches[0].screenY
  if (!(touchendY <= touchstartY.value + 40 && touchendY >= touchstartY.value - 40)) return
  if (touchendX + 60 < touchstartX.value) {
    configStore.setDisplayedTab(Tab.cookbook)
  }
  if (touchendX - 60 > touchstartX.value) {
    configStore.setDisplayedTab(Tab.groceries)
  }
}

watch(displayedTab, (val: Tab) => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  const url = new URL(window.location.href)
  if (val === Tab.cookbook) {
    url.searchParams.set('view', Tab.cookbook)
  } else {
    url.searchParams.set('view', Tab.groceries)
  }
  window.history.replaceState(null, '', url)
})
</script>
