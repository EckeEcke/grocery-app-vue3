<template>
  <div
    class="btn-toolbar no-br-top-mobile justify-content-center rounded-top no-br-mobile overflow-hidden sticky-mobile bg-white"
  >
    <div class="btn-group w-100" role="group">
    <button
        class="fs-3 btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder text-white"
        :class="{ inactive: displayedTab === Tab.groceries }"
        aria-label="show cookbook"
        @click="setDisplayedTab(Tab.cookbook)"
      >
        {{ t('mealPlan') }}
      </button>
      <button
        class="fs-3 btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder text-white"
        :class="{ inactive: displayedTab === Tab.cookbook }"
        aria-label="show grocery list"
        @click="setDisplayedTab(Tab.groceries)"
      >
        {{ t('groceryList') }}
      </button> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { Tab } from '@/types/tabs'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const configStore = useConfigStore()

const { t } = useI18n()

const displayedTab = computed(() => configStore.displayedTab)

const setDisplayedTab = (tab: Tab) => {
  configStore.setDisplayedTab(tab)
}
</script>

<style scoped>
.btn-group :first-child {
  border-top-right-radius: 0!important;
}

.btn-group :last-child {
  border-top-left-radius: 0!important;
}

@media (max-width: 575px) {
  .btn-group,
  .btn-group button {
    border-radius: 0!important;
  }
}
</style>
