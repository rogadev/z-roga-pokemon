<script lang="ts" setup>
// @ts-ignore
import mapboxgl from "mapbox-gl";
import { onMounted, onUnmounted, ref, computed } from "vue";
// import useGeolocation from "../lib/useGeolocation";
import type { Ref } from "vue";

import usePokemonStore from "../stores/pokemon";
const pokemonStore = usePokemonStore();
(async () => await pokemonStore.fetchPokemon())();

// Public token
mapboxgl.accessToken =
  "pk.eyJ1IjoicnlhbnJvZ2EiLCJhIjoiY2tyeHB6eDNnMHN3NTJ3czNicmNza2R6aSJ9.p6aLtvqhkcKKX9w2jYzA6g";

const latitude: Ref<number> = ref(49.165997314090326);
const longitude: Ref<number> = ref(-123.93990746794816);
const error: Ref<null | string> = ref(null);
const supported: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(true);
const coords: any = computed(() => [longitude.value, latitude.value]);
let map: mapboxgl.Map | null = null;

const updateLocation = (position: {
  coords: { latitude: number; longitude: number };
}) => {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  if (map)
    map.flyTo({
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 18,
    });
};

const onError = (err: any) => {
  error.value = err?.message || "An error occurred. No message was provided.";
};

let watcher: number | null;

onMounted(async () => {
  supported.value = "navigator" in window && "geolocation" in navigator;

  map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ryanroga/cl91jfcnw001215l2vt71oibq", // style URL
    center: coords.value, // starting position [lng, lat]
    zoom: 18, // starting zoom
    projection: { name: "globe" }, // display the map as a 3D globe
  });
  map.on("style.load", () => {
    if (map) map.setFog({}); // Set the default atmosphere style
  });

  if (!supported) {
    alert(
      "Geolocation is required but is not supported. Please accept permissions or try another browser."
    );
    // @ts-ignore
    supported.value = "navigator" in window && "geolocation" in navigator;
  } else {
    watcher = navigator.geolocation.watchPosition(updateLocation, onError);
  }

  loading.value = false;
});

/**
 * On unmount, clear the geolocation watcher and remove the map
 */
onUnmounted(() => {
  if (map) map.remove();
  if (watcher) navigator.geolocation.clearWatch(watcher);
});
</script>

<template>
  <!-- Show error if finished loading but geolocation not supported -->
  <div v-if="!supported && !loading" class="origin-center">
    <h1 class="text-center">
      Sorry, this game requires geolocation and either your browser doesn't
      support it or geolocation has been turned off. Please turn on geolocation
      or try playing from another device.
    </h1>
  </div>
  <!-- Otherwise, show map -->
  <div v-else class="z-0 w-[100vw] h-[100vh] bg-white" id="map" />
</template>