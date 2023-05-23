<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showSpinner = ref(true);

// const emit = defineEmits(['dotsLoader']);
const emit = defineEmits<{
    (event:'dotsLoader'): void
}>();

onMounted(() => {
  console.log(`the component is now mounted.`)
  setTimeout(() => {
    console.log('5s have passed');
    showSpinner.value = false;
    emit('dotsLoader');
      }, 5000);
})

</script>

<template>

<div class="loader-wrapper">
    <div v-if="showSpinner" class="loader-dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>

</template>

<style scoped lang="scss">

.loader-wrapper {
    display: flex;
    justify-content: center;
}
.loader-dots {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader-dots div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: $lightyellow;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}


</style>