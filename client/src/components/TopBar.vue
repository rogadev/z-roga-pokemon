<script setup lang="ts">
import Weather from "./Weather.vue";
</script>

<template>
  <div class="w-full font-semibold text-white absolute top-0 py-6 px-10 z-10">
    <div class="flex flex-row justify-between items-center">
      <h1>Roga Pokemon</h1>
      <Weather />
    </div>
  </div>
</template>