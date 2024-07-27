<template>
  <Notification header="Data share" message="Data copied to clipboard" v-if="copiedMessage" />
  <ShareBase title="Tracker export" @closeShare="$emit('closeShare')">
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
  </ShareBase>
</template>

<script setup>
import ShareBase from "../ShareBase.vue";

import { onMounted, ref, watch } from "vue";
import { getRequiredCards, getGroupData } from "@/data/cardLevels";
import { gemsSpentSoFar } from "@/data/cardSlots";
import Notification from "../Notification.vue";

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

const exportType = ref("tracker");

const copiedMessage = ref(false);

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

defineEmits(["closeShare"]);

const loadExportData = () => {
  exportData.value = {};

  if (["tracker_cards_slots", "tracker_slots", "cards_slots", "slots"].includes(exportType.value)) {
    exportData.value.slots = {
      owned_card_slots: parseInt(localStorage.getItem("ownedSlots")),
      spent_slots_gems: gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1),
    };
  }
  if (["tracker_cards_slots", "tracker_cards", "cards_slots", "cards"].includes(exportType.value)) {
    exportData.value.cards = storageCards.value.map((entry) => entry.cards.map((card) => ([0, 7].includes(card.lvl) ? { name: card.name, lvl: card.lvl } : card)));
  }
  if (["tracker_cards_slots", "tracker_cards", "tracker_slots", "tracker"].includes(exportType.value)) {
    const required_cards = getRequiredCards(storageCards.value);
    const obtained_cards = cards.length * 80 - required_cards;

    exportData.value.tracker = {
      obtained_cards: obtained_cards,
      required_cards: required_cards,
      required_cards_gems: required_cards * 20,
      spent_cards_gems: (obtained_cards + required_cards) * 20 - required_cards * 20,
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
    navigator.clipboard.writeText(JSON.stringify(exportData.value, null, 2));
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
