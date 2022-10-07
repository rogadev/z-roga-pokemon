<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import L from "leaflet";

onMounted(async () => {
  let startLocation = [49.158797462428886, -123.96731759444086];

  const map = L.map("map", {
    dragging: false,
    scrollWheelZoom: "center",
    center: startLocation,
    zoom: 16,
    doubleClickZoom: false,
    boxZoom: false,
  });
  map.removeControl(map.zoomControl); // Remove zoom control icons from map

  const location = ref(startLocation);

  let posWatch = watchPos();

  function watchPos() {
    return navigator.geolocation.watchPosition(
      (pos) => {
        const { coords } = pos;
        location.value = [coords.latitude, coords.longitude];
        centerMap();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  const tileLayer = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 18,
      minZoom: 14,
    }
  );

  tileLayer.addTo(map);

  let timeout;
  function centerMap() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      map.panTo(location.value);
    }, 500);
  }
});
</script>

<template>
  <div class="z-0 w-[100vw] h-[100vh] bg-white" id="map" />
</template>