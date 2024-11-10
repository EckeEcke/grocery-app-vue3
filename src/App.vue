<template>
  <div id="app" ref="app">
    <Header />
    <div class="container pb-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6 px-0 mx-auto bg-white box-shadow">
          <div class="rounded no-br-mobile pb-4 border-0 card mb-0 mb-sm-5">
            <div
              class="btn-toolbar no-br-top-mobile justify-content-center rounded-top no-br-mobile overflow-hidden sticky-mobile bg-white"
            >
              <div class="btn-group w-100" role="group">
                <button
                  class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
                  :class="{ inactive: cookbookShown }"
                  aria-label="show grocerylist"
                  @click="cookbookShown = false"
                >
                  <h3 class="text-white mb-0 px-0">{{ $t('groceryList') }}</h3>
                </button>
                <button
                  class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
                  :class="{ inactive: !cookbookShown }"
                  aria-label="show cookbook"
                  @click="cookbookShown = true"
                >
                  <h3 class="text-white mb-0 px-0">{{ $t('mealPlan') }}</h3>
                </button>
              </div>
            </div>

            <transition-group name="fade">
              <CookBook v-if="cookbookShown" key="component" />
              <RandomRecipe v-if="cookbookShown" key="random" />
              <SupplyList v-if="!cookbookShown" key="component" />
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
      <button
        v-if="showScrollBtn"
        class="scroll-btn btn bg-primary"
        aria-label="scroll back to top"
        @click="scrollToTop"
      >
        <font-awesome-icon :icon="['fas', 'chevron-up']" />
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import RandomRecipe from './components/RandomRecipe.vue'
import AboutContent from './components/AboutContent.vue'
import NavbarComponent from './components/NavigationComponent.vue'
import CookBook from './components/CookBookComponent.vue'
import SupplyList from './components/SupplyListComponent.vue'
import DetailPage from './components/DetailPageComponent.vue'
import supplyListData from './static/supplyListData.json'
import cookBookData from './static/cookBookData.json'
import runMario from 'running-mario'
import Konami from 'konami'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useListsStore } from './stores/lists'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useConfigStore } from './stores/config'

const { locale } = useI18n()
const route = useRoute()

const cookbookShown = ref(false)
const showScrollBtn = ref(false)
const touchstartX = ref(0)
const touchstartY = ref(0)
const app = ref<HTMLElement | null>(null)

const listStore = useListsStore()
const configStore = useConfigStore()

const showNavMenu = computed(() => configStore.showNavMenu)

const toggleScrollbutton = () => {
  if (window.scrollY > window.innerHeight * 0.75) {
    showScrollBtn.value = true
  } else {
    showScrollBtn.value = false
  }
}
window.addEventListener('scroll', toggleScrollbutton)

onUnmounted(() => window.removeEventListener('scroll', toggleScrollbutton))
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
  if (urlParams.get('view') === 'mealplan') cookbookShown.value = true
})

const scrollToTop = () => window.scrollTo(0, 0)

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
    cookbookShown.value = true
  }
  if (touchendX - 60 > touchstartX.value) {
    cookbookShown.value = false
  }
}

watch(cookbookShown, (val: boolean) => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  const url = new URL(window.location.href)
  if (val === true) {
    url.searchParams.set('view', 'mealplan')
  } else {
    url.searchParams.set('view', 'grocerylist')
  }
  window.history.replaceState(null, '', url)
})
</script>
