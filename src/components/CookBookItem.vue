<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="row px-3 hover-zoom">
    <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden">
      <button
        v-if="meal"
        class="btn btn-outline-secondary w-100 mx-0"
        :class="meal.planned && !isPlanned ? 'btn-success text-white' : 'btn-outline-secondary'"
        style="text-align: left"
        aria-label="set meal planned"
        :key="meal.id + meal.name"
        @click="setMealPlanned(meal)"
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
    <div v-if="isPlanned" class="col-1 px-0 mx-0">
      <button
        class="btn btn-outline-secondary align-bottom delete-item-btn"
        aria-label="set meal planned"
        @click="setMealPlanned(meal)"
      >
        <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
      </button>
    </div>
    <div v-if="!isPlanned" class="col-1 px-0 mx-0">
      <button
        class="btn w-100 btn-outline-secondary align-bottom delete-item-btn"
        aria-label="delete meal"
        @click="deleteMeal(meal)"
      >
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" />
      </button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { useConfigStore } from '@/stores/config'
import LoadingSpinner from './LoadingSpinner.vue'
import type { Meal } from '@/types/meal'
import { type PropType, ref } from 'vue'

const props = defineProps({
  meal: {
    type: Object as PropType<Meal>,
    required: true
  },
  isPlanned: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

const listStore = useListsStore()
const configStore = useConfigStore()

const isLoading = ref(false)

const setMealPlanned = async (meal: Meal) => {
  isLoading.value = true
  await listStore.setMealPlanned(meal)
  isLoading.value = false
}

const deleteMeal = (meal: Meal) => {
  listStore.deleteSingleMeal(meal)
}

const showDetails = () => {
  configStore.setMealToShow(props.meal)
  configStore.setShowDetailpage(true)
}
</script>
