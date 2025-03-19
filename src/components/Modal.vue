<template>
  <Teleport to="#app">
    <div
      class="min-h-screen w-full bg-stone-950/90 flex items-center justify-center fixed z-50 left-0 top-0 p-3"
      id="modal"
    >
      <div
        class="bg-theme p-4 flex flex-col gap-2 border border-solid border-slate-300/15 rounded-md max-h-[95vh] max-w-[1360px] w-full"
        ref="modal"
      >
        <div class="w-full flex justify-end">
          <Icon
            icon="octicon:x-16"
            height="26"
            class="cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";

import { Icon } from "@iconify/vue";

const emit = defineEmits(["closeModal"]);

const modal = useTemplateRef("modal");

onClickOutside(modal, (e) => emit("closeModal"));
</script>
