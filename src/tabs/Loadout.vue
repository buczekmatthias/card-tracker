<template>
  <div class="flex flex-col pb-0 self-center w-full max-w-2xl">
    <div class="sticky top-0 bg-theme border-b border-solid border-b-zinc-50/50 pb-2">
      <div class="loadout-grid h-24 justify-items-center">
        <div></div>
        <p
          class="h-full preset"
          v-for="i in Array.from(Array(5).keys())"
          :key="i"
        >
          {{ `Preset ${i + 1}` }}
        </p>
      </div>
      <div class="loadout-grid py-2">
        <p>Card count</p>
        <p
          class="text-center"
          v-for="i in Array.from(Array(5).keys())"
          :key="i"
        >
          {{ getCardCount(i) }}
        </p>
      </div>
    </div>
    <Card
      v-for="card in cards"
      :key="card"
      :card="card"
      @updatePreset="updateLoadout($event, card)"
    />
  </div>
</template>

<script setup>
import Card from "@/components/Loadout/Card.vue";

import { cards } from "@/data/cards.js";

import { ref } from "vue";

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const updateLoadout = (set, card) => {
  if (presets.value[set].includes(card)) {
    presets.value[set] = presets.value[set].filter((c) => c !== card);
  } else {
    presets.value[set].push(card);
  }
  localStorage.setItem("presets", JSON.stringify(presets.value));
};

const getCardCount = (preset) => presets.value[preset].length;
</script>
