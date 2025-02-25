<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="flex flex-col gap-2">
      <p class="font-semibold text-2xl">Gem slots costs</p>
      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="border-2 border-container py-3 px-2">Slot</th>
            <th class="border-2 border-container py-3 px-2">Cost</th>
            <th class="border-2 border-container py-3 px-2">Total cost</th>
            <th class="border-2 border-container py-3 px-2">Cost left</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cost, slot) in slots"
            :key="slot"
          >
            <td class="text-center border border-container p-2">{{ slot }}</td>
            <td class="text-center border border-container p-2">{{ cost.toLocaleString() }}</td>
            <td class="text-center border border-container p-2">{{ costToTarget(1, slot).toLocaleString() }}</td>
            <td class="text-center border border-container p-2">{{ costToTarget(slot, Object.keys(slots).length).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col gap-2">
      <p class="font-semibold text-2xl">Vault slots costs</p>
      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="border-2 border-container py-3 px-2">Slot</th>
            <th class="border-2 border-container py-3 px-2">Cost</th>
            <th class="border-2 border-container py-3 px-2">Path cost</th>
            <th class="border-2 border-container py-3 px-2">Total cost</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(content, slot) in vaultSlots"
            :key="slot"
          >
            <td class="text-center border border-container p-2">{{ `${slot} (${getGemSlotsCount() + parseInt(slot)})` }}</td>
            <td class="text-center border border-container p-2">{{ content.unlock.toLocaleString() }}</td>
            <td class="text-center border border-container p-2">{{ `${pathCost(0, slot).toLocaleString()} ${parseInt(slot) === 1 ? "" : "(+" + content.path + ")"}` }}</td>
            <td class="text-center border border-container p-2">{{ getTotalCost(0, slot).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { slots, costToTarget, vaultSlots, pathCost, getTotalCost, getGemSlotsCount } from "@/data/cardSlots";
</script>
