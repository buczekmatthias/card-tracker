<template>
  <Container class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <p class="container-header mb-0">Card slots</p>
      <button @click="isShowSlotInfo = !isShowSlotInfo">{{ isShowSlotInfo ? "Hide" : "Show" }} info</button>
    </div>
    <div class="slots-content">
      <span>Owned</span>
      <span>Target</span>
      <span>%</span>
      <span>Slots left</span>
      <span>Target gems</span>
      <select v-model="ownedSlots">
        <option :value="i" v-for="i in Array.from(Array(parseInt(maxSlots)).keys(), (_, j) => j + 1)" :key="i">{{ i }}</option>
      </select>
      <select v-model="targetSlot" :disabled="parseInt(ownedSlots) === parseInt(maxSlots)">
        <option :value="i" v-for="i in Array.from(Array(parseInt(maxSlots - ownedSlots)).keys(), (_, j) => parseInt(ownedSlots) + j + 1)" :key="i">{{ i }}</option>
      </select>
      <span>{{ ((ownedSlots / maxSlots) * 100).toFixed(1) }}</span>
      <span>{{ maxSlots - ownedSlots }}</span>
      <span>{{ costToTarget(ownedSlots, targetSlot) }}</span>
    </div>
    <div class="grid grid-cols-2 gap-3 border-t border-solid border-t-container pt-4" v-if="isShowSlotInfo">
      <p class="col-span-full font-semibold text-2xl">Slots costs</p>
      <p class="font-light" v-for="(cost, slot) in slots" :key="slot">{{ slot }}{{ getSlotNumberAffix(slot) }} slot: {{ cost }} gems</p>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

import { ref, watch } from "vue";
import { slots, costToTarget } from "@/data/cardSlots";

const ownedSlots = ref(localStorage.getItem("ownedSlots") || 1);

const targetSlot = ref(localStorage.getItem("targetSlot"));

const maxSlots = ref(localStorage.getItem("slots"));

const isShowSlotInfo = ref(false);

const emit = defineEmits(["updateOwnedSlots"]);

const getSlotNumberAffix = (slot) => {
  slot = parseInt(slot);

  if (slot === 1) return "st";

  if (slot === 2) return "nd";

  if (slot === 3) return "rd";

  return "th";
};

watch(
  () => targetSlot.value,
  () => localStorage.setItem("targetSlot", targetSlot.value)
);

watch(
  () => ownedSlots.value,
  () => {
    localStorage.setItem("ownedSlots", ownedSlots.value);
    emit("updateOwnedSlots");
    if (targetSlot.value <= ownedSlots.value) {
      targetSlot.value = parseInt(ownedSlots.value) === parseInt(maxSlots.value) ? maxSlots.value : ownedSlots.value + 1;
    }
  }
);
</script>
