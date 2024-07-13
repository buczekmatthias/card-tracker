<template>
  <Container class="tracker-grid">
    <p class="container-header col-span-full mb-0">Gem tracker</p>
    <div class="tracker-box">
      <p>Cards obtained</p>
      <p>{{ obtainedCards }} ({{ cardCompletePercent }}%)</p>
    </div>
    <div class="tracker-box">
      <p>Cards required</p>
      <p>{{ requiredCards }}</p>
    </div>
    <div class="tracker-box">
      <p>Cards gems required</p>
      <p>{{ requiredCardGems }}</p>
    </div>
    <div class="tracker-box">
      <p>Cards gems spent</p>
      <p>{{ (obtainedCards + requiredCards) * 20 - requiredCardGems }}</p>
    </div>
    <TrackerGroupStats class="border-card-common" :stats="commonStats" rarity="Common" />
    <TrackerGroupStats class="border-card-rare" :stats="rareStats" rarity="Rare" />
    <TrackerGroupStats class="border-card-epic" :stats="epicStats" rarity="Epic" />
    <div class="col-span-full grid grid-cols-3 gap-2 border-b border-solid border-b-container pb-6 -mb-3.5">
      <p class="container-subheader col-span-full mb-2">Card chances</p>
      <div class="tracker-box" v-for="(chance, type) in cardChances" :key="type">
        <p>{{ type }}</p>
        <p>{{ chance }}%</p>
      </div>
    </div>
    <p class="container-subheader col-span-full mb-2">Slots</p>
    <div class="tracker-box">
      <p>Slots gems required</p>
      <p>{{ slotsCost }}</p>
    </div>
    <div class="tracker-box">
      <p>Slots gems spent</p>
      <p>{{ slotsGemsSpent }}</p>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import TrackerGroupStats from "./TrackerGroupStats.vue";

import cards from "@/data/cards.json";
import { getRequiredCards, getCardChance, getGroupData } from "@/data/cardLevels";
import { slotsCostToMax, gemsSpentSoFar } from "@/data/cardSlots";
import { ref } from "vue";

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

const requiredCards = ref(getRequiredCards(storageCards.value));
const obtainedCards = ref(cards.length * 80 - requiredCards.value);
const requiredCardGems = ref(requiredCards.value * 20);
const cardCompletePercent = ref(((obtainedCards.value / (cards.length * 80)) * 100).toFixed(2));

const commonStats = ref(getGroupData(0));
const rareStats = ref(getGroupData(1));
const epicStats = ref(getGroupData(2));

const cardChances = ref(getCardChance());

const slotsCost = ref(slotsCostToMax(localStorage.getItem("ownedSlots") || 1));
const slotsGemsSpent = ref(gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1));

const refreshTracker = () => {
  storageCards.value = JSON.parse(localStorage.getItem("cards"));

  requiredCards.value = getRequiredCards(storageCards.value);
  obtainedCards.value = cards.length * 80 - requiredCards.value;
  requiredCardGems.value = requiredCards.value * 20;
  cardCompletePercent.value = ((obtainedCards.value / (cards.length * 80)) * 100).toFixed(2);

  commonStats.value = getGroupData(0);
  rareStats.value = getGroupData(1);
  epicStats.value = getGroupData(2);

  cardChances.value = getCardChance();

  slotsCost.value = slotsCostToMax(localStorage.getItem("ownedSlots") || 1);
  slotsGemsSpent.value = gemsSpentSoFar(localStorage.getItem("ownedSlots") || 1);
};

defineExpose({ refreshTracker });
</script>
