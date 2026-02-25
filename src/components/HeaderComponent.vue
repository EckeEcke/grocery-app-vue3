<template>
  <header class="box-shadow position-relative mb-0 mb-sm-5">
    <div class="container d-flex justify-content-between">
      <h1 class="text-white">Meal Planner</h1>
      <div class="d-flex align-items-center">
        <div class="custom-dropdown">
          <div class="selected-option" @click="toggleDropdown" v-html="getFlagForValue(locale)"></div>
          <div class="dropdown-options" id="dropdownOptions">
            <router-link :to="{ params: { locale: 'de' }, query: route.query }" class="option">
              <span class="fi fi-de"></span>
            </router-link>
            <router-link :to="{ params: { locale: 'en' }, query: route.query }" class="option">
              <span class="fi fi-gb"></span>
            </router-link>
            <router-link :to="{ params: { locale: 'es' }, query: route.query }" class="option">
              <span class="fi fi-es"></span>
            </router-link>
            <router-link :to="{ params: { locale: 'fr' }, query: route.query }" class="option">
              <span class="fi fi-fr"></span>
            </router-link>
            <router-link :to="{ params: { locale: 'it' }, query: route.query }" class="option">
              <span class="fi fi-it"></span>
            </router-link>
          </div>
        </div>
        <button class="user-icon" @click="showModal">
          <font-awesome-icon :icon="['fas', 'user']" size="xl" />
          <font-awesome-icon v-if="configStore.userId" class="logged-in" :icon="['fas', 'circle-check']" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()

const configStore = useConfigStore()

const showModal = () => configStore.setShowUserIdModal(true)

function toggleDropdown() {
  const options = document.getElementById('dropdownOptions')
  options!.style.display = options!.style.display === 'flex' ? 'none' : 'flex'
}

function getFlagForValue(value: string) {
  if (value === 'en') return `<span class="fi fi-gb"></span>`
  return `<span class="fi fi-${value}"></span>`
}

const route = useRoute()

window.onclick = function (event) {
  if (!(event.target as Element)?.matches('.selected-option')) {
    document.getElementById('dropdownOptions')!.style.display = 'none'
  }
}
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
.selected-option .fi {
  margin: 0;
  filter: drop-shadow(0 0 8px #000);
}

.user-icon svg {
  width: 1em;
}

.logged-in {
  color: limegreen;
  background: white;
  border-radius: 50%;
}

.custom-dropdown {
  position: relative;
  width: 70px;
}

.selected-option {
  display: flex;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
}

.dropdown-options {
  display: none;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  width: 100%;
  border-top: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 16px;
  background: lightgray;
  margin-top: 20px;
  border-radius: 8px;
}

.option {
  transition: 0.3s;
}

.option:hover {
  transform: scale(1.1);
}

.fi {
  pointer-events: none;
  height: 22px;
  width: 36px;
}
</style>
