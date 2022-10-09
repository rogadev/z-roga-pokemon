<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import mapboxgl from "mapbox-gl";

let watcher: null;

/**
 * @param {number} lng
 * @param {number} lat
 */
type Location = [number, number];

mapboxgl.accessToken =
  "pk.eyJ1IjoicnlhbnJvZ2EiLCJhIjoiY2tyeHB6eDNnMHN3NTJ3czNicmNza2R6aSJ9.p6aLtvqhkcKKX9w2jYzA6g";

onMounted(async () => {
  let startLocation = [-123.96731759444086, 49.158797462428886];

  const map = createMap(startLocation);

  const geolocationSupported =
    "navigator" in window && "geolocation" in navigator;
  if (!navigator.geolocation) {
    error.value = "Geolocation is not supported";
    return;
  }

  watcher = navigator.geolocation.watchPosition(
    updateLocation,
    onLocationError
  );

  function updateLocation(position) {
    startLocation = [position.coords.longitude, position.coords.latitude];
    map.setCenter(startLocation);
  }

  function onLocationError(error) {
    console.log(error);
  }
});

onUnmounted(() => {
  map.remove();
  if (watcher) navigator.geolocation.clearWatch(watcher);
});

/**
 * Creates our map and sets the style and initial view.
 */
function createMap(startLocation: Location) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ryanroga/cl91jfcnw001215l2vt71oibq", // style URL
    center: startLocation, // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: "globe", // display the map as a 3D globe
  });
  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });

  return map;
}
</script>

<template>
  <div class="z-0 w-[100vw] h-[100vh] bg-white" id="map" />
</template>