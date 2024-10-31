<template>
  <div class="border-t border-solid border-t-container pt-4 mt-2 flex flex-col gap-4">
    <p
      class="font-light"
      v-if="Object.keys(info).includes('unlocks')"
    >
      Locked behind {{ info.unlocks }} milestone
    </p>
    <p
      v-if="isLocked"
      class="font-light"
    >
      This card can't be swapped during active run
    </p>
    <p class="text-base">{{ formatInfoValue() }}</p>
    <table class="border-collapse w-full">
      <thead>
        <tr>
          <th class="border-2 border-container p-3">Level</th>
          <th class="border-2 border-container p-3">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, lvl) in info.values"
          :key="value"
          :class="{ 'bg-emerald-400/10': lvl + 1 === cardLvl }"
        >
          <td class="text-center border border-container p-2">{{ lvl + 1 }}</td>
          <td class="text-center border border-container p-2">{{ info.prefix }}{{ value }}{{ info.suffix }}</td>
        </tr>
      </tbody>
    </table>
    <div class="border-t border-solid border-t-container pt-4 flex flex-col gap-3">
      <p class="font-semibold text-xl">Mastery</p>
      <p>
        <span class="font-medium">Unlock: </span>
        <span class="font-light">{{ mastery.cost }} stones</span>
      </p>
      <p>{{ mastery.description }}</p>
    </div>
    <div
      class="flex flex-col gap-2 border-t border-solid border-t-container pt-4"
      v-if="Object.keys(info).includes('labs')"
    >
      <p class="text-xl self-start">Additional labs</p>
      <p
        v-for="lab in info.labs"
        :key="lab"
        class="before:content-['➡️'] flex gap-1"
      >
        {{ lab }}
      </p>
    </div>
    <a
      href="https://tower-lab-calculator.netlify.app/"
      target="_blank"
      class="link after:content-['🔗'] flex items-center"
    >
      Check out researches costs and times
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object,
  cardLvl: Number,
  mastery: Object,
  isLocked: Boolean,
});

const formatInfoValue = () => props.info.description.replace("pvs", `${props.info.prefix}${props.cardLvl === 0 ? "N" : props.info.values[props.cardLvl - 1]}${props.info.suffix}`);
</script>
