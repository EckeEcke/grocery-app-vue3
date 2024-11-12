<template>
  <div v-if="item">
    <div class="backdrop" @click="hide()"></div>
    <div class="modal-detailpage card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ item.name }}</h4>
      <div class="card-body" style="text-align: left">
        <p>{{ $t('quantity', { item: item.name }) }}</p>
        <input
          ref="input"
          type="text"
          class="form-control"
          v-model="quantity"
          :placeholder="t('placeholders.addQuantity')"
        />
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary mx-3" aria-label="close modal" @click="hide()">
          {{ $t('buttons.cancel') }}
        </button>
        <button
          class="btn btn-primary"
          aria-label="add selection and close modal"
          @click="submit(item.name)"
        >
          {{ $t('buttons.submitAndClose') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/config'
import { useListsStore } from '@/stores/lists'

const { t } = useI18n()

const configStore = useConfigStore()
const listsStore = useListsStore()

const groceryList = computed(() => listsStore.groceryList)

const item = computed(() => configStore.itemToShow)
const input = ref<HTMLElement | null>(null)

const quantity = ref('')

onMounted(() => {
  input.value!.focus()
})

const submit = (element: string) => {
  const indexGrocerylist = groceryList.value.findIndex((listitem) => listitem.name === element)
  let clonedGroceryList = [...groceryList.value]
  clonedGroceryList[indexGrocerylist].quantity = quantity.value
  localStorage.setItem('grocerylist', JSON.stringify(clonedGroceryList))
  hide()
}

const hide = () => configStore.setShowQuantityInput(false)
</script>
