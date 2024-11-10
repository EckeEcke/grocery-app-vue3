<template>
  <header class="box-shadow position-relative mb-0 mb-sm-5">
    <div class="container d-flex justify-content-between">
      <h1 class="text-white">Vue Meal Planner</h1>
      <button
        v-if="!isShownNavMenu && !isStandAlone"
        id="toggle-nav-BTN"
        class="btn"
        style="font-size: 2em"
        aria-label="show navigation menu"
        @click="showMenu"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { computed } from 'vue'

const configStore = useConfigStore()

const isShownNavMenu = computed(() => configStore.showNavMenu)

const isStandAlone = computed(() => window.matchMedia('(display-mode: standalone)').matches)

const showMenu = () => configStore.setShowNavMenu(true)
</script>
