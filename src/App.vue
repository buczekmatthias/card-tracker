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
import updateData from "./data/updateData";

const page = ref(localStorage.getItem("page") || "tracker");

const version = "1.0.0";

const changePage = (p) => {
  localStorage.setItem("page", p);
  page.value = p;
};

onBeforeMount(() => {
  if (page.value === "tracker") {
    if (!localStorage.getItem("cards")) {
      freshLoad();
    } else if (!localStorage.getItem(`${version}-update`)) {
      updateData();
    }
    localStorage.setItem(`${version}-update`, true);
  }
});
</script>
