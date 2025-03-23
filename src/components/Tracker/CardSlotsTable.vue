<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <div
        class="flex items-center justify-between cursor-pointer"
        @click="
          showGemsTable = !showGemsTable;
          showKeysTable = false;
        "
      >
        <p class="font-semibold text-2xl">Gem slots costs</p>
        <Icon
          icon="octicon:chevron-down-16"
          height="28"
          class="duration-300"
          :class="{
            'rotate-180': showGemsTable,
          }"
        />
      </div>
      <div
        class="overflow-hidden duration-300"
        :class="showGemsTable ? 'max-h-[150rem]' : 'max-h-0'"
      >
        <table class="border-collapse w-full">
          <thead>
            <tr>
              <th class="border border-slate-300/40 py-3 px-2">Slot</th>
              <th class="border border-slate-300/40 py-3 px-2">Cost</th>
              <th class="border border-slate-300/40 py-3 px-2">Total cost</th>
              <th class="border border-slate-300/40 py-3 px-2">Cost left</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cost, slot) in slots"
              :key="slot"
            >
              <td class="text-center border border-slate-300/20 p-2">{{ slot }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ cost.toLocaleString() }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ costToTarget(1, slot).toLocaleString() }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ costToTarget(slot, Object.keys(slots).length).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        class="flex items-center justify-between cursor-pointer"
        @click="
          showKeysTable = !showKeysTable;
          showGemsTable = false;
        "
      >
        <p class="font-semibold text-2xl">Vault slots costs</p>
        <Icon
          icon="octicon:chevron-down-16"
          height="28"
          class="duration-300"
          :class="{
            'rotate-180': showKeysTable,
          }"
        />
      </div>
      <div
        class="overflow-hidden duration-300"
        :class="showKeysTable ? 'max-h-[150rem]' : 'max-h-0'"
      >
        <table class="border-collapse w-full">
          <thead>
            <tr>
              <th class="border border-slate-300/40 py-3 px-2">Slot</th>
              <th class="border border-slate-300/40 py-3 px-2">Cost</th>
              <th class="border border-slate-300/40 py-3 px-2">Path cost</th>
              <th class="border border-slate-300/40 py-3 px-2">Total cost</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(content, slot) in vaultSlots"
              :key="slot"
            >
              <td class="text-center border border-slate-300/20 p-2">{{ `${slot} (${getGemSlotsCount() + parseInt(slot)})` }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ content.unlock.toLocaleString() }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ `${pathCost(0, slot).toLocaleString()} ${parseInt(slot) === 1 ? "" : "(+" + content.path + ")"}` }}</td>
              <td class="text-center border border-slate-300/20 p-2">{{ getTotalCost(0, slot).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { slots, costToTarget, vaultSlots, pathCost, getTotalCost, getGemSlotsCount } from "@/data/cardSlots";
import { ref } from "vue";

import { Icon } from "@iconify/vue";

const showGemsTable = ref(false);
const showKeysTable = ref(false);
</script>
