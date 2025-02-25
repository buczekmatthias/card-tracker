<template>
  <div class="flex flex-wrap justify-center gap-3">
    <Card
      v-for="[name, content] in Object.entries(cards)"
      :key="name"
      :name="name"
      :content="content"
      @cardUpdate="$emit('cardUpdate', name, content)"
    />
  </div>
</template>

<script setup>
import Card from "@/components/Tracker/Card.vue";

defineProps({
  rarity: String,
  cards: Object,
});

defineEmits(["cardUpdate"]);
</script>
