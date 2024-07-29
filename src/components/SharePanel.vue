<template>
  <div class="bg-theme sticky bottom-0 left-0 p-3 grid grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-3 border-t border-solid border-t-separator/50 sm:border-x sm:border-x-separator/50 sm:rounded-t-lg sm:mx-3">
    <SharePanelExport v-if="showExport" />
    <SharePanelImport v-if="showImport" />
    <slot :showShare="showShare" />
    <Button @click="toggleExport">Export</Button>
    <Button @click="toggleImport">Import</Button>
    <ShareButton @click="toggleShare" />
  </div>
</template>

<script setup>
import { ref } from "vue";

import Button from "./Button.vue";
import SharePanelExport from "./SharePanelExport.vue";
import SharePanelImport from "./SharePanelImport.vue";
import ShareButton from "./ShareButton.vue";

const showExport = ref(false);

const showImport = ref(false);

const showShare = ref(false);

const toggleExport = () => {
  showImport.value = false;
  showShare.value = false;
  showExport.value = !showExport.value;
};

const toggleImport = () => {
  showExport.value = false;
  showShare.value = false;
  showImport.value = !showImport.value;
};

const toggleShare = () => {
  showExport.value = false;
  showImport.value = false;
  showShare.value = !showShare.value;
};
</script>
