<template>
  <div class="bg-theme sticky bottom-0 left-0 p-3 grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-3 border-t border-solid border-t-container md:border-x md:border-x-container">
    <SharePanelExport v-if="showExport" />
    <SharePanelImport v-if="showImport" />
    <Button @click="toggleExport">Export</Button>
    <Button @click="toggleImport">Import</Button>
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";

import Button from "./Button.vue";
import SharePanelExport from "./SharePanelExport.vue";
import SharePanelImport from "./SharePanelImport.vue";

const showExport = ref(false);

const showImport = ref(false);

const toggleExport = () => {
  showImport.value = false;
  showExport.value = !showExport.value;
};

const toggleImport = () => {
  showExport.value = false;
  showImport.value = !showImport.value;
};
</script>
