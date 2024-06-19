<template>
  <p class="container-header">Card slots</p>
  <div class="container-content">
    <span>Owned</span>
    <span>Max slots</span>
    <span>%</span>
    <span>Left to max</span>
    <input type="number" v-model="ownedSlots" min="1" :max="maxSlots" />
    <span>{{ maxSlots }}</span>
    <span>{{ ((ownedSlots / maxSlots) * 100).toFixed(1) }}</span>
    <span>{{ maxSlots - ownedSlots }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const ownedSlots = ref(localStorage.getItem("ownedSlots") || 1);

const maxSlots = ref(localStorage.getItem("slots"));

const emit = defineEmits(["updateOwnedSlots"]);

watch(
  () => ownedSlots.value,
  () => {
    ownedSlots.value = ownedSlots.value > maxSlots.value ? maxSlots.value : ownedSlots.value > 0 ? ownedSlots.value : 1;
    localStorage.setItem("ownedSlots", ownedSlots.value);
    emit("updateOwnedSlots");
  }
);
</script>
