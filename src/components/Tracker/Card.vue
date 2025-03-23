<template>
  <div
    class="border border-solid rounded-md p-4 flex flex-col gap-4"
    :class="{
      'border-card-common': content.rarity === 'common',
      'border-card-rare': content.rarity === 'rare',
      'border-card-epic': content.rarity === 'epic',
    }"
  >
    <div class="flex justify-between items-center">
      <p class="text-2xl truncate">{{ name }}</p>
      <div
        class="flex gap-1.5 items-center justify-center p-1.5"
        v-if="content.lvl > 0"
      >
        <Icon
          icon="octicon:star"
          height="22"
          v-for="i in Array.from(Array(content.lvl < 6 ? content.lvl : 5).keys())"
          :key="`star-${i + 1}`"
          :class="{
            'text-zinc-50': content.lvl <= 5,
            'text-amber-400': content.lvl === 6,
            'text-fuchsia-600': content.lvl === 7 && !content.mastery,
            'text-green-500': content.lvl === 7 && content.mastery,
          }"
        />
      </div>
    </div>
    <div class="rounded-md bg-nav h-6">
      <div
        class="bg-emerald-900/70 duration-150 rounded-md flex justify-center"
        :style="`width:${percentageOfMax}%`"
      >
        <p
          class="text-sm"
          :class="{
            'opacity-0': percentageOfMax < 15,
          }"
        >
          {{ percentageOfMax }}%
        </p>
      </div>
    </div>
    <div
      class="grid gap-2"
      :class="[0, 7].includes(content.lvl) ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <Select
        label="Level"
        v-model="content.lvl"
        :options="getLevelOptions()"
      />
      <Select
        label="Owned"
        v-model="content.owned"
        :options="getOwnedOptions()"
        v-if="![0, 7].includes(content.lvl)"
        :disabled="[0, 7].includes(content.lvl)"
      />
    </div>
    <Checkbox
      v-if="content.lvl === 7"
      v-model="content.mastery"
      label="Mastery unlocked"
    />
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1">
        <p>Next level target</p>
        <p class="text-lg">{{ levels[content.lvl] || "Maxed" }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <p>Progress</p>
        <p class="text-lg">{{ getCardProgress(content) }} / {{ MAX_LEVEL_CARDS_COUNT }}</p>
      </div>
    </div>
    <Button @click="showInfo = true">Show info</Button>
  </div>
  <Modal
    v-if="showInfo"
    @closeModal="showInfo = false"
  >
    <CardInfo
      :name="name"
      :content="content"
      @cardUpdate="$emit('cardUpdate')"
    />
  </Modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { getCardProgress, getPercentageOfMax, getRequiredToMax, levels, MAX_LEVEL_CARDS_COUNT } from "@/data/cardLevels";

import { Icon } from "@iconify/vue";
import CardInfo from "@/components/Tracker/CardInfo.vue";
import Button from "@/components//Button.vue";
import Modal from "@/components/Modal.vue";
import Select from "@/components/Select.vue";
import Checkbox from "@/components/Checkbox.vue";

const props = defineProps({
  name: String,
  content: Object,
});

const emit = defineEmits(["cardUpdate"]);

const showInfo = ref(false);

const percentageOfMax = computed(() => getPercentageOfMax(getRequiredToMax(props.content)));

const cardLvl = ref(props.content.lvl);

const getLevelOptions = () => Array.from(Array(8).keys());

const getOwnedOptions = () => (props.content.lvl === 1 ? { 1: 1, 2: 2 } : Array.from(Array(levels[props.content.lvl]).keys()));

watch(
  [props.content],
  (oldVal, newVal) => {
    emit("cardUpdate", props.name, props.content);

    if (newVal[0].lvl !== cardLvl.value) {
      props.content.owned = parseInt(newVal[0].lvl) === 1 ? 1 : 0;
      cardLvl.value = newVal[0].lvl;
    }
  },
  { deep: true }
);
</script>
