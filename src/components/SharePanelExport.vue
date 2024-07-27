<template>
  <div class="e-i-container">
    <p class="text-2xl font-semibold">Export</p>
    <a href="" download="card_tracker_export.json" ref="exportDownload">
      <Button class="w-full">Download data as JSON file</Button>
    </a>
    <div class="grid grid-cols-[auto_1fr] gap-x-2 italic">
      <svg class="h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z"></path>
        <path d="M11 11H13V17H11zM11 7H13V9H11z"></path>
      </svg>
      <p class="font-light">Do not modify downloaded file. Validation planned to be implemented in future</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import Button from "./Button.vue";

const exportDownload = ref(null);

const exportData = () => {
  const exportData = {
    owned_card_slots: parseInt(localStorage.getItem("ownedSlots")),
    target_card_slot: parseInt(localStorage.getItem("targetSlot")),
    cards: JSON.parse(localStorage.getItem("cards")),
    presets: JSON.parse(localStorage.getItem("presets")),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "text/json" });

  const url = URL.createObjectURL(blob);

  exportDownload.value.href = url;
};

onMounted(() => {
  exportData();
});
</script>
