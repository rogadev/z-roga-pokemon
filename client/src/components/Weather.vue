<script setup lang="ts">
import { onUnmounted, computed, ref } from "vue";
import chooseRandom from "../utils/chooseRandom";
let interval: number;
enum Weather {
  sunny = "Sunny",
  cloudy = "Cloudy",
  rainy = "Rainy",
  foggy = "Foggy",
  windy = "Windy",
  snowy = "Snowy",
}
const weather = ref(Weather.sunny);
const icon = computed(() => {
  switch (weather.value) {
    case Weather.sunny:
      return "/weather/sun.svg";

    case Weather.rainy:
      return "/weather/rain.svg";

    case Weather.windy:
      return "/weather/wind.svg";

    case Weather.snowy:
      return "/weather/snow.svg";

    default:
      // cloudy, foggy
      return "/weather/cloud.svg";
  }
});

function changeWeather() {
  weather.value = chooseRandom(Object.values(Weather));
}

const timedWeatherUpdate = () => {
  changeWeather();
  interval = setTimeout(timedWeatherUpdate, 1000 * 60 * 5);
};

timedWeatherUpdate();

onUnmounted(() => {
  clearTimeout(interval);
});
</script>

<template>
  <div class="flex gap-2 items-center">
    <img :src="icon" />
    <p>{{ weather }}</p>
  </div>
</template>