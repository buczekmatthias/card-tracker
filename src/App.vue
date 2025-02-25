<template>
  <Navigation v-model="page" />
  <Tracker v-if="page === 'tracker'" />
  <Loadout v-else-if="page === 'loadout'" />
  <Stats v-else-if="page === 'stats'" />
  <Transfer v-else />
  <Footer />
</template>

<script setup>
import Navigation from "@/tabs/components/Navigation.vue";
import Tracker from "@/tabs/Tracker.vue";
import Loadout from "@/tabs/Loadout.vue";
import Stats from "@/tabs/Stats.vue";
import Transfer from "@/tabs/Transfer.vue";
import Footer from "@/tabs/components/Footer.vue";

import { onBeforeMount, ref } from "vue";
import freshLoad from "@/data/freshLoad";
import freshLoadout from "@/data/freshLoadout";
import updateData from "@/data/updateData";

import convertData from "@/data/convertData";

const page = ref(localStorage.getItem("page"));

const version = "25.7.0";

onBeforeMount(() => {
  if (!localStorage.getItem("page")) {
    localStorage.setItem("page", "stats");
    page.value = "stats";
  }

  freshLoad();
  freshLoadout();

  if (!localStorage.getItem(`${version}-update`)) {
    for (let key in localStorage) {
      if (key.includes("-update")) {
        localStorage.removeItem(key);
      }
    }

    convertData();

    // updateData();

    localStorage.setItem(`${version}-update`, true);
  }
});
</script>
