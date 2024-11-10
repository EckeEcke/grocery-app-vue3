<template>
  <div
    class="btn-toolbar no-br-top-mobile justify-content-center rounded-top no-br-mobile overflow-hidden sticky-mobile bg-white"
  >
    <div class="btn-group w-100" role="group">
      <button
        class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
        :class="{ inactive: displayedTab === Tab.cookbook }"
        aria-label="show grocerylist"
        @click="setDisplayedTab(Tab.groceries)"
      >
        <h3 class="text-white mb-0 px-0">{{ $t('groceryList') }}</h3>
      </button>
      <button
        class="btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder"
        :class="{ inactive: displayedTab === Tab.groceries }"
        aria-label="show cookbook"
        @click="setDisplayedTab(Tab.cookbook)"
      >
        <h3 class="text-white mb-0 px-0">{{ $t('mealPlan') }}</h3>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { Tab } from '../types/tabs'
import { computed } from 'vue'

const configStore = useConfigStore()

const displayedTab = computed(() => configStore.displayedTab)

const setDisplayedTab = (tab: Tab) => {
  configStore.setDisplayedTab(tab)
}
</script>
