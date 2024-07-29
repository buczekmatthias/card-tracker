<template>
  <div class="grid grid-cols-[auto_1fr] gap-x-2 items-center italic">
    <svg class="h-5 fill-white/65" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path>
      <path d="M11 11H13V17H11zM11 7H13V9H11z"></path>
    </svg>
    <p class="font-light text-white/65">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
