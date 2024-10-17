<template>
  <div class="flex flex-col gap-3 self-center w-full cardsTriple:max-w-6xl">
    <div
      class="p-3 bg-opacity-80 rounded-md -mb-1 flex flex-col"
      :class="{
        'bg-card-common': rarity === 'Common',
        'bg-card-rare': rarity === 'Rare',
        'bg-card-epic': rarity === 'Epic',
      }"
    >
      <div
        class="w-full flex gap-3 items-center justify-between mb-4"
        v-if="isGroupFinished"
      >
        <p class="container-header mb-0">{{ group.name }}</p>
        <button
          class="toggle-underline"
          @click="collapseGroup = !collapseGroup"
        >
          {{ collapseGroup ? "Show" : "Hide" }} cards
        </button>
      </div>
      <p
        class="w-full container-header"
        v-else
      >
        {{ group.name }}
      </p>
      <div class="flex">
        <p>{{ group.cards.length }} cards</p>
        <p
          v-if="isGroupFinished"
          class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 pl-2"
        >
          Group finished
        </p>
        <button
          v-else
          class="border-l-2 border-l-[#fafafa] border-opacity-20 border-solid ml-2 px-2 toggle-underline"
          @click="completeGroup"
          v-if="!isGroupFinished"
        >
          Complete group
        </button>
      </div>
    </div>
    <div
      class="grid gap-2 grid-cols-1 cardsDouble:grid-cols-2 cardsTriple:grid-cols-3 items-start"
      v-if="!collapseGroup"
    >
      <Card
        v-for="(card, ind) in group.cards"
        :key="card.name"
        :card="card"
        :info="info[card.name]"
        @cardUpdate="updateCard($event, ind)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { getGroupData } from "@/data/cardLevels";
import { info } from "@/data/cardsInfo";

import Card from "@/components/Tracker/Card.vue";

const props = defineProps({
  group: Object,
  index: Number,
  rarity: String,
});

const emit = defineEmits(["updateCard", "completeGroup", "resetGroup"]);

const cards = ref(props.group.cards);

const isGroupFinished = ref(getGroupData(props.index).required === 0);

const collapseGroup = ref(false);

const checkGroupsFinished = () => {
  isGroupFinished.value = getGroupData(props.index).required === 0;
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

onMounted(() => {
  collapseGroup.value = isGroupFinished.value;
});
</script>
