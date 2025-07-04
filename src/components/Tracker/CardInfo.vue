<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <p
        class="self-start px-3 py-2 rounded-md"
        :class="{
          'bg-card-common/10': content.rarity === 'common',
          'bg-card-rare/20': content.rarity === 'rare',
          'bg-card-epic/30': content.rarity === 'epic',
        }"
      >
        {{ capitalize(content.rarity) }} card
      </p>
      <div class="flex justify-between items-center">
        <p class="text-3xl font-semibold">{{ name }}</p>
        <img
          v-lazy="getIcon()"
          :alt="`${name} card`"
          class="h-10 w-10 object-contain"
        />
      </div>
    </div>
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
    <p>{{ formatInfoValue() }}</p>
    <table class="border-collapse w-full">
      <thead>
        <tr>
          <th class="border border-slate-300/20 p-3">Level</th>
          <th class="border border-slate-300/20 p-3">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, lvl) in info.values"
          :key="value"
          :class="{ 'bg-emerald-400/20': lvl + 1 === content.lvl }"
        >
          <td class="text-center border border-slate-300/20 p-2">{{ lvl + 1 }}</td>
          <td class="text-center border border-slate-300/20 p-2">{{ info.prefix }}{{ value }}{{ info.suffix }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-col gap-3 border-t border-solid border-t-slate-300/10 pt-4">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-xl">Mastery</p>
        <div class="flex gap-2 items-center">
          <span class="font-light">{{ mastery.cost }}</span>
          <img
            :src="getStoneIcon()"
            alt="Stone"
            class="h-6 w-6 object-contain"
          />
        </div>
      </div>
      <p>{{ mastery.description }}</p>
      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="border border-slate-300/20 p-3">Level</th>
            <th class="border border-slate-300/20 p-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, lvl) in mastery.values"
            :key="value"
          >
            <td class="text-center border border-slate-300/20 p-2">{{ lvl }}</td>
            <td class="text-center border border-slate-300/20 p-2">{{ formatMasteryValue(value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { lockedCards } from "@/data/cards";
import { getCardMastery } from "@/data/masteries";
import { getCardInfo } from "@/data/cardsInfo";

import { Icon } from "@iconify/vue";
import capitalize from "@/composables/capitalize";

const props = defineProps({
  name: String,
  content: Object,
});

const mastery = ref(getCardMastery(props.name));

const info = ref(getCardInfo(props.name));

const formatInfoValue = () => info.value.description.replace("pvs", `${info.value.prefix}${props.content.lvl === 0 ? "N" : info.value.values[props.content.lvl - 1]}${info.value.suffix}`);

const formatMasteryValue = (v) => mastery.value.value.replace("v", v);

const getIcon = () => new URL(`../../assets/cards/${info.value.card}`, import.meta.url).href;

const getStoneIcon = () => new URL("../../assets/stone.webp", import.meta.url).href;
</script>
