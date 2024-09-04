<template>
  <Container class="border-2 flex flex-col gap-4">
    <div class="col-span-full flex justify-between">
      <p class="text-2xl">
        {{ rarity }}
      </p>
      <p
        class="italic"
        v-if="stats.required === 0"
      >
        Finished
      </p>
    </div>
    <div class="tracker-grid">
      <div class="tracker-box">
        <p>Cards obtained</p>
        <p>{{ stats.obtained.toLocaleString() }} ({{ stats.percent_finished }}%)</p>
      </div>
      <div
        class="tracker-box"
        v-if="stats.required !== 0"
      >
        <p>Cards required</p>
        <p>{{ stats.required.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p>Gems spent</p>
        <p>{{ stats.gems_spent.toLocaleString() }}</p>
      </div>
      <div
        class="tracker-box"
        v-if="stats.required !== 0"
      >
        <p>Gems required</p>
        <p>{{ stats.gems_required.toLocaleString() }}</p>
      </div>
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
