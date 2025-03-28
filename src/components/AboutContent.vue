<template>
  <div class="px-0 rounded no-br-mobile border-0 mx-auto mb-5 about-container">
    <div class="card border-0">
      <div class="mt-2">
        <h3 class="m-2 p-2">{{ t('about.title') }}</h3>
      </div>
      <div class="card-body p-2 pt-0">
        <div class="p-3 pt-0">
          <p>
            {{ t('about.intro') }}
          </p>
          <img src="../assets/logo.png" alt="" class="vue-logo mt-2 mb-4" />
          <p>
            <b>{{ t('about.featuresIncluded') }}</b>
          </p>

          <ul class="list-about">
            <li>{{ t('about.feature1') }}</li>
            <li>{{ t('about.feature2') }}</li>
            <li>{{ t('about.feature3') }}</li>
            <li>{{ t('about.feature4') }}</li>
            <li>{{ t('about.feature5') }}</li>
            <li>{{ t('about.feature6') }}</li>
            <li>{{ t('about.feature7') }}</li>
            <li>{{ t('about.feature8') }}</li>
            <li>{{ t('about.feature9') }}</li>
            <li>
              {{ t('about.githubLink') }}
              <a href="https://github.com/EckeEcke/grocery-app-vue3" target="_blank">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<style scoped>
.about-container {
  position: sticky;
  top: 2rem;
}

.list-about,
p {
  text-align: left;
}

.list-about li {
  list-style-type: disc;
}

.vue-logo {
  max-width: 30%;
}

a {
  color: black;
}
</style>
