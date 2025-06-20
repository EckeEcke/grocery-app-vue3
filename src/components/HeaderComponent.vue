<template>
  <header class="box-shadow position-relative mb-0 mb-sm-5">
    <div class="container d-flex justify-content-between">
      <h1 class="text-white">Meal Planner</h1>
      <div class="d-flex align-items-center">
        <button class="user-icon" @click="showModal">
          <font-awesome-icon :icon="['fas', 'user']" size="xl" />
          <font-awesome-icon
            v-if="configStore.userId"
            class="logged-in"
            :icon="['fas', 'circle-check']"
          />
        </button>
        <button
          v-if="!isShownNavMenu && !isStandAlone"
          id="toggle-nav-BTN"
          class="btn fs-2"
          aria-label="show navigation menu"
          @click="showMenu"
        >
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
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

const showModal = () => configStore.setShowUserIdModal(true)
</script>

<style>
.user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  margin-right: 1rem;
}

.user-icon svg,
#toggle-nav-BTN svg {
  margin: 0;
  filter: drop-shadow(0 0 8px #000);
}

.logged-in {
  color: limegreen;
  background: white;
  border-radius: 50%;
}
</style>
