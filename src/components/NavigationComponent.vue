<template>
  <div>
    <div class="backdrop" @click="closeMenu()"></div>
    <nav class="sidebar bg-white">
      <div class="bg-warning p-2 heading">
        <div id="language-switch">
          <button
            class="language-selector"
            :class="{ inactive: locale !== 'en' }"
            data-value="en"
            tabindex="0"
            @click="changeLocale('en')"
          >
            EN
          </button>
          <span class="divider-pipe"></span>
          <button
            class="language-selector"
            :class="{ inactive: locale !== 'de' }"
            data-value="de"
            tabindex="0"
            @click="changeLocale('de')"
          >
            DE
          </button>
        </div>
        <button
          id="sidebar-btn-close"
          class="btn text-white fs-2"
          aria-label="close navigation menu"
          @click="closeMenu()"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      <div>
        <h2 class="pt-5 pb-2 m-0">Vue Meal Planner</h2>
        <ul>
          <li class="py-2"><a href="https://eckeecke.github.io/">Homepage</a></li>
          <li class="py-2">
            <a href="https://www.triggerscore.de">Triggerscore</a>
          </li>
          <li class="py-2"><a href="https://eckeecke.itch.io/school-fight">School Fight</a></li>
          <li class="py-2"><a href="https://eckeecke.github.io/shooter">JS Space Shooter</a></li>
          <li class="py-2"><a href="https://eckeecke.github.io/pong">JS Pong</a></li>
          <li class="py-2"><a href="https://eckeecke.github.io/templelooter">Temple Looter</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { locale } = useI18n()

const router = useRouter()
const route = useRoute()

const configStore = useConfigStore()

const changeLocale = (lang: string) => {
  locale.value = lang
  router.push({
    query: {
      ...route.query,
      locale: lang
    }
  })
}

const closeMenu = () => configStore.setShowNavMenu(false)
</script>

<style scoped>
.language-selector {
  background: transparent;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 24px;
  padding: 0 16px;
  opacity: 1;
}

.language-selector.inactive {
  opacity: 0.7;
}

.language-selector:first-of-type {
  border-right: 2px solid white;
}

#sidebar-btn-close svg {
  margin-right: 0;
  color: white;
}

ul {
  width: 100vw;
  max-width: 450px;
  margin: 0 auto 50px;
}

li {
  width: 80%;
  margin: 1rem auto;
  font-size: 1.5rem;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  font-weight: bolder;
}

.sidebar {
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100vw;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  right: -100%;
  top: 0;
  transition: right 0.3s ease;
  animation: slide-in 0.3s linear;
  animation-fill-mode: forwards;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0 10px 36px 0,
    rgba(0, 0, 0, 0.06) 0 0 0 1px;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 576px) {
  li {
    font-size: 2rem;
  }
}

@keyframes slide-in {
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
}
</style>
