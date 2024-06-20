<template>
  <Container class="flex flex-col gap-4">
    <p class="container-subheader">{{ updatedCard.name }}</p>
    <div class="container-content">
      <span>Level</span>
      <span>Owned</span>
      <span>Target</span>
      <span>%</span>
      <span>Left</span>
      <select v-model="updatedCard.lvl">
        <option :value="i" v-for="i in Array.from(Array(8).keys())" :key="i">{{ i }}</option>
      </select>
      <select v-model="updatedCard.owned" :disabled="[0, 7].includes(updatedCard.lvl)">
        <option :value="i" v-for="i in Array.from(Array(target).keys())" :key="i">{{ i }}</option>
      </select>
      <span>{{ target || "Max" }}</span>
      <span>{{ getPercentageOfMax(getRequiredToMax(updatedCard.lvl, updatedCard.owned)) }}</span>
      <span>{{ getRequiredToMax(updatedCard.lvl, updatedCard.owned) }}</span>
    </div>
  </Container>
</template>

<script setup>
import Container from "./Container.vue";

import { getPercentageOfMax, getRequiredToMax, levels } from "@/data/cardLevels";
import { ref, watch } from "vue";

const props = defineProps({
  card: Object,
});

const updatedCard = ref(props.card);

const target = ref(levels[updatedCard.value.lvl]);

watch(
  () => updatedCard.value.lvl,
  () => {
    target.value = levels[updatedCard.value.lvl];
    updatedCard.value.owned = 0;
  }
);

const emit = defineEmits(["cardUpdate"]);

watch(
  () => updatedCard.value,
  () => emit("cardUpdate", updatedCard.value),
  { deep: true }
);
</script>
