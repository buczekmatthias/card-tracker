<template>
  <div
    class="border-t border-solid border-t-container p-container flex flex-col gap-4 mt-auto w-full mx-auto"
    :class="{
      'cardsTriple:max-w-6xl': page === 'tracker',
      'max-w-loadout': ['loadout', 'transfer'].includes(page),
    }"
  >
    <p>Made by _.hazy</p>
    <div class="flex flex-col gap-3">
      <p>My other tools</p>
      <div class="flex flex-wrap gap-4">
        <a
          :href="link.href"
          v-for="link in tools"
          :key="link.name"
          class="link"
          target="_blank"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <p>
      Check other tools on
      <a
        href="https://thetower.tools/"
        class="link"
        target="_blank"
      >
        thetower.tools
      </a>
    </p>
  </div>
</template>

<script setup>
defineProps({
  page: String,
});

const tools = [
  {
    name: "Module tracker",
    href: "https://tower-module-tracker.vercel.app/",
  },
  {
    name: "Lab speed-up calculator",
    href: "https://tower-lab-speedup-calc.vercel.app/",
  }
];
</script>
