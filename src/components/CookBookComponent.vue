<template>
  <div>
    <div class="mb-5">
      <div class="bg-warning">
        <div class="container py-4">
          <div>
            <div class="row">
              <div class="col-12 py-0 rounded">
                <div class="row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="text"
                      v-model="newMeal"
                      :placeholder="t('placeholders.addMeal')"
                      maxlength="30"
                    />
                  </div>
                  <transition name="fade">
                    <div v-if="newMeal.length > 0">
                      <input
                        class="form-control my-3"
                        type="text"
                        v-model="recipe"
                        :placeholder="t('placeholders.addRecipeLink')"
                      />
                      <div class="input-group my-3">
                        <input
                          class="form-control"
                          type="text"
                          v-model="newIngredient"
                          :placeholder="t('placeholders.addIngredient')"
                          maxlength="30"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-primary col-12"
                            aria-label="add ingredient"
                            @click="pushIngredient"
                          >
                            <font-awesome-icon :icon="['fas', 'plus']" class="search-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <transition name="fade">
                  <div v-if="ingredients.length > 0 && newMeal.length > 0">
                    <h5 style="text-align: left" class="mt-3 text-white">Ingredients:</h5>
                    <ul style="text-align: left">
                      <button
                        class="btn btn-secondary mx-1 mb-1"
                        v-for="ingredient in ingredients"
                        :key="ingredient"
                        aria-label="delete ingredient"
                        @click="deleteIngredient(ingredient)"
                      >
                        {{ ingredient }} X
                      </button>
                    </ul>
                  </div>
                </transition>
                <button
                  v-if="newMeal.length > 0"
                  class="btn col-12 btn-primary search-btn"
                  aria-label="add new meal"
                  @click="formSubmit"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" class="search-icon" />
                  {{ $t('buttons.addMeal') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="plannedItems.length == 0">
        <img
          class="illustration mt-5 mb-3"
          alt="persons having dinner"
          src="../assets/meal-illustration.svg"
        />
        <p class="mb-5">{{ $t('noMeals') }}</p>
      </div>

      <div class="row container px-0">
        <p v-if="plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in"
            ><span :key="plannedItems.length">{{ plannedItems.length }}</span></transition
          >
          {{ $t('mealsPlanned') }}
        </p>
      </div>
      <div v-if="plannedItems.length >= 1" class="pb-1 container">
        <transition-group name="slide-fade">
          <div class="row px-3 hover-zoom" v-for="meal in plannedItems" :key="meal.name">
            <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden">
              <button
                v-if="meal"
                class="btn btn-outline-secondary w-100 mx-0"
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
                @click="$emit('show-details', meal)"
              >
                <font-awesome-icon :icon="['fas', 'search']" class="trash-icon-item" />
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                aria-label="set meal planned"
                @click="setMealPlanned(meal)"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
              </button>
            </div>
            <hr />
          </div>
        </transition-group>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-outline-secondary my-4"
            aria-label="copy mealplan"
            @click="copyList"
          >
            <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" />
            {{ $t('buttons.copyPlan') }}
          </button>
        </div>
      </div>

      <div class="mb-4">
        <div class="container mb-4 p-1 bg-warning">
          <h3 class="text-white m-2">{{ $t('cookbook') }}</h3>
        </div>
      </div>
      <div class="container">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3">
            <strong>{{ entry[0] }}</strong>
          </div>
          <transition-group name="slide-fade">
            <div class="row px-3 hover-zoom" v-for="meal in onlyMealEntries(entry)" :key="meal.id">
              <div class="col-10 text-nowrap overflow-hidden px-0 mx-0">
                <button
                  class="btn w-100 mx-0"
                  style="text-align: left"
                  :class="meal.planned ? 'btn-success' : 'btn-outline-secondary'"
                  aria-label="set meal planned"
                  :key="meal.id"
                  @click="setMealPlanned(meal)"
                >
                  {{ meal.name }}
                </button>
              </div>
              <div class="col-1 p-0">
                <button
                  class="btn btn-outline-secondary delete-item-btn px-0 mx-0 w-100"
                  aria-label="show meal details"
                  @click="$emit('show-details', meal)"
                >
                  <font-awesome-icon :icon="['fas', 'search']" class="trash-icon-item" />
                </button>
              </div>
              <div class="col-1 px-0 mx-0">
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
            {{ $t('buttons.deleteAll') }}
          </button>
        </div>
      </div>
    </div>
    <img
      class="illustration mb-5"
      alt="illustration of a cook"
      src="../assets/cooking-illustration.svg"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useListsStore } from '@/stores/lists'
import type { Meal } from '../types/meal'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const listStore = useListsStore()
const newMeal = ref('')
const recipe = ref<string | undefined>(undefined)
const newIngredient = ref('')
const ingredients = ref<string[]>([])

const sortedItems = computed(() => {
  return listStore.mealPlan
})

const plannedItems = computed(() => {
  return sortedItems.value.filter((item) => item.planned == true)
})

const filteredItemsByFirstLetter = computed(() => {
  return listStore.splitUpMealsAndSortByFirstLetter()
})

const setMealPlanned = (element: Meal) => {
  const clonedGroceryList = [...sortedItems.value]
  const index = clonedGroceryList
    .map(function (element) {
      return element.name
    })
    .indexOf(element.name)
  listStore.setMealPlanned(index)
}

const copyList = () => {
  navigator.clipboard.writeText(plannedItems.value.map((item) => item.name).join('\n'))
  toast.success(t('toasts.copiedListToClipboad'), {
    autoClose: 1000
  })
}

const formSubmit = (event: any) => {
  event.preventDefault()
  if (newMeal.value.length > 0) {
    listStore.addNewMeal({
      name: newMeal.value,
      ingredients: ingredients.value,
      recipe: recipe.value
    })
    newMeal.value = ''
    ingredients.value = []
    recipe.value = undefined
  }
}

const deleteMeal = (meal: Meal) => {
  listStore.deleteSingleMeal(meal)
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

const pushIngredient = (event: any) => {
  event.preventDefault()
  ingredients.value.push(newIngredient.value)
  newIngredient.value = ''
}

const deleteIngredient = (ingredient: string) => {
  const index = ingredients.value.indexOf(ingredient)
  ingredients.value.splice(index, 1)
}

const onlyMealEntries = (array: (Meal | string)[]): Meal[] => {
  return array.filter((entry): entry is Meal => {
    return typeof entry === 'object' && entry !== null && 'name' in entry
  })
}
</script>

<style scoped>
.hover-zoom {
  transition: all 0.3s;
}

.hover-zoom:hover {
  transform: translate(0.5%, -1%);
}
</style>
