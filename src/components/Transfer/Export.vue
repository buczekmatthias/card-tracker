<template>
  <div class="flex flex-col gap-3">
    <p class="text-3xl font-semibold">Export</p>
    <Info message="Modified data may cause app to not work properly.<br/><strong>Do not modify downloaded file</strong>" />
    <a
      href=""
      download="card_tracker_export.json"
      ref="exportDownload"
    >
      <Button class="share-btn">Download data as JSON</Button>
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import Info from "@/components/Info.vue";
import Button from "@/components/Button.vue";

const exportDownload = ref(null);

const exportData = () => {
  const exportData = {
    owned_card_slots: parseInt(localStorage.getItem("ownedSlots")),
    vault_card_slots: parseInt(localStorage.getItem("vaultSlots")),
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
