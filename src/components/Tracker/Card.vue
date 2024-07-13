<template>
  <Container class="flex flex-col gap-2">
    <p class="container-subheader mb-2">{{ updatedCard.name }}</p>
    <div class="container-content" :class="[0, 7].includes(updatedCard.lvl) ? 'grid-cols-4' : 'grid-cols-[1.5fr_2fr_2.5fr_2.5fr_2.5fr]'">
      <div>
        <span>Level</span>
        <select v-model="updatedCard.lvl">
          <option :value="i" v-for="i in Array.from(Array(8).keys())" :key="i">{{ i }}</option>
        </select>
      </div>
      <div v-if="![0, 7].includes(updatedCard.lvl)">
        <span>Owned</span>
        <select v-model="updatedCard.owned" :disabled="[0, 7].includes(updatedCard.lvl)">
          <template v-if="updatedCard.lvl === 1">
            <option :value="1">1</option>
            <option :value="2">2</option>
          </template>
          <template v-else>
            <option :value="i" v-for="i in Array.from(Array(target).keys())" :key="i">{{ i }}</option>
          </template>
        </select>
      </div>
      <div>
        <span>Target</span>
        <span>{{ target || "---" }}</span>
      </div>
      <div>
        <span>%</span>
        <span>{{ getPercentageOfMax(getRequiredToMax(updatedCard.lvl, updatedCard.owned)) }}</span>
      </div>
      <div>
        <span>Left</span>
        <span>{{ getRequiredToMax(updatedCard.lvl, updatedCard.owned) }}</span>
      </div>
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
    updatedCard.value.owned = updatedCard.value.lvl === 1 ? 1 : 0;
  }
);

const emit = defineEmits(["cardUpdate"]);

watch(
  () => updatedCard.value,
  () => emit("cardUpdate", updatedCard.value),
  { deep: true }
);
</script>
