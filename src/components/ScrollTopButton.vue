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

const toggleScrollbutton = () => {
  if (window.scrollY > window.innerHeight * 0.75) {
    showScrollBtn.value = true
  } else {
    showScrollBtn.value = false
  }
}
window.addEventListener('scroll', toggleScrollbutton)
const scrollToTop = () => window.scrollTo(0, 0)

onUnmounted(() => window.removeEventListener('scroll', toggleScrollbutton))
</script>
