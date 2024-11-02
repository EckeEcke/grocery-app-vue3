<template>
  <div>
    <div class="backdrop" @click="emit('hide')"></div>
    <div class="modal-detailpage card border-0" v-if="item">
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
        <button
          class="btn btn-outline-secondary mx-3"
          aria-label="close modal"
          @click="emit('hide')"
        >
          {{ $t('buttons.cancel') }}
        </button>
        <button
          class="btn btn-primary"
          aria-label="add selection and close modal"
          @click="submit(item?.name)"
        >
          {{ $t('buttons.submitAndClose') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { ListItem } from '../types/listitem'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits(['hide'])

const props = defineProps({
  item: {
    type: Object as PropType<ListItem>
  },
  groceryList: Array as PropType<ListItem[]>
})

const input = ref<HTMLElement | null>(null)

const quantity = ref('')

onMounted(() => {
  input.value!.focus()
})

const submit = (element: string) => {
  const indexGrocerylist = props.groceryList!.findIndex((listitem) => listitem.name === element)
  let clonedGroceryList = [...props.groceryList!]
  clonedGroceryList[indexGrocerylist].quantity = quantity.value
  localStorage.setItem('grocerylist', JSON.stringify(clonedGroceryList))
  emit('hide')
}
</script>
