<template>
  <div class="h-screen max-w-2xl w-full fixed top-0 left-1/2 -translate-x-1/2 z-30 bg-theme bg-opacity-80 flex items-center justify-center p-2.5" id="export">
    <div class="p-4 bg-theme max-h-[85%] overflow-auto w-full border border-solid border-container rounded-md flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <p class="text-3xl font-semibold">{{ title }}</p>
        <button class="hover:text-active text-lg" @click="$emit('closeShare')">Close</button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});

defineEmits(["closeShare"]);
</script>
