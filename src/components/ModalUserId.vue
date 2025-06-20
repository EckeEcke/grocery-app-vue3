<template>
  <div>
    <div class="backdrop" @click="hideModal"></div>
    <div class="modal-detail-page card border-0">
      <h4 class="card-header bg-warning border-0 text-white">{{ t('userModal.headline') }}</h4>
      <div class="card-body text-start">
        <p v-if="userName" class="text-center">
          {{ t('userModal.signedInAs') }}
          <span class="fw-bold"> {{ userName }}</span>
        </p>
        <p v-if="!userId">{{ t('userModal.intro') }}</p>
        <div class="d-flex flex-column justify-content-center">
          <button
            v-if="userId"
            class="btn btn-primary new-id-button mx-auto"
            @click="copyLinkToClipboard"
          >
            {{ t('userModal.shareLink') }}
          </button>
          <template v-else>
            <LoadingSpinner v-if="isLoading" />
            <template v-else>
              <input
                type="text"
                maxlength="20"
                v-model="userNameInput"
                class="form-control w-100 mb-2"
                :placeholder="t('userModal.placeholderName')"
              />
              <button class="btn btn-primary new-id-button mx-auto" @click="createEntry" :disabled="userNameInput.length <= 0">
                {{ t('userModal.generateNewId') }}
              </button>
            </template>
          </template>

          <p class="text-center my-4">{{ t('userModal.or') }}</p>
          <form @submit.prevent="searchForId">
            <input
              v-model="inputValue"
              class="form-control inline mb-2"
              type="text"
              :placeholder="t('userModal.placeholder')"
            />
            <button :disabled="inputValue.length < 8" class="btn btn-primary" type="submit">
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary" aria-label="close modal" @click="hideModal()">
          {{ t('buttons.cancel') }}
        </button>
        <button v-if="userId" class="btn btn-primary ms-3" @click="logout">
          {{ t('buttons.logout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListsStore } from '@/stores/lists'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from './LoadingSpinner.vue'

const configStore = useConfigStore()
const listsStore = useListsStore()
const { t } = useI18n()

const hideModal = () => configStore.setShowUserIdModal(false)

const userId = computed(() => configStore.userId)

const isLoading = ref(false)
const inputValue = ref('')
const router = useRouter()
const route = useRoute()

const emit = defineEmits(['idGenerated'])

const searchForId = async () => {
  const response = await fetch(`/api/getEntry?id=${inputValue.value}`)
  if (!response.ok) {
    throw new Error('Id not found')
  }
  const responseData = await response.json()
  const receivedGroceryList = responseData.entry.data.groceryList
  await router.push({ path: '/', query: { ...route.query, id: inputValue.value } })
  configStore.setUserId(inputValue.value)
  configStore.setUserName(responseData.entry.userName)
  listsStore.setGroceryList(receivedGroceryList)
  hideModal()
}

const userNameInput = ref('')
const userName = computed(() => configStore.userName)

const createEntry = async () => {
  isLoading.value = true
  const response = await fetch('/api/createEntry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        groceryList: listsStore.groceryList,
        mealPlan: listsStore.mealPlan
      },
      userName: userNameInput.value
    })
  })

  isLoading.value = false

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  await router.push({ path: '/', query: { ...route.query, id: data.entry._id } })
  configStore.setUserId(data.entry._id)
  configStore.setUserName(userNameInput.value)
  hideModal()
  emit('idGenerated', data.entry._id)
}

const copyLinkToClipboard = () => {
  const currentUrl = window.location.href

  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      toast.success(t('toasts.copiedLinkToClipboard'), {
        autoClose: 1000
      })
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
    })
}

const logout = () => {
  window.location.href = window.location.origin
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
