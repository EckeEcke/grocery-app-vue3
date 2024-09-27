<template>
  <div>
    <div class="backdrop" @click="() => emit('close')"></div>
    <nav class="sidebar bg-white">
      <div class="bg-warning py-5" />
      <div>
        <h2 class="pt-5 pb-2 m-0">Vue Meal Planner</h2>
        <ul>
          <li class="py-2"><a href="https://eckeecke.github.io/">Home</a></li>
          <li class="py-2">
            <a href="https://nifty-hopper-c1da01.netlify.app/">React Travel Blog</a>
          </li>
          <li class="py-2"><a href="https://eckeecke.github.io/shooter">JS Space Shooter</a></li>
          <li class="py-2"><a href="https://eckeecke.itch.io/school-fight">School Fight</a></li>
          <li class="py-2"><a href="https://eckeecke.github.io/pong">JS Pong</a></li>
          <li class="py-2">
            <a href="https://adoring-galileo-71fde2.netlify.app/">React Todo App</a>
          </li>
          <li class="py-2"><a href="https://eckeecke.github.io/templelooter">Temple Looter</a></li>
        </ul>
        <button
          id="sidebar-btn-close"
          class="btn text-white"
          style="font-size: 2.5em"
          aria-label="close navigation menu"
          @click="() => emit('close')"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style scoped>
#toggle-nav-BTN {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
}

#sidebar-btn-close {
  position: absolute;
  top: 12px;
  right: 2px;
}

#sidebar-btn-close svg {
  margin-right: 0;
  color: white;
}

ul {
  width: 100vw;
  max-width: 450px;
  margin: 0px auto 50px;
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
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
