<template>
  <div class="flex flex-col gap-3">
    <p class="text-2xl font-semibold">Tracker data share</p>
    <Select
      v-model="exportType"
      :options="options"
    />
    <pre class="flex w-full p-2 max-h-72 rounded-md border border-solid border-zinc-50/50">
          <code class="flex flex-col overflow-auto w-full">
            <p class="text-sm">{{ exportData }}</p>
          </code>
      </pre>
    <Button @click="copyResult">Copy tracker data</Button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getCardsDataExportString, getSlotsExportString, getTrackerExportString } from "@/data/trackerShare";

import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";

const options = ref({
  tracker_cards_slots: "Tracker + cards + slots",
  tracker_cards: "Tracker + cards",
  tracker_slots: "Tracker + slots",
  cards_slots: "Cards + slots",
  tracker: "Tracker",
  cards: "Cards",
  slots: "Slots",
});

const exportData = ref("");

const exportType = ref("tracker_cards_slots");

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
  navigator.clipboard.writeText(exportData.value);
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
