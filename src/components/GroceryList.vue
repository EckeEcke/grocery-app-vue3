<template>
  <div class="pb-5">
    <div class="mb-5">
      <GroceryListForm />
      <div v-if="plannedItems && plannedItems.length == 0">
        <img class="illustration mt-5 mb-3" alt="" src="../assets/grocery-illustration.svg" />
        <p class="mb-4 p-3">{{ t('noItems') }}</p>
      </div>

      <div class="row container px-0">
        <p v-if="plannedItems && plannedItems.length >= 1" class="px-2 my-4 font-small">
          <transition name="fade" mode="out-in">
            <span :key="plannedItems.length">
              {{ plannedItems.length }}
            </span>
          </transition>
          {{ t('itemsLeft') }}
        </p>
      </div>
      <div v-if="plannedItems && plannedItems.length >= 1" class="pb-1 container">
        <transition-group name="slide-fade">
          <GroceryListItem v-for="item in plannedItems" :item="item" :key="item.id" />
        </transition-group>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-secondary my-4" aria-label="copy list" @click="copyList">
            {{ t('buttons.copyList') }}
            <font-awesome-icon :icon="['fas', 'copy']" class="trash-icon-item" />
          </button>
        </div>
      </div>

      <div class="container px-3 mb-4">
        <div class="bg-warning p-1 rounded">
          <h3 class="text-white m-2 p-1">
            {{ t('itemList') }}
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </h3>
        </div>
      </div>

      <div class="container" v-if="filteredItemsByFirstLetter">
        <div v-for="(entry, index) in filteredItemsByFirstLetter" :key="index">
          <div class="mt-5 mb-3">
            <strong>{{ entry[0] }}</strong>
          </div>
          <transition-group name="slide-fade">
            <GroceryListItemUnplanned v-for="(item, index) in onlyListItems(entry)" :item="item" :key="index" />
          </transition-group>
        </div>
        <div class="d-flex justify-content-end my-4">
          <button
            v-if="groceryList.length >= 1"
            class="btn btn-outline-secondary mx-2 mb-1"
            aria-label="delete grocery list"
            @click="deleteGrocerylist"
          >
            {{ t('buttons.deleteAll') }}
            <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash-icon-item" />
          </button>
        </div>
      </div>
    </div>
    <img class="illustration mb-5" alt="" src="../assets/supplylist-illustration.svg" />
    <QuantityInput v-if="showQuantityInput" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useListsStore } from '@/stores/lists'
import { toast } from 'vue3-toastify'
import type { ListItem } from '@/types/listitem'
import QuantityInput from './QuantityInputComponent.vue'
import GroceryListForm from './GroceryListForm.vue'
import GroceryListItem from './GroceryListItem.vue'
import GroceryListItemUnplanned from './GroceryListItemUnplanned.vue'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/config'

const { t } = useI18n()

const listStore = useListsStore()
const configStore = useConfigStore()

const showQuantityInput = computed(() => configStore.showQuantityInput && configStore.itemToShow !== undefined)

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

const onlyListItems = (array: (ListItem | string)[]): ListItem[] => {
  return array.filter((entry): entry is ListItem => {
    return typeof entry === 'object' && entry !== null && 'name' in entry
  })
}
</script>

<style scoped>
textarea {
  resize: none;
  overflow: hidden;
}
</style>
