<template>
  <div class="tracker-container">
    <slot />
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.tracker-container {
  @apply border border-solid border-container rounded-md p-2.5;
}
</style>
