<template>
  <ExportBase title="Tracker export">
    <label class="flex flex-col gap-4">
      <span>What to export?</span>
      <select v-model="exportType">
        <option :value="option.value" v-for="option in options" :key="option">{{ option.label }}</option>
      </select>
    </label>
    <pre class="flex w-full p-2 rounded-md border border-solid border-separator">
        <code class="flex flex-col max-h-96 overflow-auto w-full">
          <p>{{ exportData }}</p>
        </code>
      </pre>
    <button class="border border-solid border-active text-active rounded-md p-3" @click="copyResult">Copy JSON</button>
    <p class="text-center" v-if="copiedMessage">Export content has been copied</p>
  </ExportBase>
</template>

<script setup>
import ExportBase from "../ExportBase.vue";

import { onMounted, ref, watch } from "vue";
import { getRequiredCards, getGroupData } from "@/data/cardLevels";
import { getSlotMaxPercent, slotsCostToMax, gemsSpentSoFar } from "@/data/cardSlots";
import cards from "@/data/cards.json";

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

const exportData = ref({});

const exportType = ref(options.value[0].value);

const copiedMessage = ref(false);

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

const loadExportData = () => {
  exportData.value = {};

  if (["tracker_cards_slots", "tracker_slots", "cards_slots", "slots"].includes(exportType.value)) {
    exportData.value.slots = {
      owned_card_slots: parseInt(localStorage.getItem("ownedSlots")),
      slots_complete_percent: getSlotMaxPercent(localStorage.getItem("ownedSlots")),
      gems_required_to_max_slots: slotsCostToMax(localStorage.getItem("ownedSlots")),
      spent_slots_gems: gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1),
    };
  }
  if (["tracker_cards_slots", "tracker_cards", "cards_slots", "cards"].includes(exportType.value)) {
    exportData.value.cards = storageCards.value.map((entry) => entry.cards);
  }
  if (["tracker_cards_slots", "tracker_cards", "tracker_slots", "tracker"].includes(exportType.value)) {
    const required_cards = getRequiredCards(storageCards.value);
    const obtained_cards = cards.length * 80 - required_cards;

    exportData.value.tracker = {
      obtained_cards: obtained_cards,
      required_cards: required_cards,
      required_cards_gems: required_cards * 20,
      spent_cards_gems: (obtained_cards + required_cards) * 20 - required_cards * 20,
      cards_complete_percent: ((obtained_cards / (cards.length * 80)) * 100).toFixed(2),
      cards: {
        common: getGroupData(0),
        rare: getGroupData(1),
        epic: getGroupData(2),
      },
    };
  }
};

const copyResult = () => {
  if (!copiedMessage.value) {
    navigator.clipboard.writeText(JSON.stringify(exportData.value));
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
