<template>
  <Container
    class="grid grid-cols-1 cardsDouble:grid-cols-2 gap-6 w-full cardsTriple:max-w-6xl self-center"
    :class="{ 'cardsTriple:grid-cols-2': requiredCards === 0 }"
  >
    <p class="container-header col-span-full mb-0">Gem tracker</p>
    <div class="flex flex-col gap-4 col-span-full">
      <p class="container-subheader">Cards</p>
      <div class="grid grid-cols-2 cardsTriple:grid-cols-4 gap-4 gap-y-6">
        <div class="tracker-box">
          <p>Cards obtained</p>
          <p>{{ obtainedCards.toLocaleString() }} ({{ cardCompletePercent }}%)</p>
        </div>
        <div
          class="tracker-box"
          v-if="requiredCards > 0"
        >
          <p>Cards required</p>
          <p>{{ requiredCards.toLocaleString() }}</p>
        </div>
        <div
          class="tracker-box"
          v-if="requiredCardGems > 0"
        >
          <p>Cards gems required</p>
          <p>{{ requiredCardGems.toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Cards gems spent</p>
          <p>{{ ((obtainedCards + requiredCards) * 20 - requiredCardGems).toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Masteries stones required</p>
          <p>{{ masteriesRequiredStones.toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Masteries stones spent</p>
          <p>{{ masteriesSpentStones.toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-4"
      v-if="requiredCards > 0"
    >
      <p class="container-subheader">Card chances</p>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="tracker-box"
          v-for="(chance, type) in cardChances"
          :key="type"
        >
          <p>{{ type }}</p>
          <p>{{ chance }}%</p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 cardsDouble:col-start-1 cardsDouble:row-start-3"
      :class="{ 'col-span-full ': requiredCards === 0 }"
    >
      <p class="container-subheader col-span-full">Slots</p>
      <div
        class="grid gap-4"
        :class="requiredCards === 0 ? 'grid-cols-4' : 'grid-cols-2'"
      >
        <div class="tracker-box">
          <p>Slots gems required</p>
          <p>{{ slotsGemsCost.toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Slots gems spent</p>
          <p>{{ slotsGemsSpent.toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Slots keys required</p>
          <p>{{ slotsKeysCost.toLocaleString() }}</p>
        </div>
        <div class="tracker-box">
          <p>Slots keys spent</p>
          <p>{{ slotsKeysSpent.toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div class="col-span-full grid grid-cols-1 gap-4 cardsDouble:grid-cols-2 cardsTriple:grid-cols-3 items-start">
      <TrackerGroupStats
        class="border-card-common"
        :stats="commonStats"
        rarity="Common"
      />
      <TrackerGroupStats
        class="border-card-rare"
        :stats="rareStats"
        rarity="Rare"
      />
      <TrackerGroupStats
        class="border-card-epic"
        :stats="epicStats"
        rarity="Epic"
      />
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import TrackerGroupStats from "./TrackerGroupStats.vue";

import cards from "@/data/cards.json";
import { getRequiredCards, getCardChance, getGroupData } from "@/data/cardLevels";
import { slotsCostToMax, gemsSpentSoFar, getGemSlotsCount, keysSpentSoFar, getTotalCost } from "@/data/cardSlots";
import { ref } from "vue";
import { getRequiredStones, getSpentStones } from "@/data/masteries";

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

const requiredCards = ref(getRequiredCards(storageCards.value));
const obtainedCards = ref(cards.length * 80 - requiredCards.value);
const requiredCardGems = ref(requiredCards.value * 20);
const cardCompletePercent = ref(((obtainedCards.value / (cards.length * 80)) * 100).toFixed(2));

const commonStats = ref(getGroupData(0));
const rareStats = ref(getGroupData(1));
const epicStats = ref(getGroupData(2));

const cardChances = ref(getCardChance());

const ownedSlots = ref(parseInt(localStorage.getItem("ownedSlots")));
const gemSlotsCount = getGemSlotsCount();

const slotsGemsCost = ref(slotsCostToMax(ownedSlots.value));
const slotsGemsSpent = ref(gemsSpentSoFar(ownedSlots.value));
const slotsKeysCost = ref(getTotalCost(ownedSlots.value > gemSlotsCount ? ownedSlots.value - gemSlotsCount : 0));
const slotsKeysSpent = ref(keysSpentSoFar(ownedSlots.value > gemSlotsCount ? ownedSlots.value - gemSlotsCount : 0));

const masteriesRequiredStones = ref(getRequiredStones(storageCards.value));
const masteriesSpentStones = ref(getSpentStones(storageCards.value));

const refreshTracker = () => {
  ownedSlots.value = parseInt(localStorage.getItem("ownedSlots"));
  storageCards.value = JSON.parse(localStorage.getItem("cards"));

  requiredCards.value = getRequiredCards(storageCards.value);
  obtainedCards.value = cards.length * 80 - requiredCards.value;
  requiredCardGems.value = requiredCards.value * 20;
  cardCompletePercent.value = ((obtainedCards.value / (cards.length * 80)) * 100).toFixed(2);

  commonStats.value = getGroupData(0);
  rareStats.value = getGroupData(1);
  epicStats.value = getGroupData(2);

  cardChances.value = getCardChance();

  slotsGemsCost.value = slotsCostToMax(ownedSlots.value);
  slotsGemsSpent.value = gemsSpentSoFar(ownedSlots.value);
  slotsKeysCost.value = getTotalCost(ownedSlots.value > gemSlotsCount ? ownedSlots.value - gemSlotsCount : 0);
  slotsKeysSpent.value = keysSpentSoFar(ownedSlots.value > gemSlotsCount ? ownedSlots.value - gemSlotsCount : 0);

  masteriesRequiredStones.value = getRequiredStones(storageCards.value);
  masteriesSpentStones.value = getSpentStones(storageCards.value);
};

defineExpose({ refreshTracker });
</script>
