<template>
  <div class="flex flex-col gap-8 max-w-5xl w-full md:grid md:grid-cols-2">
    <Export />
    <Import />
    <TrackerShare />
    <LoadoutShare />
  </div>
</template>

<script setup>
import Export from "@/components/Transfer/Export.vue";
import Import from "@/components/Transfer/Import.vue";
import TrackerShare from "@/components/Transfer/TrackerShare.vue";
import LoadoutShare from "@/components/Transfer/LoadoutShare.vue";
</script>
