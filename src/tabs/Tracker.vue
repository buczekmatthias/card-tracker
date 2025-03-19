<template>
  <div class="w-full max-w-4xl flex flex-col gap-4">
    <CardSlots />
    <div class="flex gap-2 items-center border border-solid border-slate-300/30 rounded-md p-3.5">
      <Icon
        icon="octicon:info-16"
        height="28"
      />
      <p class="text-sm">
        On
        <a
          href="https://thetower.tools/"
          class="text-sky-500"
          >thetower.tools</a
        >
        you can find lab calc you can use to discover times & costs related cards and masteries labs
      </p>
    </div>
    <Card
      v-for="[card, content] in Object.entries(cards)"
      :key="card"
      :name="card"
      :content="content"
      @cardUpdate="saveChanges"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import { Icon } from "@iconify/vue";
import CardSlots from "@/components/Tracker/CardSlots.vue";
import Card from "@/components/Tracker/Card.vue";

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
