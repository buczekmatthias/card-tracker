<template>
  <Container class="grid grid-cols-[146px_1fr] gap-4 p-4 flex-1 items-start">
    <div class="grid grid-rows-[1fr_4fr_1.35fr] border border-solid border-zinc-200 rounded-md h-[13.5rem]">
      <p class="text-center p-1.5">{{ updatedCard.name }}</p>
      <div
        class="border-y border-solid border-y-zinc-200 flex items-center justify-center glow"
        :class="info.glow"
      >
        <img
          v-lazy="getIcon()"
          :alt="`${updatedCard.name} card`"
          class="h-10"
        />
      </div>
      <div class="grid grid-cols-5 items-center p-1.5">
        <template v-if="updatedCard.lvl === 0">
          <p class="col-span-full text-center">Locked</p>
        </template>
        <template v-else>
          <svg
            class="h-7 mx-auto"
            :class="{
              'fill-zinc-50': updatedCard.lvl <= 5,
              'fill-amber-400': updatedCard.lvl === 6,
              'fill-fuchsia-600': updatedCard.lvl === 7 && !updatedCard.masteryUnlocked,
              'fill-green-500': updatedCard.lvl === 7 && updatedCard.masteryUnlocked,
            }"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            v-for="i in Array.from(Array(updatedCard.lvl < 6 ? updatedCard.lvl : 5).keys()).map((_, j) => (j += 1))"
            :key="`star-${i}`"
          >
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
          </svg>
        </template>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <button
        class="toggle-underline self-end my-1"
        @click="showInfo = !showInfo"
      >
        {{ showInfo ? "Hide" : "Show" }} info
      </button>
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
          <tr v-if="updatedCard.lvl !== 7">
            <td class="w-8/12">Lvl up target</td>
            <td class="text-end">{{ target }}</td>
          </tr>
          <tr>
            <td class="w-8/12">Complete</td>
            <td class="text-end">{{ getPercentageOfMax(getRequiredToMax(updatedCard.lvl, updatedCard.owned)) }} %</td>
          </tr>
          <tr v-if="updatedCard.lvl !== 7">
            <td class="w-8/12">Left to max</td>
            <td class="text-end">{{ getRequiredToMax(updatedCard.lvl, updatedCard.owned) }}</td>
          </tr>
        </tbody>
      </table>
      <label
        v-if="updatedCard.lvl === 7"
        class="flex gap-2 items-center justify-center cursor-pointer rounded-md py-3 px-container border border-solid"
        :class="updatedCard.masteryUnlocked ? 'border-emerald-400 fill-emerald-400 text-emerald-400' : 'border-inactive fill-inactive text-inactive'"
      >
        <input
          class="hidden"
          type="checkbox"
          v-model="updatedCard.masteryUnlocked"
        />
        <svg
          class="h-5"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z"></path>
        </svg>
        <span>Mastery unlocked</span>
      </label>
    </div>
    <CardInfo
      class="col-span-full"
      :info="info"
      :cardLvl="updatedCard.lvl"
      :mastery="masteries[updatedCard.name]"
      v-if="showInfo"
    />
  </Container>
</template>

<script setup>
// TODO: Change how cards are displayed

import Container from "./Container.vue";
import CardInfo from "./CardInfo.vue";

import { getPercentageOfMax, getRequiredToMax, levels } from "@/data/cardLevels";
import { ref, watch } from "vue";
import { masteries } from "@/data/masteries";

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
