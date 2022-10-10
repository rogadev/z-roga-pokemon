<script lang="ts" setup>
import mapboxgl from "mapbox-gl";
import { onMounted, onUnmounted, ref, computed } from "vue";
import useGeolocation from "../lib/useGeolocation";
import type { Ref } from "vue";

mapboxgl.accessToken =
  "pk.eyJ1IjoicnlhbnJvZ2EiLCJhIjoiY2tyeHB6eDNnMHN3NTJ3czNicmNza2R6aSJ9.p6aLtvqhkcKKX9w2jYzA6g";

const latitude: Ref<number> = ref(0);
const longitude: Ref<number> = ref(0);
const error: Ref<null | string> = ref(null);
const supported: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(true);
let map = null;

const coords = computed(() => [longitude.value, latitude.value]);

const updateLocation = (position) => {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  map.flyTo({
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 18,
  });
};

const onError = (err: PositionError) => {
  error.value = err.message;
};

let watcher: null;

onMounted(async () => {
  supported.value = "navigator" in window && "geolocation" in navigator;

  map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ryanroga/cl91jfcnw001215l2vt71oibq", // style URL
    center: coords.value, // starting position [lng, lat]
    zoom: 18, // starting zoom
    projection: "globe", // display the map as a 3D globe
  });
  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });

  if (!supported) {
    alert("Geolocation is not supported. Game requires geolocation to play.");
  } else {
    watcher = navigator.geolocation.watchPosition(updateLocation, onError);
  }

  loading.value = false;
});

/**
 * On unmount, clear the geolocation watcher and remove the map
 */
onUnmounted(() => {
  map.remove();
  if (watcher) navigator.geolocation.clearWatch(watcher);
});
</script>

<template>
  <!-- place dead center of page -->

  <div v-if="!supported && !loading" class="origin-center">
    <h1 class="text-center">
      Sorry, this game requires geolocation and either your browser doesn't
      support it or geolocation has been turned off. Please turn on geolocation
      or try playing from another device.
    </h1>
  </div>
  <div class="z-0 w-[100vw] h-[100vh] bg-white" id="map" />
</template>