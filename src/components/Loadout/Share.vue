<template>
  <div class="share-container">
    <p class="text-2xl font-semibold">Loadout data share</p>
    <pre class="flex w-full p-2 rounded-md border border-solid border-zinc-50/50">
          <code class="flex flex-col overflow-auto w-full">
            <p>{{ shareData }}</p>
          </code>
        </pre>
    <label class="flex flex-col gap-4">
      <select
        v-model="shareType"
        class="p-2"
      >
        <option value="all">All presets</option>
        <option
          :value="`preset_${i}`"
          v-for="i in Array.from(Array(5).keys()).map((_, j) => (j += 1))"
          :key="i"
        >
          Preset {{ i }}
        </option>
      </select>
    </label>
    <button
      class="share-btn"
      @click="copyResult"
    >
      Copy data
    </button>
  </div>
</template>

<script setup>
import { getAllPresetsExportString, getPresetExportString } from "@/data/loadoutShare";

import { onMounted, ref, watch } from "vue";

const shareData = ref("");

const shareType = ref("all");

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const loadShareData = () => {
  shareData.value = "";

  if (shareType.value === "all") shareData.value = getAllPresetsExportString(presets.value);
  else shareData.value = getPresetExportString(presets.value[parseInt(shareType.value.split("_")[1] - 1)]);
};

const copyResult = () => {
  navigator.clipboard.writeText(shareData.value);
};

onMounted(() => {
  loadShareData();
});

watch(
  () => shareType.value,
  () => {
    loadShareData();
  }
);
</script>
