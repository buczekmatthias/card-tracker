<template>
  <div class="p-container flex flex-col gap-8">
    <Container>
      <CardSlots />
    </Container>
    <div v-for="(group, i) in cards" :key="group.name" class="flex flex-col gap-3">
      <p
        class="container-header p-3 bg-opacity-90 rounded-md -mb-1"
        :class="{
          'bg-card-common': i === 0,
          'bg-card-rare': i === 1,
          'bg-card-epic': i === 2,
        }"
      >
        {{ group.name }}
      </p>
      <Container v-for="(card, ind) in group.cards" :key="card.name">
        <Card :card="card" @cardUpdate="updateCard($event, i, ind)" />
      </Container>
    </div>
  </div>
</template>

<script setup>
import CardSlots from "@/components/CardSlots.vue";
import Container from "@/components/Container.vue";
import Card from "@/components/Card.vue";

const cards = JSON.parse(localStorage.getItem("cards"));

const updateCard = (card, group, card_id) => {
  cards[group].cards[card_id] = card;
  localStorage.setItem("cards", JSON.stringify(cards));
};
</script>
