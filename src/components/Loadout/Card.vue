<template>
  <div class="preset-card loadout-grid">
    <div class="flex gap-2 items-center">
      <p>{{ card }}</p>
      <svg
        v-if="lockedCards.includes(card)"
        class="h-4 fill-amber-500"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="11"
          height="9"
          x="2.5"
          y="7"
          rx="2"
        ></rect>
        <path
          fill-rule="evenodd"
          d="M4.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <button
      class="rounded-md w-fit p-0.5 justify-self-center border border-solid"
      :class="isInPreset(i) ? 'bg-emerald-500 border-emerald-500' : 'bg-theme border-inactive'"
      v-for="i in Array.from(Array(5).keys())"
      :key="i"
      @click="updatePreset(i)"
    >
      <svg
        class="h-5"
        :class="isInPreset(i) ? 'fill-active' : 'fill-inactive'"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { lockedCards } from "@/data/cards";
import { ref } from "vue";

const props = defineProps({
  card: String,
  cardIndex: Number,
});

const presets = ref(JSON.parse(localStorage.getItem("presets")));

const emit = defineEmits(["updatePreset"]);

const updatePreset = (preset) => {
  presets.value[preset][props.cardIndex].used = !presets.value[preset][props.cardIndex].used;
  emit("updatePreset", isInPreset(preset), preset, props.cardIndex);
};

const isInPreset = (set) => presets.value[set].find((card) => card.name === props.card).used;
</script>
