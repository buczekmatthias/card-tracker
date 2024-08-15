<template>
  <div class="e-i-container row-start-1">
    <Notification header="Data share" message="Data copied to clipboard" v-if="copiedMessage" />
    <p class="text-2xl font-semibold">What to share?</p>
    <pre class="flex w-full p-2 rounded-md border border-solid border-separator/50">
          <code class="flex flex-col overflow-auto w-full">
            <p>{{ exportData }}</p>
          </code>
      </pre>
    <select v-model="exportType" class="p-2">
      <option :value="option.value" v-for="option in options" :key="option">{{ option.label }}</option>
    </select>
    <Button @click="copyResult">Copy data to share</Button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getCardsDataExportString, getSlotsExportString, getTrackerExportString } from "@/data/trackerShare";

import Notification from "../Notification.vue";
import Button from "../Button.vue";

const options = ref([
  {
    label: "Tracker + cards + slots",
    value: "tracker_cards_slots",
  },
  {
    label: "Tracker + cards",
    value: "tracker_cards",
  },
  {
    label: "Tracker + slots",
    value: "tracker_slots",
  },
  {
    label: "Cards + slots",
    value: "cards_slots",
  },
  {
    label: "Tracker",
    value: "tracker",
  },
  {
    label: "Cards",
    value: "cards",
  },
  {
    label: "Slots",
    value: "slots",
  },
]);

const exportData = ref("");

const exportType = ref("tracker_cards_slots");

const copiedMessage = ref(false);

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

const loadExportData = () => {
  exportData.value = "";

  if (["tracker_cards_slots", "tracker_slots", "cards_slots", "slots"].includes(exportType.value)) {
    exportData.value += getSlotsExportString();
  }
  if (["tracker_cards_slots", "tracker_cards", "cards_slots", "cards"].includes(exportType.value)) {
    if (exportData.value.length > 0) exportData.value += "\n\n";

    exportData.value += getCardsDataExportString(storageCards.value, ["tracker_cards_slots", "tracker_cards"].includes(exportType.value));
  }
  if (["tracker_cards_slots", "tracker_cards", "tracker_slots", "tracker"].includes(exportType.value)) {
    if (exportData.value.length > 0 && !exportType.value.includes("cards")) exportData.value += "\n\n";

    exportData.value += getTrackerExportString(storageCards.value);
  }
};

const copyResult = () => {
  if (!copiedMessage.value) {
    navigator.clipboard.writeText(exportData.value);
    copiedMessage.value = true;

    setTimeout(() => (copiedMessage.value = false), 2500);
  }
};

onMounted(() => {
  loadExportData();
});

watch(
  () => exportType.value,
  () => {
    loadExportData();
  }
);
</script>
