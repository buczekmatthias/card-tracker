<template>
  <div class="p-container flex flex-col">
    <div class="sticky top-0 bg-theme">
      <div class="loadout-grid h-24 justify-items-center">
        <div></div>
        <p class="h-full preset" v-for="i in Array.from(Array(5).keys())" :key="i">{{ `Preset ${i + 1}` }}</p>
      </div>
      <div class="loadout-grid py-2">
        <p>Card count</p>
        <p class="text-center" v-for="i in Array.from(Array(5).keys())" :key="i">{{ getCardCount(i) }}</p>
      </div>
    </div>
    <Preset v-for="(card, i) in cards" @updatePreset="updateLoadout" :key="card" :card="card" :cardIndex="i" />
  </div>
</template>

<script setup>
import Preset from "@/components/Loadout/Preset.vue";

import cards from "@/data/cards.json";

import { ref } from "vue";

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const updateLoadout = (isUsed, set, card) => {
  presets.value[set][card].used = isUsed;
  localStorage.setItem("presets", JSON.stringify(presets.value));
};

const getCardCount = (preset) => presets.value[preset].filter((card) => card.used === true).length;
</script>
