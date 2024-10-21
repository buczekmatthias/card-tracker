<template>
  <div class="share-container">
    <p class="text-2xl font-semibold">Tracker data share</p>
    <pre class="flex w-full p-2 rounded-md border border-solid border-zinc-50/50">
          <code class="flex flex-col overflow-auto w-full">
            <p>{{ exportData }}</p>
          </code>
      </pre>
    <select
      v-model="exportType"
      class="p-2"
    >
      <option
        :value="option.value"
        v-for="option in options"
        :key="option"
      >
        {{ option.label }}
      </option>
    </select>
    <button
      class="share-btn"
      @click="copyResult"
    >
      Copy data
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getCardsDataExportString, getSlotsExportString, getTrackerExportString } from "@/data/trackerShare";

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
