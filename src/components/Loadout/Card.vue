<template>
  <div class="preset-card loadout-grid">
    <div class="flex gap-2 items-center">
      <p class="truncate">{{ card }}</p>
      <Icon
        icon="octicon:lock-16"
        v-if="lockedCards.includes(card)"
        class="text-amber-500"
      />
    </div>
    <button
      class="rounded-md w-fit p-1 justify-self-center border border-solid cursor-pointer"
      :class="isInPreset(i) ? 'bg-emerald-500/20 border-emerald-500' : 'bg-theme border-slate-300/20'"
      v-for="i in Array.from(Array(5).keys())"
      :key="i"
      @click="updatePreset(i)"
    >
      <Icon
        icon="octicon:check-16"
        :class="isInPreset(i) ? 'text-slate-50' : 'text-slate-300/20'"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { lockedCards } from "@/data/cards";

import { Icon } from "@iconify/vue";

const props = defineProps({
  card: String,
});

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const emit = defineEmits(["updatePreset"]);

const updatePreset = (preset) => {
  emit("updatePreset", preset);

  presets.value = JSON.parse(localStorage.getItem("presets"));
};

const isInPreset = (set) => presets.value[set].includes(props.card);
</script>
