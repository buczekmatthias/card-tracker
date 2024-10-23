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
          <optgroup label="Gems">
            <option
              :value="i"
              v-for="i in Array.from(Array(gemSlotsCount).keys(), (_, j) => j + 1)"
              :key="i"
            >
              {{ i }}
            </option>
          </optgroup>
          <optgroup label="Vault">
            <option
              :value="gemSlotsCount + i"
              v-for="i in Array.from(Array(vaultSlotsCount).keys(), (_, j) => j + 1)"
              :key="i"
            >
              {{ gemSlotsCount + i }}
            </option>
          </optgroup>
        </select>
      </div>
      <div v-if="parseInt(ownedSlots) !== parseInt(maxSlots)">
        <span>Target</span>
        <select
          v-model="targetSlot"
          :disabled="parseInt(ownedSlots) === parseInt(maxSlots)"
        >
          <optgroup
            label="Gems"
            v-if="ownedSlots < gemSlotsCount"
          >
            <option
              :value="i"
              v-for="i in Array.from(Array(gemSlotsCount - ownedSlots).keys(), (_, j) => parseInt(ownedSlots) + j + 1)"
              :key="i"
            >
              {{ i }}
            </option>
          </optgroup>
          <optgroup label="Vault">
            <option
              :value="gemSlotsCount + i"
              v-for="i in Array.from(Array(maxSlots - ownedSlots).keys(), (_, j) => vaultSlotsCount - j).reverse()"
              :key="i"
            >
              {{ gemSlotsCount + i }}
            </option>
          </optgroup>
        </select>
      </div>
      <div>
        <span>Target gems</span>
        <span>{{ costToTarget(ownedSlots, targetSlot).toLocaleString() }}</span>
      </div>
      <div>
        <span>Target keys</span>
        <span>{{ getTotalCost(ownedSlots - gemSlotsCount > 0 ? ownedSlots - gemSlotsCount : 0, targetSlot - gemSlotsCount) }}</span>
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
import { costToTarget, getGemSlotsCount, getVaultSlotsCount, getMaxSlotsCount, getTotalCost, vaultSlots } from "@/data/cardSlots";

const ownedSlots = ref(localStorage.getItem("ownedSlots") || 1);

const targetSlot = ref(localStorage.getItem("targetSlot"));

const gemSlotsCount = getGemSlotsCount();

const vaultSlotsCount = getVaultSlotsCount();

const maxSlots = getMaxSlotsCount();

const isShowSlotInfo = ref(false);

const emit = defineEmits(["updateOwnedSlots"]);

watch(
  () => targetSlot.value,
  () => localStorage.setItem("targetSlot", targetSlot.value)
);

watch([ownedSlots], () => {
  localStorage.setItem("ownedSlots", ownedSlots.value);
  emit("updateOwnedSlots");
  if (targetSlot.value <= ownedSlots.value) {
    targetSlot.value = parseInt(ownedSlots.value) === parseInt(maxSlots) ? maxSlots : ownedSlots.value + 1;
  }
});
</script>
