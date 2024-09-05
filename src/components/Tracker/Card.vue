<template>
  <Container class="flex flex-col gap-4 p-4 flex-1">
    <div class="flex items-start justify-between">
      <p class="container-subheader">{{ updatedCard.name }}</p>
      <button
        class="toggle-underline self-end my-1"
        @click="showInfo = !showInfo"
      >
        {{ showInfo ? "Hide" : "Show" }} info
      </button>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-6">
      <img
        :src="getIcon()"
        :alt="`${updatedCard.name} card`"
        class="max-h-44"
      />
      <div class="flex flex-col gap-3">
        <div
          class="grid gap-2"
          :class="[0, 7].includes(updatedCard.lvl) ? 'grid-cols-1' : 'grid-cols-2'"
        >
          <div class="flex flex-col gap-2">
            <span>Level</span>
            <select v-model="updatedCard.lvl">
              <option
                :value="i"
                v-for="i in Array.from(Array(8).keys())"
                :key="i"
              >
                {{ i }}
              </option>
            </select>
          </div>
          <div
            class="flex flex-col gap-2"
            v-if="![0, 7].includes(updatedCard.lvl)"
          >
            <span>Owned</span>
            <select
              v-model="updatedCard.owned"
              :disabled="[0, 7].includes(updatedCard.lvl)"
            >
              <template v-if="updatedCard.lvl === 1">
                <option :value="1">1</option>
                <option :value="2">2</option>
              </template>
              <template v-else>
                <option
                  :value="i"
                  v-for="i in Array.from(Array(target).keys())"
                  :key="i"
                >
                  {{ i }}
                </option>
              </template>
            </select>
          </div>
        </div>
        <table>
          <tbody class="[&>tr>td]:py-1.5">
            <tr>
              <td class="w-8/12">Lvl up target</td>
              <td class="text-end">{{ target || "---" }}</td>
            </tr>
            <tr>
              <td class="w-8/12">Complete</td>
              <td class="text-end">{{ getPercentageOfMax(getRequiredToMax(updatedCard.lvl, updatedCard.owned)) }} %</td>
            </tr>
            <tr>
              <td class="w-8/12">Left to max</td>
              <td class="text-end">{{ getRequiredToMax(updatedCard.lvl, updatedCard.owned) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CardInfo
      :info="info"
      :cardLvl="updatedCard.lvl"
      v-if="showInfo"
    />
  </Container>
</template>

<script setup>
import Container from "./Container.vue";
import CardInfo from "./CardInfo.vue";

import { getPercentageOfMax, getRequiredToMax, levels } from "@/data/cardLevels";
import { ref, watch } from "vue";

const props = defineProps({
  card: Object,
  info: Object,
});

const showInfo = ref(false);

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

const getIcon = () => {
  return new URL(`../../assets/cards/${props.info.card}`, import.meta.url).href;
};
</script>
