<template>
  <button
    v-if="showScrollBtn"
    class="scroll-btn btn bg-primary"
    aria-label="scroll back to top"
    @click="scrollToTop"
  >
    <font-awesome-icon :icon="['fas', 'chevron-up']" />
  </button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const showScrollBtn = ref(false)

const toggleScrollButton = () => {
  showScrollBtn.value = window.scrollY > window.innerHeight * 0.75;
}
window.addEventListener('scroll', toggleScrollButton)
const scrollToTop = () => window.scrollTo(0, 0)

onUnmounted(() => window.removeEventListener('scroll', toggleScrollButton))
</script>
