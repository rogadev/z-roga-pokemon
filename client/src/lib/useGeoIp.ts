export default async function useGeoIp() {
  const latitude = ref(0)
  const longitude = ref(0)
  const error = ref(null)

  // get geo coords using fetch
  const getGeoCoords = async () => {
    try {
      const response = await fetch('https://ipapi.co/json')
      const data = await response.json()
      latitude.value = data.latitude
      longitude.value = data.longitude
    } catch (err) {
      error.value = err.message
    }
  }

  const updateLocation = (position: Position) => {
    latitude.value = position[0]
    longitude.value = position[1]
  }

  const onError = (err: PositionError) => {
    error.value = err.message
  }

  return { latitude, longitude, error }
}
