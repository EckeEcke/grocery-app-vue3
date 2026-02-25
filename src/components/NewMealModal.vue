<template>
  <div v-if="showNewMealModal">
    <div class="backdrop" @click="hide()"></div>
    <CookBookForm />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CookBookForm from './CookBookForm.vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

const showNewMealModal = computed(() => configStore.showNewMealModal)

const hide = () => useConfigStore().setShowNewMealModal(false)
</script>
