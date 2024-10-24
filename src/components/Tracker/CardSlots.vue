<template>
  <Container class="flex flex-col gap-4 w-full cardsTriple:max-w-6xl self-center">
    <div class="flex justify-between items-center">
      <p class="container-header mb-0">Card slots</p>
      <button
        class="toggle-underline"
        @click="isShowSlotInfo = !isShowSlotInfo"
      >
        {{ isShowSlotInfo ? "Hide" : "Show" }} costs
      </button>
    </div>
    <div class="slots-content grid-cols-[2fr_2fr_2fr_3fr]">
      <div>
        <span>Gem slots</span>
        <select v-model="ownedSlots">
          <option
            :value="i"
            v-for="i in Array.from(Array(gemSlotsCount).keys(), (_, j) => j + 1)"
            :key="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
      <div>
        <span>Vault slots</span>
        <select v-model="ownedVaultSlots">
          <option :value="0">0</option>
          <option
            :value="i"
            v-for="i in Array.from(Array(vaultSlotsCount).keys(), (_, j) => j + 1)"
            :key="i"
          >
            {{ `${i} (${gemSlotsCount + i})` }}
          </option>
        </select>
      </div>
      <div>
        <span>Next gems</span>
        <span>{{ costToTarget(ownedSlots, ownedSlots + 1).toLocaleString() }}</span>
      </div>
      <div>
        <span>Next keys</span>
        <span>{{ getTotalCost(ownedVaultSlots, ownedVaultSlots + 1) }}</span>
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border-t border-solid border-t-container pt-4"
      v-if="isShowSlotInfo"
    >
      <CardSlotsTable />
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import CardSlotsTable from "./CardSlotsTable.vue";

import { ref, watch } from "vue";
import { costToTarget, getGemSlotsCount, getVaultSlotsCount, getMaxSlotsCount, getTotalCost } from "@/data/cardSlots";

const ownedSlots = ref(parseInt(localStorage.getItem("ownedSlots")));

const ownedVaultSlots = ref(parseInt(localStorage.getItem("vaultSlots")));

const gemSlotsCount = getGemSlotsCount();

const vaultSlotsCount = getVaultSlotsCount();

const maxSlots = getMaxSlotsCount();

const isShowSlotInfo = ref(false);

const emit = defineEmits(["updateOwnedSlots"]);

watch([ownedSlots, ownedVaultSlots], () => {
  localStorage.setItem("ownedSlots", ownedSlots.value);
  localStorage.setItem("vaultSlots", ownedVaultSlots.value);
  emit("updateOwnedSlots");
});
</script>
