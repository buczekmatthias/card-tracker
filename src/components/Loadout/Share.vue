<template>
  <div class="e-i-container col-start-1">
    <Notification header="Data share" message="Data copied to clipboard" v-if="copiedMessage" />
    <label class="flex flex-col gap-4">
      <p class="text-2xl font-semibold">What to share?</p>
      <select v-model="shareType">
        <option value="all">All presets</option>
        <option :value="`preset_${i}`" v-for="i in Array.from(Array(5).keys()).map((_, j) => (j += 1))" :key="i">Preset {{ i }}</option>
      </select>
    </label>
    <pre class="flex w-full p-2 rounded-md border border-solid border-separator">
          <code class="flex flex-col max-h-96 overflow-auto w-full">
            <p>{{ shareData }}</p>
          </code>
        </pre>
    <button class="border border-solid border-active text-active rounded-md p-3" @click="copyResult">Copy JSON</button>
    <Info message="If you made changes with this modal open, reopen it to update" />
  </div>
</template>

<script setup>
import Info from "../Info.vue";
import Notification from "../Notification.vue";

import { onMounted, ref, watch } from "vue";

const shareData = ref({});

const shareType = ref("all");

const copiedMessage = ref(false);

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const loadShareData = () => {
  if (shareType.value === "all") {
    shareData.value = presets.value.map((preset) => preset.filter((val) => val.used === true).map((val) => val.name));
  } else {
    let preset_id = parseInt(shareType.value.split("_")[1]);

    shareData.value = presets.value[preset_id - 1].filter((val) => val.used === true).map((val) => val.name);
  }
};

const copyResult = () => {
  if (!copiedMessage.value) {
    navigator.clipboard.writeText(JSON.stringify(shareData.value, null, 2));
    copiedMessage.value = true;

    setTimeout(() => (copiedMessage.value = false), 2500);
  }
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
