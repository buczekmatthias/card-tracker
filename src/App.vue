<template>
  <Navigation v-model="page" />
  <Tracker v-if="page === 'tracker'" />
  <Loadout v-else-if="page === 'loadout'" />
  <Transfer v-else />
  <Footer :page="page" />
</template>

<script setup>
import Tracker from "./layouts/Tracker.vue";
import Loadout from "./layouts/Loadout.vue";
import Navigation from "./components/Navigation.vue";
import Transfer from "./layouts/Transfer.vue";
import Footer from "./components/Footer.vue";

import { onBeforeMount, ref } from "vue";
import freshLoad from "./data/freshLoad";
import freshLoadout from "./data/freshLoadout";
import updateData from "./data/updateData";
import updateLoadout from "./data/updateLoadout";

const page = ref(localStorage.getItem("page"));

const version = "25.4.0";

onBeforeMount(() => {
  if (!localStorage.getItem("page")) {
    localStorage.setItem("page", "tracker");
    page.value = "tracker";
  }

  if (!localStorage.getItem("cards")) {
    freshLoad();
  }

  if (!localStorage.getItem("presets")) {
    freshLoadout();
  }

  if (!localStorage.getItem("ownedSlots")) {
    localStorage.setItem("ownedSlots", 1);
  }

  if (!localStorage.getItem(`${version}-update`)) {
    for (let key in localStorage) {
      if (key.includes("-update")) {
        localStorage.removeItem(key);
      }
    }

    updateData();
    // updateLoadout();

    localStorage.setItem(`${version}-update`, true);
  }
});
</script>
