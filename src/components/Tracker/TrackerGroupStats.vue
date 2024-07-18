<template>
  <Container class="col-span-full tracker-grid border-2" :class="{ 'items-center': stats.required === 0 }">
    <p class="text-2xl" :class="{ 'col-span-full': stats.required !== 0 }">{{ rarity }}</p>
    <p class="justify-self-end italic" v-if="stats.required === 0">Finished</p>
    <div class="tracker-box">
      <p>Cards obtained</p>
      <p>{{ stats.obtained }} ({{ stats.percent_finished }})%</p>
    </div>
    <div class="tracker-box" v-if="stats.required !== 0">
      <p>Cards required</p>
      <p>{{ stats.required }}</p>
    </div>
    <div class="tracker-box">
      <p>Gems spent</p>
      <p>{{ stats.gems_spent }}</p>
    </div>
    <div class="tracker-box" v-if="stats.required !== 0">
      <p>Gems required</p>
      <p>{{ stats.gems_required }}</p>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

defineProps({
  rarity: String,
  stats: Object,
});
</script>
