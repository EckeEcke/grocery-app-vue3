<template>
  <div class="pb-5">
    <div class="mb-5">
      <GroceryListForm />
      <div v-if="plannedItems && plannedItems.length == 0">
        <img
          class="illustration mt-5 mb-3"
          alt="shopping cart with groceries"
          src="../assets/grocery-illustration.svg"
        />
        <p class="mb-4 p-3">{{ $t('noItems') }}</p>
      </div>

      <div class="row container px-0">
        <p v-if="plannedItems && plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">
              {{ plannedItems.length }}
            </span>
          </transition>
          {{ $t('itemsLeft') }}
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
                aria-label="check single item"
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
                aria-label="open modal"
                @click="createModal(groceryItem)"
              >
                <font-awesome-icon :icon="['fas', 'sort']" class="trash-icon-item" />
              </button>
            </div>
            <div class="col-1 px-0 mx-0">
              <button
                class="btn btn-outline-secondary align-bottom delete-item-btn"
                aria-label="check item"
                @click="checkItem(groceryItem)"
              >
                <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
              </button>
            </div>
            <hr />
          </div>
        </transition-group>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary my-4" aria-label="copy list" @click="copyList">
            <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" />
            {{ $t('buttons.copyList') }}
          </button>
        </div>
      </div>
      <div class="container mb-4 p-1 bg-warning">
        <h3 class="text-white m-2">{{ $t('itemList') }}</h3>
      </div>
      <div class="container" v-if="filteredItemsByFirstLetter">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3">
            <strong>{{ entry[0] }}</strong>
          </div>
          <transition-group name="slide-fade">
            <div
              class="row px-3 hover-zoom"
              v-for="(item, index) in onlyListItems(entry)"
              :key="index"
            >
              <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
                <button
                  class="btn w-100 mx-0 list-btn"
                  :class="item.planned ? 'btn-success' : 'btn-outline-secondary'"
                  :key="item.name"
                  style="text-align: left"
                  aria-label="push new item from list"
                  @click="pushNewItemfromList(item.name)"
                >
                  {{ item.name }}
                </button>
              </div>
              <div class="col-1 px-0 mx-0">
                <button
                  class="btn btn-outline-secondary align-bottom delete-item-btn"
                  aria-label="delete single item"
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
            aria-label="delete grocery list"
            @click="deleteGrocerylist"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" />
            {{ $t('buttons.deleteAll') }}
          </button>
        </div>
      </div>
    </div>
    <img
      class="illustration mb-5"
      alt="illustration of a grocery list"
      src="../assets/supplylist-illustration.svg"
    />
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
import { toast } from 'vue3-toastify'
import type { ListItem } from '../types/listitem'
import QuantityInput from './QuantityInputComponent.vue'
import GroceryListForm from './GroceryListForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const listStore = useListsStore()
const showInput = ref<boolean>(false)
const quantityItem = ref<ListItem | undefined>(undefined)

const groceryList = computed(() => {
  return listStore.groceryList
})

const plannedItems = computed(() => {
  return groceryList.value.filter(function (item) {
    return item.planned == true
  })
})

const filteredItemsByFirstLetter = computed(() => {
  return listStore.splitUpListItemsAndSortByFirstLetter()
})

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
  toast.success(t('toasts.copiedListToClipboard'), {
    autoClose: 1000
  })
}

const deleteGrocerylist = () => {
  const confirmed = confirm(t('toasts.confirmDeleteList'))
  if (confirmed) {
    localStorage.removeItem('grocerylist')
    listStore.setGroceryList([])
    toast.success(t('toasts.itemListDeleted'), {
      autoClose: 1000
    })
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

const deleteSingleItem = (element: ListItem) => {
  listStore.deleteSingleItem(element)
}

const onlyListItems = (array: (ListItem | string)[]): ListItem[] => {
  return array.filter((entry): entry is ListItem => {
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
