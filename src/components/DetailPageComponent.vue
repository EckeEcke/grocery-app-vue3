<template>
  <div v-if="meal">
    <div class="backdrop" @click="hide()"></div>
    <div class="modal-detailpage card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ meal.name }}</h4>
      <div class="card-body" style="text-align: left">
        <button
          class="btn mx-1 mb-1"
          :class="isItemPlanned(ingredient) ? 'btn-success' : 'btn-secondary'"
          v-for="ingredient in meal.ingredients"
          :key="ingredient"
          aria-label="toggle planned status of ingredient"
          @click="checkIngredients(ingredient)"
        >
          {{ ingredient }}
        </button>
      </div>
      <a v-if="meal.recipe" :href="meal.recipe" target="_blank" class="mx-3 mb-3">{{
        $t('buttons.openRecipe')
      }}</a>
      <div class="card-footer">
        <button
          class="btn btn-outline-secondary mx-3"
          aria-label="delete item"
          @click="deleteItem()"
        >
          {{ $t('buttons.delete') }}
        </button>
        <button class="btn btn-primary" aria-label="close modal" @click="hide()">
          {{ $t('buttons.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { computed } from 'vue'
import type { Meal } from '@/types/meal'
import type { ListItem } from '@/types/listitem'
import { useConfigStore } from '@/stores/config'

const listStore = useListsStore()

const meal = computed(() => useConfigStore().mealToShow)

const groceryList = computed(() => {
  return listStore.groceryList
})

const isItemPlanned = (ingredient: string) => {
  const index = groceryList.value.findIndex((item: ListItem) => item.name === ingredient)
  if (index >= 0) {
    return groceryList.value[index].planned
  } else return false
}

const checkIngredients = (ingredient: string) => {
  if (isItemPlanned(ingredient)) {
    const item = groceryList.value.find((entry: ListItem) => entry.name === ingredient)
    listStore.setItemPlanned(item!)
  } else listStore.addNewItem(ingredient)
}

const deleteItem = () => {
  listStore.deleteSingleMeal(meal.value as Meal)
  hide()
}

const hide = () => useConfigStore().setShowDetailpage(false)
</script>
