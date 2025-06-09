<template>
  <div
    class="btn-toolbar no-br-top-mobile justify-content-center rounded-top no-br-mobile overflow-hidden sticky-mobile bg-white"
  >
    <div class="btn-group w-100" role="group">
      <button
        class="fs-3 btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder text-white"
        :class="{ inactive: displayedTab === Tab.cookbook }"
        aria-label="show grocery list"
        @click="setDisplayedTab(Tab.groceries)"
      >
        {{ $t('groceryList') }}
      </button>
      <button
        class="fs-3 btn btn-warning toggle-btn big py-2 rounded-0 rounded-top no-br-mobile fw-bolder text-white"
        :class="{ inactive: displayedTab === Tab.groceries }"
        aria-label="show cookbook"
        @click="setDisplayedTab(Tab.cookbook)"
      >
        {{ $t('mealPlan') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { Tab } from '@/types/tabs'
import { computed } from 'vue'

const configStore = useConfigStore()

const displayedTab = computed(() => configStore.displayedTab)

const setDisplayedTab = (tab: Tab) => {
  configStore.setDisplayedTab(tab)
}
</script>
