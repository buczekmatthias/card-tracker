<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-6xl">
    <div class="grid grid-cols-2 gap-5 lg:row-start-1 lg:row-end-3 border border-solid border-slate-300/30 rounded-md p-2 lg:p-3">
      <p class="col-span-full text-3xl self-center">Cards</p>
      <div class="tracker-box">
        <p class="tracker-subheader">Cards obtained</p>
        <p>{{ data.obtainedCards.toLocaleString() }} ({{ data.cardCompletePercent }}%)</p>
      </div>
      <div
        class="tracker-box"
        v-if="data.requiredCards > 0"
      >
        <p class="tracker-subheader">Cards required</p>
        <p>{{ data.requiredCards.toLocaleString() }}</p>
      </div>
      <div
        class="tracker-box"
        v-if="data.requiredCardGems > 0"
      >
        <p class="tracker-subheader">Cards gems required</p>
        <p>{{ data.requiredCardGems.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Cards gems spent</p>
        <p>{{ data.spentCardGems.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Masteries stones required</p>
        <p>{{ data.masteriesRequiredStones.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Masteries stones spent</p>
        <p>{{ data.masteriesSpentStones.toLocaleString() }}</p>
      </div>
    </div>
    <div
      class="grid grid-cols-2 gap-5 lg:col-start-2 border border-solid border-slate-300/30 rounded-md p-2 lg:p-3"
      :class="{ 'lg:row-start-1 lg:row-end-3': data.requiredCards === 0 }"
    >
      <p class="col-span-full text-3xl self-center">Slots</p>
      <div class="tracker-box">
        <p class="tracker-subheader">Slots gems required</p>
        <p>{{ data.slotsGemsCost.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Slots gems spent</p>
        <p>{{ data.slotsGemsSpent.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Slots keys required</p>
        <p>{{ data.slotsKeysCost.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Slots keys spent</p>
        <p>{{ data.slotsKeysSpent.toLocaleString() }}</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-5 lg:row-start-2 border border-solid border-slate-300/30 rounded-md p-2 lg:p-3"
      v-if="data.requiredCards > 0"
    >
      <p class="text-3xl">Card chances</p>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="tracker-box"
          v-for="(chance, type) in data.cardChances"
          :key="type"
        >
          <p>{{ type }}</p>
          <p>{{ chance }}%</p>
        </div>
      </div>
    </div>
    <div class="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-solid border-slate-300/30 rounded-md p-2 lg:p-3">
      <p class="col-span-full text-3xl">Stats</p>
      <TrackerGroupStats
        class="border-card-common"
        :stats="data.commonStats"
        rarity="Common"
      />
      <TrackerGroupStats
        class="border-card-rare"
        :stats="data.rareStats"
        rarity="Rare"
      />
      <TrackerGroupStats
        class="border-card-epic"
        :stats="data.epicStats"
        rarity="Epic"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getRequiredCards, getCardChance, getGroupData } from "@/data/cardLevels";
import { slotsCostToMax, gemsSpentSoFar, keysSpentSoFar, getTotalCost } from "@/data/cardSlots";
import { getRequiredStones, getSpentStones } from "@/data/masteries";

import TrackerGroupStats from "@/components/Stats/TrackerGroupStats.vue";

const getData = () => {
  const storageCards = ref(JSON.parse(localStorage.getItem("cards")));
  const requiredCards = ref(getRequiredCards(storageCards.value));
  const obtainedCards = ref(Object.keys(storageCards.value).length * 80 - requiredCards.value);

  const ownedSlots = ref(parseInt(localStorage.getItem("ownedSlots")));
  const ownedVaultSlots = ref(parseInt(localStorage.getItem("vaultSlots")));

  return {
    ownedSlots: ownedSlots.value,
    ownedVaultSlots: ownedVaultSlots.value,

    requiredCards: requiredCards.value,
    obtainedCards: obtainedCards.value,
    requiredCardGems: requiredCards.value * 20,
    spentCardGems: (obtainedCards.value + requiredCards.value) * 20 - requiredCards.value * 20,
    cardCompletePercent: ((obtainedCards.value / (Object.keys(storageCards.value).length * 80)) * 100).toFixed(2),

    commonStats: getGroupData("common"),
    rareStats: getGroupData("rare"),
    epicStats: getGroupData("epic"),

    cardChances: getCardChance(),

    slotsGemsCost: slotsCostToMax(ownedSlots.value),
    slotsGemsSpent: gemsSpentSoFar(ownedSlots.value),
    slotsKeysCost: getTotalCost(ownedVaultSlots.value),
    slotsKeysSpent: keysSpentSoFar(ownedVaultSlots.value),

    masteriesRequiredStones: getRequiredStones(storageCards.value),
    masteriesSpentStones: getSpentStones(storageCards.value),
  };
};

const data = ref(getData());
</script>
