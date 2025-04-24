<template>
  <div class="grid grid-cols-4 w-full border border-solid border-slate-300/30 rounded-md p-3 gap-4">
    <div
      class="flex flex-col gap-1"
      :class="{ 'col-span-2': rarity.includes('slots') }"
      v-for="[rarity, val] in Object.entries(getCardsCounts())"
      :key="rarity"
    >
      <p>{{ capitalize(rarity) }}</p>
      <p>{{ val }}</p>
    </div>
  </div>
</template>

<script setup>
import capitalize from "@/composables/capitalize.js";

import { getCardsCounts } from "@/data/counter.js";
</script>
