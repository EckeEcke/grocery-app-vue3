<template>
  <div class="border-0 mx-auto my-5">
    <div class="card bg-white border-0">
      <div class="card-header bg-warning rounded-0 py-1 px-4 mb-4">
        <h3 class="text-white m-2 p-2">{{ $t('randomRecipe') }}</h3>
      </div>
      <div v-if="isLoading" class="card-body container">
        <div class="spinner-3 mx-auto my-5"></div>
      </div>
      <div v-if="requestFailed" class="card-body container">
        <p>
          Unfortunately your request failed. Please check your internet connection or try again
          later.
        </p>
      </div>
      <div v-if="!isLoading && !requestFailed && randomMeal" class="py-3 container">
        <div class="row bg-light p-1">
          <div class="col-4 rounded">
            <img
              class="dish-image"
              alt=""
              :src="randomMeal.data.meals[0].strMealThumb"
            />
          </div>

          <div class="col-8" style="text-align: left">
            <h4>
              {{ randomMeal.data.meals[0].strMeal }}
            </h4>
            <span class="recipe-description">
              {{ $t('category') }}: {{ randomMeal.data.meals[0].strCategory }}
            </span>
            <br />
            <span class="recipe-description">
              {{ $t('area') }}: {{ randomMeal.data.meals[0].strArea }}
            </span>
            <br />
            <span class="recipe-description">
              <a class="link-info" :href="randomMeal.data.meals[0].strSource" target="_blank">{{
                $t('buttons.openRecipe')
              }}</a>
            </span>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-1 mb-2"></div>
          <h5 class="col-10" @click="() => (showInstructions = !showInstructions)">
            {{ $t('buttons.instructions') }}
          </h5>
          <h5 class="col-1 px-0" @click="showInstructions = !showInstructions">
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showInstructions }"
            />
          </h5>
        </div>
        <transition name="slide-fade">
          <p v-if="showInstructions" class="dish-text px-4">
            {{ randomMeal.data.meals[0].strInstructions }}
          </p>
        </transition>
        <hr class="mb-2" />
        <div class="row">
          <div class="col-1 mb-2"></div>
          <h5 class="col-10" @click="() => (showIngredients = !showIngredients)">
            {{ $t('buttons.ingredients') }}
          </h5>
          <h5 class="col-1 px-0" @click="showIngredients = !showIngredients">
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              class="accordion-icon"
              :class="{ flipped: !showIngredients }"
            />
          </h5>
        </div>
        <transition name="slide-fade">
          <div v-if="showIngredients">
            <br />
            <p v-for="(ingredient, index) in ingredients" :key="ingredient + index">
              {{ ingredient }}
              <span v-if="ingredient.length >= 1 && measures[index].length >= 1">|</span>
              {{ measures[index] }}
            </p>
          </div>
        </transition>
        <hr />
      </div>
      <div class="card-footer no-br-mobile border-0 bg-white" style="text-align: right">
        <button
          v-if="!requestFailed"
          class="btn btn-primary my-2"
          aria-label="add recipe"
          @click="addRecipe"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />{{ $t('buttons.addToCookbook') }}
        </button>
        <button class="btn btn-outline-secondary" aria-label="load recipe idea" @click="loadRecipe">
          {{ $t('buttons.loadNewRecipe') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useListsStore } from '@/stores/lists'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showInstructions = ref(false)
const showIngredients = ref(false)
const randomMeal = ref<any>(undefined)
const isLoading = ref(true)
const requestFailed = ref(false)

const listStore = useListsStore()

const measures = computed(() => {
  let list = []
  for (let i = 1; i <= 20; i++) {
    if (eval(`randomMeal.value.data.meals[0].strMeasure${i}`) !== '') {
      list.push(eval(`randomMeal.value.data.meals[0].strMeasure${i}`))
    }
  }
  return list
})

const ingredients = computed(() => {
  let list: string[] = []
  for (let i = 1; i <= 20; i++) {
    if (eval(`randomMeal.value.data.meals[0].strIngredient${i}`) !== '') {
      list.push(eval(`randomMeal.value.data.meals[0].strIngredient${i}`))
    }
  }
  return list
})

onMounted(() => {
  loadRecipe()
})

const loadRecipe = () => {
  isLoading.value = true
  requestFailed.value = false
  const controller = new AbortController()

  fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
    signal: controller.signal
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      randomMeal.value = { data }
      isLoading.value = false
    })
    .catch(error => {
      console.log(error)
      isLoading.value = false
      requestFailed.value = true
    })

  setTimeout(() => {
    controller.abort()
  }, 3000)
}

const addRecipe = () => {
  listStore.addNewMeal({
    name: randomMeal.value?.data.meals[0].strMeal,
    ingredients: ingredients.value,
    recipe: randomMeal.value?.data.meals[0].strSource
  })
  toast.success(t('toasts.savedRandomRecipe', { recipe: randomMeal.value.data.meals[0].strMeal }), {
    autoClose: 1000
  })
}
</script>

<style scoped>
.card-footer:last-child {
  margin-left: 1rem;
}
</style>
