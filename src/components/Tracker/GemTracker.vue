<template>
  <Container class="tracker-grid">
    <p class="container-header col-span-full">Gem tracker</p>
    <div>
      <p>Cards obtained</p>
      <p>{{ obtainedCards }} ({{ cardCompletePercent }}%)</p>
    </div>
    <div>
      <p>Cards required</p>
      <p>{{ requiredCards }}</p>
    </div>
    <div>
      <p>Gem cards required</p>
      <p>{{ requiredCardGems }}</p>
    </div>
    <div>
      <p>Gem cards spent</p>
      <p>{{ (obtainedCards + requiredCards) * 20 - requiredCardGems }}</p>
    </div>
    <Container class="border-card-common col-span-full tracker-grid" :class="{ 'items-center': commonStats.required === 0 }">
      <p class="text-2xl" :class="{ 'col-span-full': commonStats.required !== 0 }">Common</p>
      <template v-if="commonStats.required !== 0">
        <div>
          <p>Cards obtained</p>
          <p>{{ commonStats.obtained }} ({{ commonStats.percent_finished }}%)</p>
        </div>
        <div>
          <p>Cards required</p>
          <p>{{ commonStats.required }}</p>
        </div>
        <div>
          <p>Gems required</p>
          <p>{{ commonStats.gems_required }}</p>
        </div>
        <div>
          <p>Gems spent</p>
          <p>{{ commonStats.gems_spent }}</p>
        </div>
      </template>
      <p class="justify-self-end" v-else>Finished</p>
    </Container>
    <Container class="border-card-rare col-span-full tracker-grid" :class="{ 'items-center': rareStats.required === 0 }">
      <p class="text-2xl" :class="{ 'col-span-full': rareStats.required !== 0 }">Rare</p>
      <template v-if="rareStats.required !== 0">
        <div>
          <p>Cards obtained</p>
          <p>{{ rareStats.obtained }} ({{ rareStats.percent_finished }})%</p>
        </div>
        <div>
          <p>Cards required</p>
          <p>{{ rareStats.required }}</p>
        </div>
        <div>
          <p>Gems required</p>
          <p>{{ rareStats.gems_required }}</p>
        </div>
        <div>
          <p>Gems spent</p>
          <p>{{ rareStats.gems_spent }}</p>
        </div>
      </template>
      <p class="justify-self-end" v-else>Finished</p>
    </Container>
    <Container class="border-card-epic col-span-full tracker-grid" :class="{ 'items-center': epicStats.required === 0 }">
      <p class="text-2xl" :class="{ 'col-span-full': epicStats.required !== 0 }">Epic</p>
      <template v-if="epicStats.required !== 0">
        <div>
          <p>Cards obtained</p>
          <p>{{ epicStats.obtained }} ({{ epicStats.percent_finished }}%)</p>
        </div>
        <div>
          <p>Cards required</p>
          <p>{{ epicStats.required }}</p>
        </div>
        <div>
          <p>Gems required</p>
          <p>{{ epicStats.gems_required }}</p>
        </div>
        <div>
          <p>Gems spent</p>
          <p>{{ epicStats.gems_spent }}</p>
        </div>
      </template>
      <p class="justify-self-end" v-else>Finished</p>
    </Container>
    <div>
      <p>Gens slot required</p>
      <p>{{ slotsCost }}</p>
    </div>
    <div>
      <p>Gems slot spent</p>
      <p>{{ slotsGemsSpent }}</p>
    </div>
    <div class="col-span-full grid grid-cols-3 gap-2">
      <p class="container-subheader col-span-full mb-2">Card chances</p>
      <div v-for="(chance, type) in cardChances" :key="type">
        <p>{{ type }}</p>
        <p>{{ chance }}%</p>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

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

<style lang="postcss">
.tracker-grid {
  @apply grid grid-cols-2 gap-6;
}
.tracker-box {
  @apply flex flex-col gap-2;
}
</style>
