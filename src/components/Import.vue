<template>
  <div class="share-container">
    <p class="text-2xl font-semibold">Import</p>
    <Info message="Provide unmodified exported JSON file. <strong>Modified data might cause tracker to stop working</strong>" />
    <input
      type="file"
      ref="importFile"
      class="cursor-pointer border border-solid border-container px-2 py-4 rounded-lg"
      accept="application/json"
    />
    <button
      class="share-btn"
      @click="handleImport"
    >
      Import data
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Info from "./Info.vue";

const importFile = ref(null);

const handleImport = () => {
  if (importFile.value.files.length > 0) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      if ("owned_card_slots" in data) {
        localStorage.setItem("ownedSlots", data.owned_card_slots);
      }

      if ("target_card_slot" in data) {
        localStorage.setItem("targetSlot", data.target_card_slot);
      }

      if ("cards" in data) {
        localStorage.setItem("cards", JSON.stringify(data.cards));
      }

      if ("presets" in data) {
        localStorage.setItem("presets", JSON.stringify(data.presets));
      }

      location.reload();
    };

    reader.readAsText(importFile.value.files[0]);
  }
};
</script>
