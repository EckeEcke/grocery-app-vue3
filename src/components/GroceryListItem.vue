<template>
  <div class="row px-3 hover-zoom">
    <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden hover-zoom">
      <button
        v-if="item"
        class="btn btn-outline-secondary w-100 mx-0"
        :key="item.name"
        aria-label="check single item"
        style="text-align: left"
        @click="checkSingleItem(item.name)"
      >
        {{ item.name }}
        <span v-if="item.quantity !== ''">{{ item.quantity }}</span>
      </button>
    </div>
    <div class="col-1 px-0 mx-0">
      <button
        class="btn btn-outline-secondary align-bottom delete-item-btn"
        aria-label="open modal"
        @click="createModal(item)"
      >
        <font-awesome-icon :icon="['fas', 'sort']" class="trash-icon-item" />
      </button>
    </div>
    <div class="col-1 px-0 mx-0">
      <button
        class="btn btn-outline-secondary align-bottom delete-item-btn"
        aria-label="check item"
        @click="checkItem(item)"
      >
        <font-awesome-icon :icon="['fas', 'check']" class="trash-icon-item" />
      </button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { useListsStore } from '@/stores/lists'
import type { ListItem } from '@/types/listitem'
import { computed, type PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<ListItem>,
    required: true
  }
})

const listStore = useListsStore()
const configStore = useConfigStore()
const groceryList = computed(() => listStore.groceryList)

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

const createModal = (item: ListItem) => {
  document.documentElement.style.overflow = 'hidden'

  configStore.setItemToShow(item)
  configStore.setShowQuantityInput(true)
}
</script>
