<template>
  <Container class="tracker-grid">
    <!-- TODO:  -->
    <p class="container-header col-span-full">Gem tracker</p>
    <div>
      <p>Cards obtained</p>
      <p>{{ obtainedCards }}</p>
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
      <p>Cards %</p>
      <p>{{ cardCompletePercent }}</p>
    </div>
    <Container class="border-card-common col-span-full tracker-grid">
      <p class="col-span-full text-2xl">Common</p>
      <div>
        <p>Cards required</p>
        <p>{{ getGroupData(0).required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ getGroupData(0).obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ getGroupData(0).gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ getGroupData(0).percent }}</p>
      </div>
    </Container>
    <Container class="border-card-rare col-span-full tracker-grid">
      <p class="col-span-full text-2xl">Rare</p>
      <div>
        <p>Cards required</p>
        <p>{{ getGroupData(1).required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ getGroupData(1).obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ getGroupData(1).gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ getGroupData(1).percent }}</p>
      </div>
    </Container>
    <Container class="border-card-epic col-span-full tracker-grid">
      <p class="col-span-full text-2xl">Epic</p>
      <div>
        <p>Cards required</p>
        <p>{{ getGroupData(2).required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ getGroupData(2).obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ getGroupData(2).gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ getGroupData(2).percent }}</p>
      </div>
    </Container>
    <div>
      <p>Slots cost</p>
      <p>{{ slotsCost }}</p>
    </div>
    <div>
      <p>Slots %</p>
      <p>{{ slotsPercent }}</p>
    </div>
    <div class="col-span-full grid grid-cols-3 gap-2">
      <p class="container-subheader col-span-full mb-3">Card chances</p>
      <div v-for="(chance, type) in getCardChance()" :key="type">
        <p>{{ type }}</p>
        <p>{{ chance }}%</p>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

import cards from "@/data/cards.json";
import { getRequiredToMax, getCardChance } from "@/data/cardLevels";
import { getSlotMaxPercent, slotsCostToMax } from "@/data/cardSlots";
import { ref } from "vue";

const storageCards = JSON.parse(localStorage.getItem("cards"));

const slotsCost = slotsCostToMax(localStorage.getItem("ownedSlots"));
const slotsPercent = getSlotMaxPercent(localStorage.getItem("ownedSlots"));

const getRequiredCards = () => {
  let required = 0;

  for (let group of storageCards) {
    for (let card of group.cards) {
      required += getRequiredToMax(card.lvl, card.owned);
    }
  }

  return required;
};

const getGroupData = (index) => {
  let cards = storageCards[index].cards;

  let required = 0;

  for (let card of cards) {
    required += getRequiredToMax(card.lvl, card.owned);
  }

  let obtained = cards.length * 80 - required;

  return {
    required: required,
    obtained: obtained,
    gems: required * 20,
    percent: (100 - (required / (80 * cards.length)) * 100).toFixed(2),
  };
};

const requiredCards = ref(getRequiredCards());
const obtainedCards = ref(cards.length * 80 - requiredCards.value);
const requiredCardGems = ref(requiredCards.value * 20);
const cardCompletePercent = ref((obtainedCards.value / (cards.length * 80)).toFixed(2));
</script>

<style lang="postcss">
.tracker-grid {
  @apply grid grid-cols-2 gap-4;
}
.tracker-box {
  @apply flex flex-col gap-2;
}
</style>
