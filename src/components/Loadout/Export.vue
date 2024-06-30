<template>
  <ExportBase title="Loadout export">
    <label class="flex flex-col gap-4">
      <span>What to export?</span>
      <select v-model="exportType">
        <option value="all">All presets</option>
        <option :value="`preset_${i}`" v-for="i in Array.from(Array(5).keys()).map((_, j) => (j += 1))" :key="i">Preset {{ i }}</option>
      </select>
    </label>
    <pre class="flex w-full p-2 rounded-md border border-solid border-separator">
        <code class="flex flex-col max-h-96 overflow-auto w-full">
          <p>{{ exportData }}</p>
        </code>
      </pre>
    <button class="border border-solid border-active text-active rounded-md p-3" @click="copyResult">Copy JSON</button>
    <p class="text-center" v-if="copiedMessage">Export content has been copied</p>
  </ExportBase>
</template>

<script setup>
import ExportBase from "../ExportBase.vue";

import { onMounted, ref, watch } from "vue";

const exportData = ref({});

const exportType = ref("all");

const copiedMessage = ref(false);

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const loadExportData = () => {
  if (exportType.value === "all") {
    exportData.value = presets.value;
  } else {
    let preset_id = parseInt(exportType.value.split("_")[1]);

    exportData.value = presets.value[preset_id - 1];
  }
};

const copyResult = () => {
  if (!copiedMessage.value) {
    navigator.clipboard.writeText(JSON.stringify(exportData.value));
    copiedMessage.value = true;

    setTimeout(() => (copiedMessage.value = false), 2500);
  }
};

onMounted(() => {
  loadExportData();
});

watch(
  () => exportType.value,
  () => {
    loadExportData();
  }
);
</script>
