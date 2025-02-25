<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
    <!-- Card base content -->
    <div class="flex flex-col gap-4">
      <div class="rounded-md bg-nav relative">
        <p class="text-sm absolute bottom-[120%] left-0">{{ getPercentageOfMax(getRequiredToMax(content)) }}%</p>
        <div
          class="h-2 bg-emerald-900/70 duration-150 rounded-md"
          :style="`width:${getPercentageOfMax(getRequiredToMax(content))}%`"
        ></div>
      </div>
      <p class="text-4xl font-semibold">{{ name }}</p>
      <div
        class="grid gap-2"
        :class="[0, 7].includes(card.lvl) ? 'grid-cols-1' : 'grid-cols-2'"
      >
        <Select
          label="Level"
          v-model="card.lvl"
          :options="getLevelOptions()"
        />
        <Select
          label="Owned"
          v-model="card.owned"
          :options="card.lvl === 1 ? { 1: 1, 2: 2 } : getOwnedOptions()"
          v-if="![0, 7].includes(card.lvl)"
          :disabled="[0, 7].includes(card.lvl)"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-1">
          <p>Next level target</p>
          <p class="text-lg">{{ levels[card.lvl] || "Maxed" }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <p>Progress</p>
          <p class="text-lg">{{ getCardProgress(card) }} / {{ MAX_LEVEL_CARDS_COUNT }}</p>
        </div>
      </div>
      <Checkbox
        v-if="card.lvl === 7"
        v-model="card.mastery"
        label="Mastery unlocked"
      />
      <div
        class="flex gap-2 items-center bg-amber-500/5 border border-solid border-amber-500 rounded-md p-3.5"
        v-if="lockedCards.includes(name)"
      >
        <Icon
          icon="octicon:lock-16"
          class="text-amber-500"
        />
        <p class="text-sm">This card can't be swapped during active run</p>
      </div>
      <div
        class="flex gap-2 items-center bg-slate-600/5 border border-solid border-slate-300/30 rounded-md p-3.5"
        v-if="Object.keys(info).includes('unlocks')"
      >
        <Icon icon="octicon:info-16" />
        <p class="text-sm">
          Locked behind <strong>{{ info.unlocks }}</strong> milestone
        </p>
      </div>
    </div>
    <!-- Card info -->
    <div class="flex flex-col gap-4">
      <p>{{ formatInfoValue() }}</p>
      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="border border-slate-300/40 p-3">Level</th>
            <th class="border border-slate-300/40 p-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, lvl) in info.values"
            :key="value"
            :class="{ 'bg-emerald-400/10': lvl + 1 === card.lvl }"
          >
            <td class="text-center border border-slate-300/20 p-2">{{ lvl + 1 }}</td>
            <td class="text-center border border-slate-300/20 p-2">{{ info.prefix }}{{ value }}{{ info.suffix }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex flex-col gap-3 border-t border-solid border-t-slate-300/10 pt-4">
        <p class="font-semibold text-xl">Mastery</p>
        <p>
          <span class="font-medium">Unlock: </span>
          <span class="font-light">{{ mastery.cost }} stones</span>
        </p>
        <p>{{ mastery.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getCardProgress, getPercentageOfMax, getRequiredToMax, levels, MAX_LEVEL_CARDS_COUNT } from "@/data/cardLevels";
import { lockedCards } from "@/data/cards";
import { getCardMastery } from "@/data/masteries";
import { getCardInfo } from "@/data/cardsInfo";

import { Icon } from "@iconify/vue";
import Select from "@/components/Select.vue";
import Checkbox from "@/components/Checkbox.vue";

const props = defineProps({
  name: String,
  content: Object,
});

const emit = defineEmits(["cardUpdate"]);

const card = ref(props.content);

const cardLvl = ref(card.value.lvl);

const mastery = ref(getCardMastery(props.name));

const info = ref(getCardInfo(props.name));

const getLevelOptions = () => Array.from(Array(8).keys());

const getOwnedOptions = () => Array.from(Array(levels[props.content.lvl]).keys());

const formatInfoValue = () => info.value.description.replace("pvs", `${info.value.prefix}${props.content.lvl === 0 ? "N" : info.value.values[props.content.lvl - 1]}${info.value.suffix}`);

watch(
  [card],
  (oldVal, newVal) => {
    emit("cardUpdate");

    if (newVal[0].lvl !== cardLvl.value) {
      card.value.owned = parseInt(newVal[0].lvl) === 1 ? 1 : 0;
      cardLvl.value = newVal[0].lvl;
    }
  },
  { deep: true }
);
</script>
