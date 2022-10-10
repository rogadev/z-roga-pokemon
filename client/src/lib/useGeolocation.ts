import { computed } from '@vue/reactivity'
import { log } from 'console'
import { onMounted, onUnmounted, ref } from 'vue'

export default function useGeolocation() {
  let watcher = null

  const updateLocation = (position) => {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
  }

  const onError = (err: PositionError) => {
    error.value = err.message
  }

  onMounted(() => {
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported'
      return
    }

    watcher = navigator.geolocation.watchPosition(updateLocation, onError)
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  const coords = computed(() => [latitude.value, longitude.value])
  return { coords, error, supported }
}
