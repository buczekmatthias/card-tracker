<template>
  <Container class="flex flex-col gap-4 w-full max-w-md cardsDouble:max-w-3xl cardsTriple:max-w-6xl self-center">
    <div class="flex justify-between items-center">
      <p class="container-header mb-0">Card slots</p>
      <button
        class="toggle-underline"
        @click="isShowSlotInfo = !isShowSlotInfo"
      >
        {{ isShowSlotInfo ? "Hide" : "Show" }} costs
      </button>
    </div>
    <div
      class="slots-content"
      :class="{
        'grid-cols-[2fr_2fr_2fr_3fr]': parseInt(ownedSlots) !== parseInt(maxSlots),
        'grid-cols-[4.2fr_2fr_3fr]': parseInt(ownedSlots) === parseInt(maxSlots),
      }"
    >
      <div>
        <span>Owned</span>
        <select v-model="ownedSlots">
          <option
            :value="i"
            v-for="i in Array.from(Array(parseInt(maxSlots)).keys(), (_, j) => j + 1)"
            :key="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
      <div v-if="parseInt(ownedSlots) !== parseInt(maxSlots)">
        <span>Target</span>
        <select
          v-model="targetSlot"
          :disabled="parseInt(ownedSlots) === parseInt(maxSlots)"
        >
          <option
            :value="i"
            v-for="i in Array.from(Array(parseInt(maxSlots - ownedSlots)).keys(), (_, j) => parseInt(ownedSlots) + j + 1)"
            :key="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
      <div>
        <span>Slots left</span>
        <span>{{ maxSlots - ownedSlots }}</span>
      </div>
      <div>
        <span>Target gems</span>
        <span>{{ costToTarget(ownedSlots, targetSlot).toLocaleString() }}</span>
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border-t border-solid border-t-container pt-4"
      v-if="isShowSlotInfo"
    >
      <p class="font-semibold text-2xl">Slots costs</p>
      <CardSlotsTable />
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import CardSlotsTable from "./CardSlotsTable.vue";

import { ref, watch } from "vue";
import { costToTarget } from "@/data/cardSlots";

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
