<template>
  <div v-if="meal">
    <div class="backdrop" @click="hide()"></div>
    <div class="modal-detail-page card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ meal.name }}</h4>
      <div class="card-body text-start">
        <button
          class="btn mx-1 mb-1"
          :class="isItemPlanned(ingredient) ? 'btn-success' : 'btn-secondary'"
          v-for="ingredient in validateIngredients(meal.ingredients)"
          :key="ingredient"
          aria-label="toggle planned status of ingredient"
          @click="checkIngredients(ingredient)"
        >
          {{ ingredient }}
        </button>
        <div v-if="meal.instructions" class="instructions my-2">
          {{ meal.instructions}}
        </div>
      </div>
      <a v-if="meal.recipe" :href="meal.recipe" target="_blank" class="mx-3 mb-3">{{ t('buttons.openRecipe') }}</a>
      <div class="card-footer">
        <button class="btn btn-primary" aria-label="close modal" @click="hide()">
          {{ t('buttons.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { computed } from 'vue'
import type { ListItem } from '@/types/listitem'
import { useConfigStore } from '@/stores/config'
import { useI18n } from 'vue-i18n'

const listStore = useListsStore()

const { t } = useI18n()

const meal = computed(() => useConfigStore().mealToShow)

const groceryList = computed(() => {
  return listStore.groceryList
})

const isItemPlanned = (ingredient: string) => {
  const index = groceryList.value.findIndex((item: ListItem) => item.name === ingredient)
  if (index >= 0) {
    return groceryList.value[index]?.planned
  } else return false
}

const checkIngredients = (ingredient: string) => {
  if (isItemPlanned(ingredient)) {
    const item = groceryList.value.find((entry: ListItem) => entry.name === ingredient)
    listStore.setItemPlanned(item!)
  } else listStore.addNewItem(ingredient)
}

const validateIngredients = (ingredients: string[]) =>
  ingredients.filter((ingredient) => ingredient && ingredient.length > 0)

const hide = () => useConfigStore().setShowDetailPage(false)
</script>

<style scoped>
.instructions {
  max-height: 100px;
  overflow: auto;
}
</style>
