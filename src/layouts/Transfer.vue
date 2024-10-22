<template>
  <div class="px-container flex flex-col divide-y-2 divide-container w-full max-w-loadout mx-auto">
    <Export />
    <Import />
    <TrackerShare />
    <LoadoutShare />
  </div>
</template>

<script setup>
import Export from "@/components/Export.vue";
import Import from "@/components/Import.vue";
import TrackerShare from "@/components/Tracker/Share.vue";
import LoadoutShare from "@/components/Loadout/Share.vue";
</script>
