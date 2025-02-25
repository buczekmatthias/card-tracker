<template>
  <div class="flex flex-col gap-3">
    <p class="text-2xl font-semibold">Loadout data share</p>
    <Select
      v-model="shareType"
      :options="options"
    />
    <pre class="flex w-full p-2 max-h-72 rounded-md border border-solid border-zinc-50/50">
        <code class="flex flex-col overflow-auto w-full">
          <p class="text-sm">{{ shareData }}</p>
        </code>
    </pre>
    <Button @click="copyResult">Copy loadout data</Button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getAllPresetsExportString, getPresetExportString } from "@/data/loadoutShare";

import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";

const shareData = ref("");

const shareType = ref("all");

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const options = ref({
  all: "All presets",
  preset_1: "Preset 1",
  preset_2: "Preset 2",
  preset_3: "Preset 3",
  preset_4: "Preset 4",
  preset_5: "Preset 5",
});

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
