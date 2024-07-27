<template>
  <Notification :header="notification.header" :message="notification.message" v-if="showNotification" />
  <div class="e-i-container">
    <p class="text-2xl font-semibold">Import</p>
    <input type="file" ref="importFile" class="cursor-pointer border border-solid border-container px-2 py-4 rounded-lg" accept="application/json" />
    <Button @click="handleImport">Import data</Button>
    <Info message="Provide unchanged JSON file downloaded via export. Anything else might cause tracker to not work anymore until clearing browser local storage" />
  </div>
</template>

<script setup>
import { ref } from "vue";

import Notification from "./Notification.vue";
import Button from "./Button.vue";
import Info from "./Info.vue";

const importData = ref(null);

const importFile = ref(null);

const showNotification = ref(false);

const notification = ref({});

const handleImport = () => {
  if (importFile.value.files.length > 0) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      if (Object.keys(data).length < 1) {
        sendNotification({
          header: "Data import",
          message: "Data import failed. Empty object",
        });

        return;
      }

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

      sendNotification({
        header: "Data import",
        message: "Data has been imported. Reloading...",
      });

      setTimeout(() => {
        location.reload();
      }, 2501);
    };

    reader.readAsText(importFile.value.files[0]);
  }
};

const sendNotification = (content) => {
  notification.value = content;
  showNotification.value = true;

  setTimeout(() => {
    showNotification.value = false;
    notification.value = {};
  }, 2500);

  importData.value = null;
};
</script>
