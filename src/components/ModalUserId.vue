<template>
  <div>
    <div class="backdrop" @click="hideModal"></div>
    <div class="modal-detailpage card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ $t('userModal.headline') }}</h4>
      <div class="card-body" style="text-align: left">
        <p>
          {{ $t('userModal.intro') }}
        </p>
        <div class="d-flex flex-column justify-content-center">
          <button class="btn btn-primary new-id-button mx-auto" @click="getNewId">{{ $t('userModal.generateNewId') }}</button>
          <p class="text-center">{{ $t('userModal.or') }}</p>
          <form @submit.prevent="searchForId">
            <input v-model="inputValue" class="form-control inline" type="text" :placeholder="$t('userModal.placeholder')" />
            <button :disabled="inputValue.length !== 8" class="btn btn-primary" @click="searchForId">
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary" aria-label="close modal" @click="hideModal()">
          {{ $t('buttons.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const configStore = useConfigStore()

const hideModal = () => configStore.setShowUserIdModal(false)

const inputValue = ref('')
const router = useRouter()
const route = useRoute()

const emit = defineEmits(['idGenerated'])

const searchForId = () => {
  router.push({ path: '/', query: { ...route.query, id: inputValue.value } })
  hideModal()
}

const getNewId = () => {
  const newId = generateRandomId()
  hideModal()
  emit('idGenerated', newId)
}

const generateRandomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
</script>

<style scoped>
p {
  margin-top: 1rem;
}

form {
  width: 100%;
}

form button {
  margin-top: -2px;
}

input {
  display: inline-block;
  margin-right: 6px;
  width: calc(100% - 48px);
}

button:disabled {
  opacity: 0.6;
}

button svg {
  margin: 0;
}

.new-id-button {
  width: 100%;
}
</style>
