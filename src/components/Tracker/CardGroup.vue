<template>
  <div class="flex flex-col gap-3">
    <div
      class="p-3 bg-opacity-90 rounded-md -mb-1 flex flex-wrap"
      :class="{
        'bg-card-common': rarity === 'Common',
        'bg-card-rare': rarity === 'Rare',
        'bg-card-epic': rarity === 'Epic',
      }"
    >
      <div class="w-full flex gap-3 items-center justify-between mb-4">
        <p class="container-header mb-0">{{ group.name }}</p>
        <button class="underline" v-if="isGroupFinished" @click="collapseGroup = !collapseGroup">{{ collapseGroup ? "Show" : "Hide" }} cards</button>
      </div>
      <p>{{ group.cards.length }} cards</p>
      <p class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 pl-2" v-if="isGroupFinished">Group finished</p>
      <button class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 px-2 underline" @click="completeGroup" v-if="!isGroupFinished">Complete group</button>
      <button class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 px-2 underline" @click="resetGroup" v-else>Reset group</button>
    </div>
    <template v-if="!collapseGroup">
      <Card v-for="(card, ind) in group.cards" :key="card.name" :card="card" @cardUpdate="updateCard($event, ind)" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getGroupData } from "@/data/cardLevels";

import Card from "@/components/Tracker/Card.vue";

const props = defineProps({
  group: Object,
  index: Number,
  rarity: String,
});

const emit = defineEmits(["updateCard", "completeGroup", "resetGroup"]);

const cards = ref(props.group.cards);

const isGroupFinished = ref(false);

const collapseGroup = ref(false);

const checkGroupsFinished = () => {
  isGroupFinished.value = getGroupData(props.index).required === 0;
  collapseGroup.value = isGroupFinished.value;
};

const updateCard = (card, card_id) => {
  cards.value[card_id] = card;
  emit("updateCard", props.index, cards.value);
  checkGroupsFinished();
};

const completeGroup = () => {
  emit("completeGroup", props.index);
  checkGroupsFinished();
};

const resetGroup = () => {
  emit("resetGroup", props.index);
  checkGroupsFinished();
};

onMounted(() => {
  checkGroupsFinished();
});
</script>
