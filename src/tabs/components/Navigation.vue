<template>
  <div
    class="order-last border border-solid border-slate-300/15 sticky bottom-4 z-30 grid grid-cols-4 gap-6 bg-nav rounded-md px-6"
    id="navigation"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="cursor-pointer p-4 border-t-2 border-solid duration-150"
      :class="activeTab === tab.value ? 'border-t-emerald-600' : 'border-t-transparent'"
      @click="activeTab = tab.value"
    >
      <Icon
        :icon="tab.icon"
        height="20"
        class="duration-150"
        :class="activeTab === tab.value ? 'text-emerald-600' : 'text-slate-50/20'"
      />
    </button>
  </div>
</template>

<script setup>
import { watch } from "vue";

import { Icon } from "@iconify/vue";

const activeTab = defineModel();

const tabs = [
  {
    value: "stats",
    icon: "nimbus:stats",
  },
  {
    value: "tracker",
    icon: "gg:card-diamonds",
  },
  {
    value: "loadout",
    icon: "solar:copy-linear",
  },
  {
    value: "transfer",
    icon: "gg:share",
  },
];

watch([activeTab], () => {
  localStorage.setItem("page", activeTab.value);
});
</script>
