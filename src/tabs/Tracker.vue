<template>
  <div class="w-full max-w-4xl flex flex-col gap-4">
    <CardSlots />
    <div class="flex gap-2 items-center border border-solid border-slate-300/30 rounded-md p-3.5">
      <Icon
        icon="octicon:info-16"
        height="28"
      />
      <p class="text-sm">
        <a
          href="https://thetower.tools/"
          class="text-sky-500"
          >thetower.tools</a
        >
        has lab calculator you can use to discover times & costs of cards and masteries related labs
      </p>
    </div>
    <input
      v-model="search"
      class="border border-solid border-slate-300/30 rounded-md p-3 w-full !ring-0 !outline-none"
      placeholder="Search card by name"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <Card
        v-for="[card, content] in Object.entries(filteredCards)"
        :key="card"
        :name="card"
        :content="content"
        @cardUpdate="saveChanges"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { Icon } from "@iconify/vue";
import CardSlots from "@/components/Tracker/CardSlots.vue";
import Card from "@/components/Tracker/Card.vue";

const cards = ref(JSON.parse(localStorage.getItem("cards")));

const search = ref("");

const filteredCards = computed(() => {
  if (!search) return cards.value;

  return Object.keys(cards.value).reduce((filtered, key) => {
    if (key.toLowerCase().includes(search.value.toLowerCase())) {
      filtered[key] = cards.value[key];
    }

    return filtered;
  }, {});
});

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
