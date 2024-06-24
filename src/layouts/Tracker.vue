<template>
  <div class="p-container flex flex-col gap-4">
    <GemTracker ref="tracker" />
    <CardSlots @updateOwnedSlots="updateTracker()" />
    <div v-for="(group, i) in cards" :key="group.name" class="flex flex-col gap-3">
      <div
        class="p-3 bg-opacity-90 rounded-md -mb-1 flex flex-wrap"
        :class="{
          'bg-card-common': i === 0,
          'bg-card-rare': i === 1,
          'bg-card-epic': i === 2,
        }"
      >
        <div class="w-full flex gap-3 items-center justify-between mb-4">
          <p class="container-header mb-0">{{ group.name }}</p>
          <p class="cursor-pointer" v-if="isGroupFinished[i]" @click="collapseGroup[i] = !collapseGroup[i]">{{ collapseGroup[i] ? "Show" : "Hide" }} cards</p>
        </div>
        <p>{{ group.cards.length }} cards</p>
        <p class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 pl-2" v-if="isGroupFinished[i]">Group finished</p>
      </div>
      <template v-if="!collapseGroup[i]">
        <Card v-for="(card, ind) in group.cards" :key="card.name" :card="card" @cardUpdate="updateCard($event, i, ind)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import CardSlots from "@/components/Tracker/CardSlots.vue";
import Card from "@/components/Tracker/Card.vue";
import GemTracker from "@/components/Tracker/GemTracker.vue";

import { getGroupData } from "@/data/cardLevels";
import { ref, onMounted } from "vue";

const cards = ref(JSON.parse(localStorage.getItem("cards")));

const tracker = ref(null);

const isGroupFinished = ref([false, false, false]);

const updateCard = (card, group, card_id) => {
  cards.value[group].cards[card_id] = card;
  localStorage.setItem("cards", JSON.stringify(cards.value));
  updateTracker();
  for (let i = 0; i < 3; i++) {
    checkGroupsFinished(i);
  }
};

const updateTracker = () => tracker.value.refreshTracker();

const checkGroupsFinished = (i) => (isGroupFinished.value[i] = getGroupData(i).required === 0);

const collapseGroup = ref([checkGroupsFinished(0), checkGroupsFinished(1), checkGroupsFinished(2)]);

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    checkGroupsFinished(i);
  }
});
</script>
