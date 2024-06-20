<template>
  <Container>
    <div class="flex justify-between">
      <p class="container-header">Card slots</p>
      <p>Max slots: {{ maxSlots }}</p>
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
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

import { ref, watch } from "vue";
import { costToTarget } from "@/data/cardSlots";

const ownedSlots = ref(localStorage.getItem("ownedSlots") || 1);

const targetSlot = ref(localStorage.getItem("targetSlot"));

const maxSlots = ref(localStorage.getItem("slots"));

const emit = defineEmits(["updateOwnedSlots"]);

watch(
  () => targetSlot.value,
  () => localStorage.setItem("targetSlot", targetSlot.value)
);

watch(
  () => ownedSlots.value,
  () => {
    localStorage.setItem("ownedSlots", ownedSlots.value);
    emit("updateOwnedSlots");
    if (targetSlot.value < ownedSlots.value) {
      targetSlot.value = ownedSlots.value + 1;
    }
  }
);
</script>
