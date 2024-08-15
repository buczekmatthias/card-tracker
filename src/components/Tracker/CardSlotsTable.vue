<template>
  <table class="border-collapse w-full">
    <thead>
      <tr>
        <th class="border-2 border-container p-3">Slot</th>
        <th class="border-2 border-container p-3">Cost</th>
        <th class="border-2 border-container p-3">Total cost</th>
        <th class="border-2 border-container p-3">Cost left</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(cost, slot) in slots" :key="slot">
        <td class="text-center border border-container p-2">{{ slot }}</td>
        <td class="text-center border border-container p-2">{{ cost.toLocaleString() }}</td>
        <td class="text-center border border-container p-2">{{ costToTarget(0, slot).toLocaleString() }}</td>
        <td class="text-center border border-container p-2">{{ costToTarget(slot, Object.keys(slots).length).toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { slots, costToTarget } from "@/data/cardSlots";
</script>
