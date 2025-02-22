<template>
  <div class="spinner" />
</template>

<style>
.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  background: #fff;
  box-shadow:
    -24px 0 #fff,
    24px 0 #fff;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
  33% {
    background: #fff;
    box-shadow:
      -24px 0 #ff9500c8,
      24px 0 #fff;
  }
  66% {
    background: #ff9500c8;
    box-shadow:
      -24px 0 #fff,
      24px 0 #fff;
  }
  100% {
    background: #fff;
    box-shadow:
      -24px 0 #fff,
      24px 0 #ff9500c8;
  }
}
</style>
