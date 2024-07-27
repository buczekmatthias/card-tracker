<template>
  <div class="p-container flex flex-col gap-4">
    <TrackerShare v-if="showShare" @closeShare="showShare = false" ref="shareComponent" />
    <GemTracker ref="tracker" />
    <CardSlots @updateOwnedSlots="updateTracker" />
    <CardGroup v-for="(group, i) in cards" :key="group.name" :group="group" :index="i" :rarity="group.name" @updateCard="updateGroupCards" @completeGroup="completeGroup" @resetGroup="resetGroup" />
  </div>
  <SharePanel>
    <ShareButton @click="showShare = true" />
  </SharePanel>
</template>

<script setup>
import CardSlots from "@/components/Tracker/CardSlots.vue";
import GemTracker from "@/components/Tracker/GemTracker.vue";
import TrackerShare from "@/components/Tracker/Share.vue";
import CardGroup from "@/components/Tracker/CardGroup.vue";
import SharePanel from "@/components/SharePanel.vue";
import ShareButton from "@/components/ShareButton.vue";

import { ref } from "vue";

const cards = ref(JSON.parse(localStorage.getItem("cards")));

const tracker = ref(null);

const shareComponent = ref(null);

const showShare = ref(false);

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
