<template>
  <div class="p-container flex flex-col gap-4">
    <GemTracker ref="tracker" />
    <CardSlots @updateOwnedSlots="updateTracker" />
    <CardGroup
      v-for="(group, i) in cards"
      :key="group.name"
      :group="group"
      :index="i"
      :rarity="group.name"
      @updateCard="updateGroupCards"
      @completeGroup="completeGroup"
      @resetGroup="resetGroup"
    />
  </div>
</template>

<script setup>
import CardSlots from "@/components/Tracker/CardSlots.vue";
import GemTracker from "@/components/Tracker/GemTracker.vue";
import CardGroup from "@/components/Tracker/CardGroup.vue";

import { ref } from "vue";

const cards = ref(JSON.parse(localStorage.getItem("cards")));

const tracker = ref(null);

const updateTracker = () => tracker.value.refreshTracker();

const updateGroupCards = (i, groupCards) => {
  cards.value[i].cards = groupCards;
  localStorage.setItem("cards", JSON.stringify(cards.value));
  updateTracker();
};

const completeGroup = (ind) => {
  cards.value[ind].cards.map((card) => (card.lvl = 7));
  localStorage.setItem("cards", JSON.stringify(cards.value));
  updateTracker();
};

const resetGroup = (ind) => {
  cards.value[ind].cards.map((card) => (card.lvl = 0));
  localStorage.setItem("cards", JSON.stringify(cards.value));
  updateTracker();
};
</script>
