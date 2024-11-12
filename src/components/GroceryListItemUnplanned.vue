<template>
  <div class="row px-3 hover-zoom">
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
</template>

<script setup lang="ts">
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

const groceryList = computed(() => listStore.groceryList)

const deleteSingleItem = (element: ListItem) => {
  listStore.deleteSingleItem(element)
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
</script>
