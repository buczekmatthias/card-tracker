<template>
  <nav class="nav">
    <button class="nav-btn" :class="page === 'tracker' ? 'active' : 'inactive'" @click="$emit('pageChange', 'tracker')">Tracker</button>
    <button class="nav-btn" :class="page === 'loadout' ? 'active' : 'inactive'" @click="$emit('pageChange', 'loadout')">Loadout</button>
  </nav>
</template>

<script setup>
defineProps({
  page: String,
});

defineEmits(["pageChange"]);
</script>

<style lang="postcss" scoped>
.nav {
  @apply w-full gap-2 p-container grid grid-cols-2;
}
.nav-btn {
  @apply border-2 border-solid rounded-md px-5 py-3;
}
.active {
  @apply border-active text-active;
}
.inactive {
  @apply border-container text-inactive;
}
</style>
