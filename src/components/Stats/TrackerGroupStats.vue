<template>
  <div
    class="border-2 flex flex-col gap-4 rounded-md p-2 self-start"
    :class="getBorderColor()"
  >
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
    <div class="grid grid-cols-2 gap-6">
      <div class="tracker-box">
        <p class="tracker-subheader">Cards obtained</p>
        <p>{{ stats.obtained.toLocaleString() }} ({{ stats.percent_finished }}%)</p>
      </div>
      <div
        class="tracker-box"
        v-if="stats.required !== 0"
      >
        <p class="tracker-subheader">Cards required</p>
        <p>{{ stats.required.toLocaleString() }}</p>
      </div>
      <div class="tracker-box">
        <p class="tracker-subheader">Gems spent</p>
        <p>{{ stats.gems_spent.toLocaleString() }}</p>
      </div>
      <div
        class="tracker-box"
        v-if="stats.required !== 0"
      >
        <p class="tracker-subheader">Gems required</p>
        <p>{{ stats.gems_required.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rarity: String,
  stats: Object,
});

const getBorderColor = () => `border-card-${props.rarity}`;
</script>
