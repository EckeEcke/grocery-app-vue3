<template>
  <div>
    <div class="mb-5">
      <CookBookForm />
      <div v-if="plannedItems.length == 0">
        <img class="illustration mt-5 mb-3" alt="" src="../assets/meal-illustration.svg" />
        <p class="mb-5">{{ t('noMeals') }}</p>
      </div>

      <div class="row container px-0">
        <p v-if="plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">{{ plannedItems.length }}</span>
          </transition>
          {{ t('mealsPlanned') }}
        </p>
      </div>

      <div v-if="plannedItems.length >= 1" class="pb-1 container">
        <transition-group name="slide-fade">
          <template v-for="meal in plannedItems" :key="meal.name">
            <CookBookItem :isPlanned="true" :meal="meal" />
          </template>
        </transition-group>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary my-4" aria-label="copy mealplan" @click="copyList">
            <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" />
            {{ t('buttons.copyPlan') }}
          </button>
        </div>
      </div>

      <AISuggestion />



      <div class="mb-4">
        <div class="container mb-4 p-1 bg-warning">
          <h3 class="text-white m-2">{{ t('cookbook') }}</h3>
        </div>
      </div>
      <div class="container">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3">
            <strong>{{ entry[0] }}</strong>
          </div>
          <transition-group name="slide-fade">
            <CookBookItem v-for="meal in onlyMealEntries(entry)" :meal="meal" :isPlanned="false" :key="meal.id" />
          </transition-group>
        </div>
        <div class="d-flex justify-content-end my-4">
          <button
            v-if="sortedItems.length >= 1"
            class="btn btn-outline-secondary mx-2 mb-1"
            aria-label="delete cookbook"
            @click="deleteCookbook"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" />
            {{ t('buttons.deleteAll') }}
          </button>
        </div>
      </div>
    </div>
    <img class="illustration mb-5" alt="" src="../assets/cooking-illustration.svg" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useListsStore } from '@/stores/lists'
import type { Meal } from '@/types/meal'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import CookBookItem from './CookBookItem.vue'
import CookBookForm from './CookBookForm.vue'
import AISuggestion from './AISuggestion.vue'

const { t } = useI18n()
const listStore = useListsStore()

const sortedItems = computed(() => {
  return listStore.mealPlan
})

const plannedItems = computed(() => {
  return sortedItems.value.filter((item) => item.planned == true)
})

const filteredItemsByFirstLetter = computed(() => {
  return listStore.splitUpMealsAndSortByFirstLetter()
})

const copyList = () => {
  navigator.clipboard.writeText(plannedItems.value.map((item) => item.name).join('\n'))
  toast.success(t('toasts.copiedListToClipboard'), {
    autoClose: 1000
  })
}

const deleteCookbook = () => {
  const confirmed = confirm(t('toasts.confirmDeleteCookbook'))
  if (confirmed) {
    localStorage.removeItem('mealPlan')
    toast.success(t('toasts.cookbookDeleted'), {
      autoClose: 1000
    })
  }
}

const onlyMealEntries = (array: (Meal | string)[]): Meal[] => {
  return array.filter((entry): entry is Meal => {
    return typeof entry === 'object' && entry !== null && 'name' in entry
  })
}
</script>
