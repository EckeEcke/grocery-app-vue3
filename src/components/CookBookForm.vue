<template>
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
                  <input
                    class="form-control my-3"
                    type="text"
                    v-model="instructions"
                    placeholder="Instructions"
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
                      <button class="btn btn-primary col-12" aria-label="add ingredient" @click="pushIngredient">
                        <font-awesome-icon :icon="['fas', 'plus']" class="search-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <transition name="fade">
              <div v-if="ingredients.length > 0 && newMeal.length > 0">
                <h5 class="mt-3 text-white text-start">Ingredients:</h5>
                <ul class="text-start">
                  <li v-for="ingredient in ingredients" :key="ingredient">
                    <button
                      class="btn btn-secondary mx-1 mb-1"
                      aria-label="delete ingredient"
                      @click="deleteIngredient(ingredient)"
                    >
                      {{ ingredient }} X
                    </button>
                  </li>
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
              {{ t('buttons.addMeal') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const listStore = useListsStore()

const newMeal = ref('')
const recipe = ref<string | undefined>(undefined)
const newIngredient = ref('')
const ingredients = ref<string[]>([])
const instructions = ref<string | undefined>(undefined)

const formSubmit = (event: Event) => {
  event.preventDefault()
  if (newMeal.value.length > 0) {
    listStore.addNewMeal({
      name: newMeal.value,
      ingredients: ingredients.value,
      recipe: recipe.value,
      instructions: instructions.value
    })
    newMeal.value = ''
    ingredients.value = []
    recipe.value = undefined
    instructions.value = undefined
  }
}

const pushIngredient = (event: Event) => {
  event.preventDefault()
  ingredients.value.push(newIngredient.value)
  newIngredient.value = ''
}

const deleteIngredient = (ingredient: string) => {
  const index = ingredients.value.indexOf(ingredient)
  ingredients.value.splice(index, 1)
}
</script>
