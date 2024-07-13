<template>
  <Container class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <p class="container-header mb-0">Card slots</p>
      <button @click="isShowSlotInfo = !isShowSlotInfo">{{ isShowSlotInfo ? "Hide" : "Show" }} info</button>
    </div>
    <div class="slots-content">
      <div>
        <span>Owned</span>
        <select v-model="ownedSlots">
          <option :value="i" v-for="i in Array.from(Array(parseInt(maxSlots)).keys(), (_, j) => j + 1)" :key="i">{{ i }}</option>
        </select>
      </div>
      <div>
        <span>Target</span>
        <select v-model="targetSlot" :disabled="parseInt(ownedSlots) === parseInt(maxSlots)">
          <option :value="i" v-for="i in Array.from(Array(parseInt(maxSlots - ownedSlots)).keys(), (_, j) => parseInt(ownedSlots) + j + 1)" :key="i">{{ i }}</option>
        </select>
      </div>
      <div>
        <span>Slots left</span>
        <span>{{ maxSlots - ownedSlots }}</span>
      </div>
      <div>
        <span>Target gems</span>
        <span>{{ costToTarget(ownedSlots, targetSlot) }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-3 border-t border-solid border-t-container pt-4" v-if="isShowSlotInfo">
      <p class="font-semibold text-2xl">Slots costs</p>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="w-1/2 border-2 border-container p-3">Slot number</th>
            <th class="w-1/2 border-2 border-container p-3">Cost (gems)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cost, slot) in slots" :key="slot">
            <td class="w-1/2 text-center border border-container p-2">{{ slot }}</td>
            <td class="w-1/2 text-center border border-container p-2">{{ cost }}</td>
          </tr>
        </tbody>
      </table>
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
