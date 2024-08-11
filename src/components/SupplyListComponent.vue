<template>
  <div class="pb-5">
    <div class="mb-5">
      <div class="bg-warning">
        <div class="container py-4">
          <div class="input-group">
            <textarea
              ref="textarea"
              v-model="manualList"
              class="form-control"
              placeholder="Add item(s) - seperate by comma or line break"
              @input="resizeTextArea()"
            >
            </textarea>
            <button @click="emitManualList" class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'plus']" class="search-icon" />
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
      <div v-if="plannedItems && plannedItems.length == 0">
        <img class="illustration mt-5 mb-3" src="../assets/grocery-illustration.svg" />
        <p class="mb-4 p-3">Add new items or choose from your item list</p>
      </div>

      <div class="row container px-0">
        <p v-if="plannedItems && plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">{{ plannedItems.length }}</span></transition
          >
          item(s) left
        </p>
      </div>
      <div v-if="plannedItems && plannedItems.length >= 1" class="pb-1 container">
        <transition-group name="slide-fade">
          <div
            class="row px-3 hover-zoom"
            v-for="groceryItem in plannedItems"
            :key="groceryItem.id"
          >
            <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden hover-zoom">
              <button
                v-if="groceryItem"
                class="btn btn-outline-secondary w-100 mx-0"
                :key="groceryItem.name"
                style="text-align: left"
                @click="checkSingleItem(groceryItem.name)"
              >
                {{ groceryItem.name }}
                <span v-if="groceryItem.quantity !== ''">{{ groceryItem.quantity }}</span>
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="createModal(groceryItem)"
              >
                <font-awesome-icon :icon="['fas', 'sort']" class="trash-icon-item" />
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                @click="checkItem(groceryItem)"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
              </button>
            </div>
            <hr />
          </div>
        </transition-group>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary my-4" @click="copyList">
            <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" /> Copy list
          </button>
        </div>
      </div>
      <div class="container mb-4 p-1 bg-warning">
        <h3 class="text-white m-2">Item List</h3>
      </div>
      <div class="container" v-if="filteredItemsByFirstLetter">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3">
            <strong>{{ entry[0] }}</strong>
          </div>
          <transition-group name="slide-fade">
            <div
              class="row px-3 hover-zoom"
              v-for="(item, index) in entry.filter((item) => item.name !== undefined)"
              :key="index"
            >
              <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
                <button
                  class="btn w-100 mx-0 list-btn"
                  :class="item.planned ? 'btn-success' : 'btn-outline-secondary'"
                  :key="item.name"
                  style="text-align: left"
                  @click="pushNewItemfromList(item.name)"
                >
                  {{ item.name }}
                </button>
              </div>
              <div class="col-1 px-0 mx-0">
                <button
                  class="btn btn-outline-secondary align-bottom delete-item-btn"
                  @click="deleteSingleItem(item)"
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
            v-if="groceryList.length >= 1"
            class="btn btn-outline-secondary mx-2 mb-1"
            @click="deleteGrocerylist"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" /> Delete all
          </button>
        </div>
      </div>
    </div>
    <img class="illustration mb-5" src="../assets/supplylist-illustration.svg" />
    <QuantityInput
      v-if="showInput"
      :item="quantityItem"
      @hide="hideInput"
      :groceryList="groceryList"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useListsStore } from '../stores/lists'
import type { Meal } from '../types/meal'
import type { ListItem } from '../types/listitem'
import QuantityInput from './QuantityInputComponent.vue'
const listStore = useListsStore()
const showInput = ref<boolean>(false)
const quantityItem = ref<ListItem | undefined>(undefined)
const manualList = ref<string>('')
const entriesByFirstLetter = ref<Meal[]>([])
const textarea = ref<any>(null)

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
const plannedItems = computed(() => {
  return groceryList.value.filter(function (item) {
    return item.planned == true
  })
})
const currentInput = computed(() => {
  return manualList.value
    .split(/,\s+|,|\n/)
    .slice(-1)
    .toString()
})
const filteredItemsByFirstLetter = computed(() => {
  return listStore.splitUpListItemsAndSortByFirstLetter()
})

const addNewItem = (item: string) => {
  listStore.addNewItem(item)
}
const addNewItems = (items: string[]) => {
  items.forEach((item) => addNewItem(item))
}
const pushNewItemfromList = (element: string) => {
  const clonedGroceryList = [...groceryList.value]
  const index = clonedGroceryList
    .map(function (element) {
      return element.name
    })
    .indexOf(element)
  listStore.setItemPlanned(index)
}
const checkItem = (element: ListItem) => {
  listStore.checkSingleItem(element)
}
const checkSingleItem = (element: string) => {
  const clonedGroceryList = [...groceryList.value]
  const indexGrocerylist = clonedGroceryList
    .map(function (element) {
      return element.name
    })
    .indexOf(element)
  if (clonedGroceryList[indexGrocerylist]) {
    clonedGroceryList[indexGrocerylist].planned = false
    clonedGroceryList[indexGrocerylist].quantity = ''
  }
  listStore.setGroceryList(clonedGroceryList)
  localStorage.setItem('grocerylist', JSON.stringify(clonedGroceryList))
}
const copyList = () => {
  navigator.clipboard.writeText(plannedItems.value.map((item) => item.name).join('\n'))
  // this.$toast("Copied list to clipboard")
}
const deleteGrocerylist = () => {
  let confirmed = confirm('Do you really want to delete your list?')
  if (confirmed) {
    localStorage.removeItem('grocerylist')
    listStore.setGroceryList([])
    // this.$toast("Item list was deleted")
  }
}
const createModal = (element: ListItem) => {
  document.documentElement.style.overflow = 'hidden'
  quantityItem.value = element
  showInput.value = true
}
const hideInput = () => {
  showInput.value = false
  document.documentElement.style.overflow = 'auto'
}
const setInput = (newValue: string) => {
  const newManualList = manualList.value.split(/,\s+|,|\n/)
  newManualList[newManualList.length - 1] = newValue + ','
  manualList.value = newManualList.toString()
  textarea.value.focus()
  resizeTextArea()
}
const emitManualList = () => {
  const convertedToArray = manualList.value
    .split(/,\s+|,|\n/)
    .map((entry) => entry.replace(/, |,/g, ''))
  addNewItems(convertedToArray)
  manualList.value = ''
}
const resizeTextArea = () => {
  const element = textarea.value
  element.style.height = '18px'
  element.style.height = element.scrollHeight + 'px'
}
const deleteSingleItem = (element: ListItem) => {
  listStore.deleteSingleItem(element)
}
</script>

<style scoped>
.hover-zoom {
  transition: all 0.3s;
}
.hover-zoom:hover {
  transform: translate(0.5%, -1%);
}

.cursor-pointer {
  cursor: pointer;
}

textarea {
  resize: none;
  overflow: hidden;
}

.toggle-btn {
  border-radius: 50rem;
}
</style>
