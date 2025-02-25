<template>
  <div class="flex gap-2.5 items-center">
    <label>
      <input
        type="checkbox"
        v-model="model"
        class="hidden"
      />
      <div
        class="duration-150 w-12 h-6 rounded-full cursor-pointer p-1 flex"
        :class="model ? 'bg-emerald-600' : 'bg-nav'"
      >
        <div
          class="h-full w-1/2 bg-slate-50 rounded-full duration-150 relative"
          :class="model ? 'left-full -translate-x-full' : 'left-0'"
        ></div>
      </div>
    </label>
    <span>
      {{ label }}
    </span>
  </div>
</template>

<script setup>
const model = defineModel();

defineProps({
  label: String,
});
</script>
