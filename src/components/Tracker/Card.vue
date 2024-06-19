<template>
  <div class="flex flex-col gap-4">
    <p class="container-subheader">{{ updatedCard.name }}</p>
    <div class="container-subcontent">
      <span>Level</span>
      <span>Owned</span>
      <span>Target</span>
      <span>%</span>
      <span>Left</span>
      <input type="number" v-model="updatedCard.lvl" min="0" max="7" />
      <input type="number" v-model="updatedCard.owned" min="0" :disabled="updatedCard.lvl === 7" />
      <span>{{ target || "Max" }}</span>
      <span>{{ getPercentageOfMax(getRequiredToMax(updatedCard.lvl, updatedCard.owned)) }}</span>
      <span>{{ getRequiredToMax(updatedCard.lvl, updatedCard.owned) }}</span>
    </div>
  </div>
</template>

<script setup>
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
    updatedCard.value.lvl = updatedCard.value.lvl > 7 ? 7 : updatedCard.value.lvl > 0 ? updatedCard.value.lvl : 0;
    target.value = levels[updatedCard.value.lvl];
    if (updatedCard.value.owned > target.value || updatedCard.value.lvl === 7) {
      updatedCard.value.owned = 0;
    }
  }
);

watch(
  () => updatedCard.value.owned,
  () => (updatedCard.value.owned = updatedCard.value.owned > target.value ? target.value : updatedCard.value.owned > 0 ? updatedCard.value.owned : 0)
);

const emit = defineEmits(["cardUpdate"]);

watch(
  () => updatedCard.value,
  () => emit("cardUpdate", updatedCard.value),
  { deep: true }
);
</script>
