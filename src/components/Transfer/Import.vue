<template>
  <div class="flex flex-col gap-3">
    <p class="text-2xl font-semibold">Import</p>
    <Info message="Provide unmodified exported JSON file.<br/><strong>Modified data might cause tracker to stop working</strong>" />
    <label>
      <div
        class="cursor-pointer flex gap-2 border border-solid rounded-md px-2 py-4 hover:bg-slate-400/5 duration-150"
        :class="file ? 'flex-col border-emerald-400' : 'border-slate-300/30 items-center text-slate-300/75'"
      >
        <template v-if="file">
          <div class="flex items-center gap-2 text-emerald-400">
            <Icon
              icon="octicon:check-16"
              height="24"
            />
            <p>File selected</p>
          </div>
          <p class="text-slate-300/75 ml-8">{{ file.name }}</p>
        </template>
        <template v-else>
          <Icon
            icon="octicon:x-16"
            height="24"
          />
          <p>No file selected</p>
        </template>
      </div>
      <input
        type="file"
        class="hidden"
        accept="application/json"
        @change="file = $event.target.files[0]"
      />
    </label>
    <Button
      class="share-btn"
      @click="handleImport"
    >
      Import data
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { Icon } from "@iconify/vue";
import Info from "@/components/Info.vue";
import Button from "@/components/Button.vue";

const file = ref(null);

const handleImport = () => {
  if (file.value) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      if ("owned_card_slots" in data) {
        localStorage.setItem("ownedSlots", data.owned_card_slots);
      }

      if ("vault_card_slots" in data) {
        localStorage.setItem("vaultSlots", data.vault_card_slots);
      }

      if ("cards" in data) {
        localStorage.setItem("cards", JSON.stringify(data.cards));
      }

      if ("presets" in data) {
        localStorage.setItem("presets", JSON.stringify(data.presets));
      }

      location.reload();
    };

    reader.readAsText(file.value);
  }
};
</script>
