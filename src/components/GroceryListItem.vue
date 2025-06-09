<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else class="row px-3 hover-zoom">
    <div class="col-10 px-0 mx-0 text-nowrap overflow-hidden hover-zoom">
      <button
        v-if="item"
        class="btn btn-outline-secondary w-100 mx-0 text-start"
        :key="item.name"
        aria-label="check single item"
        @click="checkItem(item)"
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
import { type PropType, ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

defineProps({
  item: {
    type: Object as PropType<ListItem>,
    required: true
  }
})

const listStore = useListsStore()
const configStore = useConfigStore()
const isLoading = ref(false)

const checkItem = async (item: ListItem) => {
  isLoading.value = true
  await listStore.setItemPlanned(item)
  isLoading.value = false
}

const createModal = (item: ListItem) => {
  configStore.setItemToShow(item)
  configStore.setShowQuantityInput(true)
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
