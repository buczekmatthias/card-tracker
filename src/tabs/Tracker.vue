<template>
  <div class="w-full max-w-4xl flex flex-col gap-4">
    <CardSlots />
    <div class="flex gap-2 items-center bg-slate-600/5 border border-solid border-slate-300/30 rounded-md p-3.5">
      <Icon
        icon="octicon:info-16"
        height="32"
      />
      <p class="text-sm">Use lab calculator you can find <a href="https://thetower.tools/">thetower.tools</a> to discover cards and masteries labs times and costs</p>
    </div>
    <div class="self-center bg-nav p-2 rounded-lg flex gap-4">
      <button
        v-for="rarityTab in ['common', 'rare', 'epic']"
        :key="rarityTab"
        class="capitalize cursor-pointer py-2 px-4 rounded-md"
        :class="{
          'bg-transparent !text-slate-50': cardRarity !== rarityTab,
          'bg-card-common text-nav': cardRarity === 'common',
          'bg-card-rare': cardRarity === 'rare',
          'bg-card-epic': cardRarity === 'epic',
        }"
        @click="cardRarity = rarityTab"
      >
        {{ rarityTab }} ({{ Object.keys(cardsFilter(rarityTab)).length }})
      </button>
    </div>
    <CardGroup
      :rarity="cardRarity"
      :cards="cardsFilter(cardRarity)"
      @cardUpdate="saveChanges"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import cardsFilter from "@/composables/cardsFilter";

import { Icon } from "@iconify/vue";
import CardSlots from "@/components/Tracker/CardSlots.vue";
import CardGroup from "@/components/Tracker/CardGroup.vue";

const cardRarity = ref("common");

const cards = ref(JSON.parse(localStorage.getItem("cards")));

const saveChanges = (name, content) => {
  Object.keys(content).forEach((c) => {
    if (["lvl", "owned"].includes(c)) {
      content[c] = parseInt(content[c]);
    }
  });

  cards.value[name] = content;
  localStorage.setItem("cards", JSON.stringify(cards.value));
};
</script>
