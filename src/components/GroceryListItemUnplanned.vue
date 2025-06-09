<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="row px-3 hover-zoom">
    <div class="col-11 text-nowrap overflow-hidden px-0 mx-0">
      <button
        class="btn w-100 mx-0 list-btn text-start"
        :class="item.planned ? 'btn-success' : 'btn-outline-secondary'"
        :key="item.name"
        aria-label="push new item from list"
        @click="pushNewItemFromList(item)"
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
import LoadingSpinner from './LoadingSpinner.vue'
import type { ListItem } from '@/types/listitem'
import { type PropType, ref } from 'vue'

defineProps({
  item: {
    type: Object as PropType<ListItem>,
    required: true
  }
})

const listStore = useListsStore()
const isLoading = ref(false)

const deleteSingleItem = (element: ListItem) => {
  listStore.deleteSingleItem(element)
}

const pushNewItemFromList = async (item: ListItem) => {
  isLoading.value = true
  await listStore.setItemPlanned(item)
  isLoading.value = false
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
