<template>
  <div class="e-i-container">
    <p class="text-2xl font-semibold">Export</p>
    <Info message="Modified data may cause app to not work properly. <strong>Do not modify downloaded file</strong>" />
    <a href="" download="card_tracker_export.json" ref="exportDownload">
      <Button class="w-full">Download data as JSON file</Button>
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import Button from "./Button.vue";
import Info from "./Info.vue";

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
