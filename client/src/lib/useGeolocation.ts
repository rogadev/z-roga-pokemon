import { onMounted, onUnmounted, ref } from 'vue'

export default function useGeolocation() {
  const latitude = ref(0)
  const longitude = ref(0)
  const error = ref(null)
  const watcher = null

  const updateLocation = (position: Position) => {
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

  return { latitude, longitude, error }
}
