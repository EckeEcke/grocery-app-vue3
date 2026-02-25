<template>
  <div class="bg-warning">
    <div class="container py-4">
      <div class="input-group">
        <textarea
          ref="textarea"
          v-model="manualList"
          class="form-control"
          :placeholder="t('placeholders.addArticle')"
          @input="resizeTextArea()"
        >
        </textarea>
        <button class="btn btn-primary" aria-label="add list of items" @click="emitManualList">
          <font-awesome-icon :icon="['fas', 'square-plus']" class="mx-0" />
        </button>
      </div>
      <div
        v-if="currentInput.length > 0 && filteredItemsForSuggestions.length > 0"
        class="text-start bg-light mt-3 p-2 rounded"
      >
        <div
          v-for="item in suggestedItems"
          :key="item.id"
          @click="setInput(item.name)"
          class="cursor-pointer px-1 py-2 btn-outline-secondary"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const listStore = useListsStore()
const manualList = ref<string>('')
const textarea = ref<HTMLElement | null>(null)

const { t } = useI18n()

const currentInput = computed(() => {
  return manualList.value
    .split(/,\s+|,|\n/)
    .slice(-1)
    .toString()
})

const groceryList = computed(() => {
  return listStore.groceryList
})

const filteredItemsForSuggestions = computed(() => {
  if (currentInput.value === '') return groceryList.value
  const entriesIdenticalFirstLetter = groceryList.value.filter(
    (item) => item.name.charAt(0).toLowerCase() === currentInput.value.charAt(0).toLowerCase()
  )
  const entriesNoIdenticalFirstLetter = groceryList.value.filter(
    (item) => item.name.charAt(0).toLowerCase() !== currentInput.value.charAt(0).toLowerCase()
  )
  const sortedByFirstLetter = [...entriesIdenticalFirstLetter, ...entriesNoIdenticalFirstLetter]
  return sortedByFirstLetter.filter((item) => {
    return item.name.toLowerCase().includes(currentInput.value.toLowerCase())
  })
})

const suggestedItems = computed(() => {
  if (!filteredItemsForSuggestions.value) return []
  return filteredItemsForSuggestions.value.length > 5
    ? filteredItemsForSuggestions.value.slice(0, 10)
    : filteredItemsForSuggestions.value
})

const addNewItems = (items: string[]) => {
  items.forEach((item) => listStore.addNewItem(item))
}

const setInput = (newValue: string) => {
  const newManualList = manualList.value.split(/,\s+|,|\n/)
  newManualList[newManualList.length - 1] = newValue + ','
  manualList.value = newManualList.toString()
  textarea.value!.focus()
  resizeTextArea()
}

const emitManualList = () => {
  const convertedToArray = manualList.value.split(/,\s+|,|\n/).map((entry) => entry.replace(/, |,/g, ''))
  addNewItems(convertedToArray)
  manualList.value = ''
}

const resizeTextArea = () => {
  const element = textarea.value
  if (!element) return
  element.style.height = '18px'
  element.style.height = element.scrollHeight + 'px'
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
