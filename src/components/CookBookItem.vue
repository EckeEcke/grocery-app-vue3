<template>
  <div class="row px-3 hover-zoom">
    <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden">
      <button
        v-if="meal"
        class="btn btn-outline-secondary w-100 mx-0"
        style="text-align: left"
        aria-label="set meal planned"
        :key="meal.id + meal.name"
        @click="setMealPlanned()"
      >
        {{ meal.name }}
      </button>
    </div>
    <div class="col-1 px-0">
      <button
        class="btn btn-outline-secondary delete-item-btn px-0 mx-0 w-100"
        aria-label="show meal details"
        @click="showDetails()"
      >
        <font-awesome-icon :icon="['fas', 'search']" class="trash-icon-item" />
      </button>
    </div>
    <div class="col-1 px-0 mx-0">
      <button
        class="btn btn-outline-secondary align-bottom delete-item-btn"
        aria-label="set meal planned"
        @click="setMealPlanned()"
      >
        <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
      </button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { useConfigStore } from '@/stores/config'
import type { Meal } from '../types/meal'
import { computed, type PropType } from 'vue'

const props = defineProps({
  meal: {
    type: Object as PropType<Meal>,
    required: true
  }
})

const listStore = useListsStore()
const configStore = useConfigStore()

const sortedItems = computed(() => listStore.mealPlan)
const setMealPlanned = () => {
  const clonedGroceryList = [...sortedItems.value]
  const index = clonedGroceryList
    .map(function (entry) {
      return entry.name
    })
    .indexOf(props.meal.name)
  listStore.setMealPlanned(index)
}

const showDetails = () => {
  configStore.setMealToShow(props.meal)
  configStore.setShowDetailpage(true)
}
</script>
