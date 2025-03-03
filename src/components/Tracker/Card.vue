<template>
  <div
    class="grid grid-rows-[1fr_4fr_1.35fr] grid-cols-1 border border-solid border-slate-300/20 hover:border-slate-300/50 duration-150 rounded-md h-[13.5rem] cursor-pointer w-40"
    @click="showInfo = true"
  >
    <p class="text-center p-1.5">{{ name }}</p>
    <div
      class="border-y border-solid border-y-zinc-200 flex items-center justify-center glow relative"
      :class="info.glow"
    >
      <Icon
        icon="octicon:lock-16"
        height="24"
        v-if="lockedCards.includes(name)"
        class="text-amber-500 absolute top-2.5 left-1.5 z-30"
      />
      <img
        v-lazy="getIcon()"
        :alt="`${name} card`"
        class="h-1/3"
      />
    </div>
    <div class="flex gap-2 items-center justify-center p-1.5">
      <template v-if="content.lvl === 0">
        <p class="col-span-full text-center">Locked</p>
      </template>
      <template v-else>
        <Icon
          icon="octicon:star"
          height="24"
          v-for="i in Array.from(Array(content.lvl < 6 ? content.lvl : 5).keys()).map((_, j) => (j += 1))"
          :key="`star-${i}`"
          :class="{
            'text-zinc-50': content.lvl <= 5,
            'text-amber-400': content.lvl === 6,
            'text-fuchsia-600': content.lvl === 7 && !content.mastery,
            'text-green-500': content.lvl === 7 && content.mastery,
          }"
        />
      </template>
    </div>
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
import { ref } from "vue";
import { lockedCards } from "@/data/cards";
import { getCardImgAndGlow } from "@/data/cardsInfo";

import { Icon } from "@iconify/vue";
import CardInfo from "@/components/Tracker/CardInfo.vue";
import Modal from "@/components/Modal.vue";

const props = defineProps({
  name: String,
  content: Object,
});

defineEmits(["cardUpdate"]);

const info = ref(getCardImgAndGlow(props.name));

const showInfo = ref(false);

const getIcon = () => new URL(`../../assets/cards/${info.value.card}`, import.meta.url).href;
</script>
