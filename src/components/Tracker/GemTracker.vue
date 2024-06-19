<template>
  <Container class="tracker-grid">
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
        <p>{{ commonStats.required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ commonStats.obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ commonStats.gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ commonStats.percent }}</p>
      </div>
    </Container>
    <Container class="border-card-rare col-span-full tracker-grid">
      <p class="col-span-full text-2xl">Rare</p>
      <div>
        <p>Cards required</p>
        <p>{{ rareStats.required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ rareStats.obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ rareStats.gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ rareStats.percent }}</p>
      </div>
    </Container>
    <Container class="border-card-epic col-span-full tracker-grid">
      <p class="col-span-full text-2xl">Epic</p>
      <div>
        <p>Cards required</p>
        <p>{{ epicStats.required }}</p>
      </div>
      <div>
        <p>Cards obtained</p>
        <p>{{ epicStats.obtained }}</p>
      </div>
      <div>
        <p>Gems required</p>
        <p>{{ epicStats.gems }}</p>
      </div>
      <div>
        <p>% finished</p>
        <p>{{ epicStats.percent }}</p>
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
import { getRequiredToMax, getCardChance } from "@/data/cardLevels";
import { getSlotMaxPercent, slotsCostToMax } from "@/data/cardSlots";
import { ref } from "vue";

const storageCards = ref(JSON.parse(localStorage.getItem("cards")));

const getRequiredCards = () => {
  let required = 0;

  for (let group of storageCards.value) {
    for (let card of group.cards) {
      required += getRequiredToMax(card.lvl, card.owned);
    }
  }

  return required;
};

const getGroupData = (index) => {
  let cards = storageCards.value[index].cards;

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

const commonStats = ref(getGroupData(0));
const rareStats = ref(getGroupData(1));
const epicStats = ref(getGroupData(2));

const cardChances = ref(getCardChance());

const slotsCost = ref(slotsCostToMax(localStorage.getItem("ownedSlots")));
const slotsPercent = ref(getSlotMaxPercent(localStorage.getItem("ownedSlots")));

const refreshTracker = () => {
  storageCards.value = JSON.parse(localStorage.getItem("cards"));

  requiredCards.value = getRequiredCards();
  obtainedCards.value = cards.length * 80 - requiredCards.value;
  requiredCardGems.value = requiredCards.value * 20;
  cardCompletePercent.value = (obtainedCards.value / (cards.length * 80)).toFixed(2);

  commonStats.value = getGroupData(0);
  rareStats.value = getGroupData(1);
  epicStats.value = getGroupData(2);

  cardChances.value = getCardChance();

  slotsCost.value = slotsCostToMax(localStorage.getItem("ownedSlots"));
  slotsPercent.value = getSlotMaxPercent(localStorage.getItem("ownedSlots"));
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
