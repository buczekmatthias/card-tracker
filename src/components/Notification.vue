<template>
  <div class="fixed top-2 left-2.5 z-50 flex gap-3 border-2 border-solid border-container bg-theme rounded-lg max-w-2xl w-[calc(100%-1.25rem)] p-2.5">
    <svg class="h-8 fill-active-share" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path>
      <path d="M11 11H13V17H11zM11 7H13V9H11z"></path>
    </svg>
    <div class="flex flex-col gap-3">
      <p class="text-2xl font-semibold">{{ header }}</p>
      <p class="font-light">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  header: String,
  message: String,
});
</script>
