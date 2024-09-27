<template>
  <div>
    <div class="backdrop" @click="emit('hide')"></div>
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
      <div class="card-footer">
        <button
          class="btn btn-outline-secondary mx-3"
          aria-label="delete item"
          @click="deleteItem()"
        >
          Delete
        </button>
        <button class="btn btn-primary" aria-label="close modal" @click="emit('hide')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '../stores/lists'
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Meal } from '../types/meal'
import type { ListItem } from '../types/listitem'

const listStore = useListsStore()

const props = defineProps({
  meal: {
    type: Object as PropType<Meal>,
    required: true
  }
})

const emit = defineEmits(['hide'])

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
    const index = groceryList.value.findIndex((item: ListItem) => item.name === ingredient)
    listStore.setItemPlanned(index)
  } else listStore.addNewItem(ingredient)
}

const deleteItem = () => {
  listStore.deleteSingleMeal(props.meal)
  emit('hide')
}
</script>
