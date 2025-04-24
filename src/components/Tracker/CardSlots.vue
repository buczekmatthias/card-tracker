<template>
  <div class="flex flex-col gap-4 w-full border border-solid border-slate-300/30 rounded-md p-3">
    <div class="flex justify-between items-center">
      <p class="text-2xl mb-0">Card slots</p>
      <button
        class="toggle-underline"
        @click="showModal = !showModal"
      >
        {{ showModal ? "Hide" : "Show" }} costs
      </button>
    </div>
    <div class="slots-content grid-cols-2 sm:grid-cols-[2fr_2fr_2fr_3fr]">
      <div>
        <span>Gem slots</span>
        <Select
          v-model="ownedSlots"
          :options="getGemSlotsOptions()"
        />
      </div>
      <div>
        <span>Vault slots</span>
        <Select
          v-model="ownedVaultSlots"
          :options="getVaultSlotsOptions()"
        />
      </div>
      <div class="sm:items-center">
        <span>Next gems slot</span>
        <span class="my-auto">{{ costOfNextSlot(parseInt(ownedSlots)).toLocaleString() }}</span>
      </div>
      <div class="sm:items-center">
        <span>Next keys slot</span>
        <span class="my-auto">{{ getTotalCost(parseInt(ownedVaultSlots), parseInt(ownedVaultSlots) + 1) || "Maxed" }}</span>
      </div>
    </div>
    <Modal
      v-if="showModal"
      @closeModal="showModal = false"
    >
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="">
          <p>Gem slots count</p>
          <p>{{ gemSlotsCount }}</p>
        </div>
        <div class="">
          <p>Vault slots count</p>
          <p>{{ vaultSlotsCount }}</p>
        </div>
      </div>
      <CardSlotsTable />
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { costOfNextSlot, getGemSlotsCount, getVaultSlotsCount, getTotalCost } from "@/data/cardSlots";

import CardSlotsTable from "@/components/Tracker/CardSlotsTable.vue";
import Select from "@/components/Select.vue";
import Modal from "@/components/Modal.vue";

const ownedSlots = ref(parseInt(localStorage.getItem("ownedSlots")));

const ownedVaultSlots = ref(parseInt(localStorage.getItem("vaultSlots")));

const gemSlotsCount = getGemSlotsCount();

const vaultSlotsCount = getVaultSlotsCount();

const showModal = ref(false);

const emit = defineEmits(["updateOwnedSlots"]);

watch([ownedSlots, ownedVaultSlots], () => {
  localStorage.setItem("ownedSlots", ownedSlots.value);
  localStorage.setItem("vaultSlots", ownedVaultSlots.value);
  emit("updateOwnedSlots");
});

const getGemSlotsOptions = () => {
  const o = {};

  for (let i of Array.from(Array(gemSlotsCount).keys(), (_, j) => j + 1)) {
    o[i] = i;
  }

  return o;
};

const getVaultSlotsOptions = () => {
  const o = {};

  for (let i of Array.from(Array(vaultSlotsCount + 1).keys())) {
    o[i] = i;
  }

  return o;
};
</script>
