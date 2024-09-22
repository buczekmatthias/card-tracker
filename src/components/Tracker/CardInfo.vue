<template>
  <div class="border-t border-solid border-t-container pt-2 mt-2 flex flex-col gap-3">
    <p class="text-base">{{ formatInfoValue() }}</p>
    <p
      class="font-light italic"
      v-if="Object.keys(info).includes('unlocks')"
    >
      Locked behind {{ info.unlocks }} milestone
    </p>
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
          :class="{ 'bg-active/10': lvl + 1 === cardLvl }"
        >
          <td class="text-center border border-container p-2">{{ lvl + 1 }}</td>
          <td class="text-center border border-container p-2">{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="flex flex-col gap-2 border-t border-solid border-t-container pt-3"
      v-if="Object.keys(info).includes('labs')"
    >
      <a
        href="https://tower-lab-calculator.netlify.app/"
        target="_blank"
        class="flex gap-1 items-center self-start after:content-['🔗']"
      >
        <span class="text-lg toggle-underline">Additional labs</span>
      </a>
      <p
        v-for="lab in info.labs"
        :key="lab"
        class="before:content-['➡️'] flex gap-1"
      >
        {{ lab }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object,
  cardLvl: Number,
});

const formatInfoValue = () => props.info.description.replace("pvs", `${props.info.prefix}${props.cardLvl === 0 ? "N" : props.info.values[props.cardLvl - 1]}${props.info.suffix}`);
</script>
