<template>
  <Navigation :page="page" @pageChange="changePage" />
  <Tracker v-if="page === 'tracker'" />
  <Loadout v-else />
</template>

<script setup>
import Tracker from "./layouts/Tracker.vue";
import Loadout from "./layouts/Loadout.vue";
import Navigation from "./components/Navigation.vue";

import { onBeforeMount, ref } from "vue";
import freshLoad from "./data/freshLoad";
import freshLoadout from "./data/freshLoadout";
import updateData from "./data/updateData";
import updateLoadout from "./data/updateLoadout";

const page = ref(localStorage.getItem("page") || "tracker");

const version = "1.2.1";

const changePage = (p) => {
  localStorage.setItem("page", p);
  page.value = p;
};

onBeforeMount(() => {
  if (!localStorage.getItem("cards")) {
    freshLoad();
  }

  if (!localStorage.getItem("presets")) {
    freshLoadout();
  }

  if (!localStorage.getItem("ownedSlots")) {
    localStorage.setItem("ownedSlots", 1);
  }

  // updateData();
  // updateLoadout();

  if (!localStorage.getItem(`${version}-update`)) {
    for (let key in localStorage) {
      if (key.includes("-update")) {
        localStorage.removeItem(key);
      }
    }

    localStorage.setItem(`${version}-update`, true);
  }
});
</script>
