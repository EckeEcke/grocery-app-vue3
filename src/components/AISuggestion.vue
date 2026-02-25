<template>
  <div class="mb-4">
    <div class="container mb-4 p-1 bg-warning">
      <h3 class="text-white m-2">{{ t('ai.title') }}</h3>
    </div>
    <div class="container p-3">
      <div class="recipe-form bg-light p-4">
        <div v-if="showIntro" class="mb-4 image-wrapper">
          <img src="../assets/ai-chef.webp" alt="AI Chef" />
          <div>
            <h4>{{ t('ai.introTitle') }}</h4>
            <p class="m-0">
              {{ t('ai.introText') }}
            </p>
          </div>
        </div>
        <form v-if="!recipe" @submit.prevent="submitForm">
          <div class="field">
            <label>{{ t('ai.dietLabel') }}</label>
            <select v-model="formData.diet" class="form-select">
              <option value="none" selected>{{ t('ai.diets.none') }}</option>
              <option value="vegetarian">{{ t('ai.diets.vegetarian') }}</option>
              <option value="vegan">{{ t('ai.diets.vegan') }}</option>
              <option value="lowCarb">{{ t('ai.diets.lowCarb') }}</option>
            </select>
          </div>

          <div class="field">
            <label>{{ t('ai.timeLabel') }}</label>
            <select v-model="formData.time" class="form-select">
              <option value="15 min" selected>{{ t('ai.times.m15') }}</option>
              <option value="30 min">{{ t('ai.times.m30') }}</option>
              <option value="60 min">{{ t('ai.times.m60') }}</option>
            </select>
          </div>

          <button class="btn btn-primary" type="submit" :disabled="loading">
            {{ loading ? t('ai.buttons.loading') : t('ai.buttons.submit') }}
          </button>
        </form>

        <div v-if="recipe" class="result">
          <h4 class="mb-3">{{ recipe.name }}</h4>
          <hr />
          <div class="py-2">
            <h5 class="my-2">{{ t('buttons.ingredients') }}</h5>
            <ul>
              <li v-for="ing in recipe.ingredients" :key="ing">{{ ing }}</li>
            </ul>
          </div>
          <hr />
          <div class="py-2">
            <h5 class="my-2">{{ t('buttons.instructions') }}</h5>
            <p class="instructions">{{ recipe.instructions }}</p>
          </div>
          <button class="btn btn-primary my-2" @click="addRecipeToCookbook">{{ t('ai.buttons.add') }}</button>
          <button class="btn btn-outline-secondary" @click="resetForm">{{ t('ai.buttons.another') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { computed, ref, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import type { Meal } from '@/types/meal'
import { useI18n } from 'vue-i18n'

const listStore = useListsStore()
const { t } = useI18n()

const savedDishes = computed(() => listStore.mealPlan)

const formData = reactive({
  diet: 'none',
  time: '15 min'
})

const showIntro = ref(true)

const recipe = ref<Meal | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const submitForm = async () => {
  loading.value = true
  error.value = null
  showIntro.value = false

  if (import.meta.env.DEV) {
    console.log('Using mock data (Local Dev Mode)')

    await new Promise((resolve) => setTimeout(resolve, 800))

    recipe.value = {
      name: 'Mock-Gericht: Mediterrane Pfanne',
      ingredients: ['200g Zucchini', '100g Feta', 'Olivenöl', 'Frischer Rosmarin'],
      instructions: 'Das Gemüse klein schneiden und in der Pfanne anbraten. Am Ende den Feta drüberbröseln. Fertig!'
    }

    loading.value = false
    return
  }

  try {
    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        diet: formData.diet,
        time: formData.time,
        language: 'de',
        inspiration: savedDishes.value
      })
    })

    const data = await response.json()
    if (data.error) {
      error.value = data.error
    } else {
      recipe.value = data
    }
  } catch (e) {
    error.value = `Fehler bei der Verbindung zur API: ${e}`
  } finally {
    loading.value = false
  }
}

const addRecipeToCookbook = () => {
  listStore.addNewMeal({
    name: recipe.value!.name,
    ingredients: recipe.value?.ingredients || [],
    instructions: recipe.value?.instructions
  })
  recipe.value = null
  showToast()
}

const resetForm = () => {
  recipe.value = null
}

const showToast = () => {
  toast.success(t('toasts.ai'), {
    autoClose: 1000
  })
}
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 0.75rem;
  /*background-color: #42b883;*/
}

.image-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

img {
  width: 100px;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}

.instructions {
  max-height: 100px;
  overflow: auto;
  text-align: left;
}
</style>
